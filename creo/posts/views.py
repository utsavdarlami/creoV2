from posts.models import Posts, Likes, Saves, CommentPost
from rest_framework import viewsets, permissions, generics
from .serializers import PostSerializer, LikeSerializer, LikeUserSerializer, SaveSerializer, CommentSerializer,CommentUserSerializer

from user.serializers import UserSerializer

from django.core.exceptions import PermissionDenied

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from django.shortcuts import get_object_or_404
from django.db.models import F

POST_CHOICE_DIC = {'A': 'audio', 'V': 'video', 'I': 'image'}
# Post ViewSet


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

    def create(self, request, *args, **kwargs):
        # need a logic to check if the uploaded file is as mentioned as the post_type
        # print(self.request.data)
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        content = data.get('content', None)
        user_assigned_type = data.get('post_type', None)

        if content == None:
            return Response({
                "Content": [
                    "This field is required."
                ]
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            content_type = content.content_type
            # print(content.content_type)
            type_is = content_type.split("/")[0]
            if type_is == POST_CHOICE_DIC[user_assigned_type]:
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            else:
                return Response({
                    "Content_Type": [
                        "Content Type And Your Post Choice Did Not Match."
                    ]
                }, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(publisher=self.request.user)
        # print(serializer)


class PostListViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Posts.objects.all()
    serializer_class = PostSerializer

class UsersPostView(viewsets.ReadOnlyModelViewSet):

    queryset = Posts.objects.all()
    permissions_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = PostSerializer

    def retrieve(self, request, *args, **kwargs):
        if Posts.objects.filter(publisher=self.kwargs.get('pk')).exists():
            posts = Posts.objects.filter(publisher=self.kwargs.get('pk'))
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)
        return Response([])


class addLikeViewset(viewsets.ModelViewSet):
    """ Viewset related to like in a post , liking post and deleting like post
    Create -> add to db and increase like count
        Destroy -> delete like object and decrease like count
        api
    """
    queryset = Likes.objects.all()

    permissions_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = LikeSerializer

    def get_queryset(self):
        return Likes.objects.filter(publisher=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        if Likes.objects.filter(post=self.kwargs.get('pk'), publisher=self.request.user).exists():
            likes = Likes.objects.get(post=self.kwargs.get(
                'pk'), publisher=self.request.user)
            serializer = LikeSerializer(likes)
            return Response(serializer.data)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def create(self, request, *args, **kwargs):
        data = request.data
        # print(data)
        data["publisher"] = self.request.user.id
        data["like"] = True
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        post, _ = serializer.save()
        return Response({
            "post": PostSerializer(post, context=self.get_serializer_context()).data,
        })

    def destroy(self, request, *args, **kwargs):
        instance = Likes.objects.get(
            post=self.kwargs.get('pk'), publisher=self.request.user)
        current_post = get_object_or_404(Posts, pk=self.kwargs.get('pk'))
        current_post.like_count = F('like_count') - 1
        current_post.save()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def who_liked_the_post(request, pk=None):
    if not request.user.is_authenticated:
        raise PermissionDenied()
    else:
        if Likes.objects.filter(post=pk).exists():
            likes = Likes.objects.filter(post=pk)
            serializer = LikeUserSerializer(likes, many=True)
            return Response(serializer.data)
        return Response(status=status.HTTP_204_NO_CONTENT)

class SavePostViewset(viewsets.ModelViewSet):
    """ Viewset related to saving a post and deleting saved post
    Create -> add to db saved post
        Destroy -> delete save object
        api
    """

    queryset = Saves.objects.all()

    permissions_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = SaveSerializer

    def get_queryset(self):
        return Saves.objects.filter(savedby=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        if Saves.objects.filter(post=self.kwargs.get('pk'), savedby=self.request.user).exists():
            save = Saves.objects.get(post=self.kwargs.get(
                'pk'), savedby=self.request.user)
            serializer = SaveSerializer(save)
            return Response(serializer.data)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def create(self, request, *args, **kwargs):
        data = request.data
        # print(data)
        data["savedby"] = self.request.user.id
        data["saved"] = True
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        post, _ = serializer.save()
        return Response({
            "post": PostSerializer(post, context=self.get_serializer_context()).data,
        })

    def destroy(self, request, *args, **kwargs):
        instance = Saves.objects.get(
            post=self.kwargs.get('pk'), savedby=self.request.user)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class CommentViewSet(viewsets.ModelViewSet):
    """ Viewset related to like in a post , liking post and deleting like post
    Create -> add to db and increase like count
        Destroy -> delete like object and decrease like count
        api
    """
    queryset = CommentPost.objects.all()

    permissions_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = CommentSerializer

    def get_queryset(self):
        return CommentPost.objects.filter(publisher=self.request.user)

    def create(self, request, *args, **kwargs):
        data = request.data
        # print(data)
        data["publisher"] = self.request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        _, comment = serializer.save()
        return Response(
            CommentSerializer(
                comment, context=self.get_serializer_context()).data
        )

    def destroy(self, request, *args, **kwargs):
        # print(request.data)
        data = request.data
        comment_id = data["comment_id"]
        # print(comment_id)
        instance = CommentPost.objects.get(
            pk=comment_id, post=self.kwargs.get('pk'), publisher=self.request.user)
        current_post = get_object_or_404(Posts, pk=self.kwargs.get('pk'))
        current_post.comment_count = F('comment_count') - 1
        current_post.save()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class UsernameCommentViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = CommentPost.objects.all()
    permissions_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = CommentUserSerializer

    def retrieve(self, request, *args, **kwargs):
        if CommentPost.objects.filter(post=self.kwargs.get('pk')).exists():
            comments = CommentPost.objects.filter(post=self.kwargs.get('pk'))
            serializer = self.get_serializer(comments, many=True)

            return Response(serializer.data)
        return Response([])
