from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from .models import UserProfileInfo


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  ('id','username','email','first_name','last_name')


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id','first_name','last_name','username','email','password')
        extra_kwargs = {'password':{'write_only':True}}

    def create(self,validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
        )
        user.first_name = validated_data.get('first_name',None)
        user.last_name = validated_data.get('last_name',None)
        user.save()
        return user



# User Profile Info Serializer
class UserProfileInfoSerializer(serializers.ModelSerializer):

    # needed for register/create
    user = RegisterSerializer(required=False)
    confirm_password = serializers.CharField(required=False)

    # user_id = serializers.IntegerField(required=False)
    # needed for updates
    first_name = serializers.CharField(max_length=150,required=False)
    last_name= serializers.CharField(max_length=150,required=False)
    email = serializers.EmailField(required=False)


    class Meta:
        model = UserProfileInfo
        fields  = '__all__'

    def create(self, validated_data):
        # print(validated_data)
        """"
            Registering User
        """
        #validated_data contains above stated fields plus the fields from UserProfileInfo
        #retrieving only user data i.e: first_name, last_name, username, email and password if available and storing them in user_data 
        user_data = validated_data.pop('user',None)
        confirm_password = validated_data.pop('confirm_password',None)

        if user_data == None:
            raise serializers.ValidationError({"user": ["There is no user data for the user to be registered"]})

        if confirm_password == None:
            raise serializers.ValidationError({"password":["Password Confirmation is not provided."]})

        if user_data["password"]!=confirm_password:
            raise serializers.ValidationError({"password":["Does not Match with password field."]})

        user = RegisterSerializer.create(RegisterSerializer(), validated_data=user_data)
        # validated_data["user"] = user
        #Creating the user profile info after the user has been registered
        userprofile = UserProfileInfo.objects.create(user=user,**validated_data)
        return user,userprofile
        

    def update(self,instance,validated_data):
        """ Reference
        # https://django.cowhite.com/blog/create-and-update-django-rest-framework-nested-serializers/
            # https://medium.com/analytics-vidhya/django-rest-framework-nested-serializer-6bebb5f9289e
        """
        # print(instance)
        # print("This is lame debugger ====================")
        # print(validated_data)

        # user_validated_data = validated_data.pop('user',None)
        # user_id = validated_data.pop('user_id',None)
        # if user_id == None:
        # raise serializers.ValidationError({"user_id": "It must not be None when Updating"})

        # instance_user = User.objects.get(pk=user_id)
        # print(instance_post.data)
        # instance_serializer = UserSerializer(instance_user)

        # user_validated_data = instance_serializer.data

        #Updating Email, Firstname and Lastname of user 
        user = instance.user
        user.email = validated_data.get('email',user.email)
        user.first_name = validated_data.get('first_name',user.first_name)
        user.last_name = validated_data.get('last_name',user.last_name)
        # user.set_password(user_validated_data.get('password',user.password))
        user.save()


        #Updating UserProfileInfo model of User
        instance.gender = validated_data.get('gender',instance.gender)
        instance.portfolio_site = validated_data.get('portfolio_site',instance.portfolio_site)
        instance.bio = validated_data.get('bio',instance.bio)
        instance.resume = validated_data.get('resume',instance.resume)
        instance.profile_pic = validated_data.get('profile_pic',instance.profile_pic)

        instance.save()

        return instance


# Login Serializer
class LoginSerializer(serializers.Serializer):
    username  = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")



class PasswordChangeSerializer(serializers.Serializer):

    model = User

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
