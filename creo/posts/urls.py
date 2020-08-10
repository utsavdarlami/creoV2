from rest_framework import routers
from .views import PostViewSet,PostListViewSet

router = routers.DefaultRouter()

router.register('api/posts',PostViewSet,'posts')
router.register('api/allposts',PostListViewSet,'allposts')

urlpatterns = router.urls

