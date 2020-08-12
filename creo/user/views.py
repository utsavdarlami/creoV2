from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer,RegisterSerializer,LoginSerializer,UserProfileInfoSerializer

from .models import UserProfileInfo

from django.core.exceptions import PermissionDenied


# Register API
class RegisterAPI(generics.GenericAPIView):

    serializer_class = RegisterSerializer

    def post(self,request,*args,**kwargs):
        print(request.data)
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        _,token  = AuthToken.objects.create(user)
        return Response({
            "user" : UserSerializer(user,context=self.get_serializer_context()).data,
            "token" : token
        })



# Login API
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

#  Get User API
class UserAPI(generics.RetrieveAPIView):

    permissions_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        if not self.request.user.is_authenticated:
            raise PermissionDenied()
        return self.request.user

# UserProfileInfo Serializer
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

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


