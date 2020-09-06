from django.urls import path,include
from rest_framework import routers
from .views import PostViewSet,PostListViewSet,addLikeViewset,who_liked_the_post

router = routers.DefaultRouter()

router.register('api/posts',PostViewSet,'posts')
router.register('api/allposts',PostListViewSet,'allposts')
router.register('api/like',addLikeViewset,'likepost')


urlpatterns = [
	path('api/who_liked_in_post/<int:pk>',who_liked_the_post,name="who_liked_in_post"),
] + router.urls
