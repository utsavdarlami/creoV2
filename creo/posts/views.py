from posts.models import Posts
from rest_framework import viewsets, permissions
from .serializers import PostSerializer

from django.core.exceptions import PermissionDenied

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


