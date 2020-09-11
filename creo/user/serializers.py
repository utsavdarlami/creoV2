from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
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


# Login Serializer
class LoginSerializer(serializers.Serializer):
    username  = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

# User Profile Info Serializer
class UserProfileInfoSerializer(serializers.ModelSerializer):

    user = RegisterSerializer(required=True)

    class Meta:
        model = UserProfileInfo
        fields  = '__all__'

    def create(self, validated_data):
        # print(validated_data)
        user_data = validated_data.pop('user')
        user = RegisterSerializer.create(RegisterSerializer(), validated_data=user_data)
        # validated_data["user"] = user
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

        user_validated_data = validated_data.pop('user',None)

        user  = instance.user
        user.email = user_validated_data.get('email',user.email)
        user.first_name = user_validated_data.get('first_name',user.first_name)
        user.last_name = user_validated_data.get('last_name',user.last_name)
        # user.set_password(user_validated_data.get('password',user.password))
        user.save()

        instance.gender = validated_data.get('gender',instance.gender)
        instance.portfolio_site = validated_data.get('portfolio_site',instance.portfolio_site)
        instance.bio = validated_data.get('bio',instance.bio)
        instance.resume = validated_data.get('resume',instance.resume)
        instance.profile_pic = validated_data.get('profile_pic',instance.profile_pic)

        instance.save()

        return instance


