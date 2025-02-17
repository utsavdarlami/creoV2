from rest_framework import generics, permissions, viewsets,filters, status
from rest_framework.response import Response

from rest_framework.decorators import api_view
# from rest_framework import status
from django.shortcuts import get_object_or_404

from knox.models import AuthToken

from .serializers import UserProfileInfoSerializer, UserSerializer, LoginSerializer, PasswordChangeSerializer

from django.contrib.auth.models import User

from .models import UserProfileInfo

from django.core.exceptions import PermissionDenied


# API for Register
# api/auth/register
class RegisterAPI(generics.GenericAPIView):

    serializer_class = UserProfileInfoSerializer

    def post(self,request,*args,**kwargs):
        # print(request.data)
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user,userprofile = serializer.save()
        _,token  = AuthToken.objects.create(user)
        return Response({
            "profile" : UserProfileInfoSerializer(userprofile,context=self.get_serializer_context()).data,
            "token"   : token
        })



# API for Login
# api/auth/login
class LoginAPI(generics.GenericAPIView):

    serializer_class = LoginSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        # print(serializer)
        user = serializer.validated_data
        _,token  = AuthToken.objects.create(user)
        return Response({
            "user" : UserSerializer(user,context=self.get_serializer_context()).data,
            "token" : token
        })



# API for changing password
# api/auth/changepassword
class ChangePassword(generics.UpdateAPIView):
    serializer_class = PasswordChangeSerializer
    model = User
    permissions_classes = [
       # permissions.AllowAny
        permissions.IsAuthenticated,
    ]

    def get_object(self,queryset=None):
        obj = self.request.user
        return obj

    def update(self,request,*args,**kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data= request.data)
        serializer.is_valid(raise_exception = True)


        #self.object is the user who requested for password change
        if not self.object.check_password(serializer.data.get("old_password")):
            return Response(
                {"old_password" : ["Wrong Old Password"]},
                status=status.HTTP_400_BAD_REQUEST
            )

        self.object.set_password(serializer.data.get("new_password"))
        self.object.save()

        response = {
            'status' : 'success',
            'code'   : status.HTTP_200_OK,
            'message': 'Password Updated Successfully',
            'token'  : 'token maybe needed'
        }
        return Response(response)





#  Get User API - gives the user id, firstname, lastname, email, and username
# api/auth/user
class UserAPI(generics.RetrieveAPIView):

    permissions_classes = [
        # permissions.AllowAny
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        if not self.request.user.is_authenticated:
            raise PermissionDenied()
        return self.request.user



#User Profile Info View - gives the entire user profile informtion
# api/profile/id
class UserProfileInfoViewSet(viewsets.ModelViewSet):
    queryset = UserProfileInfo.objects.all()

    permissions_classes = [
       # permissions.AllowAny
        permissions.IsAuthenticated,
    ]

    serializer_class = UserProfileInfoSerializer

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            raise PermissionDenied()
        # return self.request.user.publisher.all()
        return UserProfileInfo.objects.filter(user=self.request.user)
        

    def retrieve(self,request,*args,**kwargs):
        if UserProfileInfo.objects.filter(user = self.kwargs.get('pk')).exists():
            user = UserProfileInfo.objects.get(user = self.kwargs.get('pk'))
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        return Response(status=status.HTTP_204_NO_CONTENT)



# User Detail Based On Username
# api/get_user/<str:username>
@api_view(['GET'])
def get_user(request,username=None):
    if User.objects.filter(username = username).exists():
        user = User.objects.get(username = username)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    return Response(status=status.HTTP_204_NO_CONTENT)


#API for searching user based on text fields only
#api/search_user/?search=
class UserSearchListApi(generics.ListAPIView):
    queryset = UserProfileInfo.objects.all()
    serializer_class = UserProfileInfoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__username', 'user__first_name','user__last_name']



# UserDetailBasesOnID
# api/view_user/<int:pk>/
@api_view(['GET'])
def view_user(request,pk=None):
    if User.objects.filter(id = pk).exists():
        user = User.objects.get(id = pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    return Response(status=status.HTTP_204_NO_CONTENT)




