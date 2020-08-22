from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserProfileInfo


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  ('id','username','email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','password')
        extra_kwargs = {'password':{'write_only':True}}

    def create(self,validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
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
        user_data = validated_data.pop('user')
        user = RegisterSerializer.create(RegisterSerializer(), validated_data=user_data)
        # validated_data["user"] = user
        # print(validated_data)
        userprofile = UserProfileInfo.objects.create(user=user,**validated_data)
        return user,userprofile

