from posts.models import Posts,Likes
from rest_framework import viewsets, permissions
from .serializers import PostSerializer,LikeSerializer,LikeUserSerializer

from django.core.exceptions import PermissionDenied

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response

from django.shortcuts import get_object_or_404
from django.db.models import F

#Post ViewSet
class PostViewSet(viewsets.ModelViewSet):
    queryset = Posts.objects.all()
    permissions_classes = [
        # permissions.AllowAny
        permissions.IsAuthenticated,
    ]

    serializer_class = PostSerializer

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            raise PermissionDenied()
        # return self.request.user.publisher.all()
        return Posts.objects.filter(publisher=self.request.user)
    # return Posts.objects.all()

    def perform_create(self, serializer):
        serializer.save(publisher=self.request.user)

class PostListViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Posts.objects.all()
    serializer_class = PostSerializer


class addLikeViewset(viewsets.ModelViewSet):
    queryset = Likes.objects.all()

    permissions_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = LikeSerializer

    def get_queryset(self):
        return Likes.objects.filter(publisher=self.request.user)

    def retrieve(self,request,*args,**kwargs):
        if Likes.objects.filter(post=self.kwargs.get('pk'), publisher=self.request.user).exists():
            likes = Likes.objects.get(post=self.kwargs.get('pk'), publisher=self.request.user)
            serializer = LikeSerializer(likes)
            return Response(serializer.data)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def create(self,request,*args,**kwargs):
        data = request.data
        # print(data)
        data["publisher"] = self.request.user.id
        data["like"] = True
        serializer = self.get_serializer(data = data)
        serializer.is_valid(raise_exception = True)
        post,_= serializer.save()
        return Response({
            "post" : PostSerializer(post,context=self.get_serializer_context()).data,
        })

    def destroy(self, request, *args, **kwargs):
        instance = Likes.objects.get(post=self.kwargs.get('pk'), publisher=self.request.user)
        current_post = get_object_or_404(Posts,pk=self.kwargs.get('pk'))
        current_post.like_count = F('like_count') - 1
        current_post.save()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def who_liked_the_post(request,pk=None):
    if not request.user.is_authenticated:
        raise PermissionDenied()
    else:
        if Likes.objects.filter(post=pk).exists():
            likes = Likes.objects.filter(post=pk)
            serializer = LikeUserSerializer(likes,many=True)
            return Response(serializer.data)
        return Response(status=status.HTTP_204_NO_CONTENT)
