from django.urls import path,include
from rest_framework import routers
from .views import PostViewSet,PostListViewSet,addLikeViewset,who_liked_the_post

router = routers.DefaultRouter()

router.register('posts',PostViewSet,'posts')
router.register('allposts',PostListViewSet,'allposts')
router.register('like',addLikeViewset,'likepost')


urlpatterns = [
	path('who_liked_in_post/<int:pk>',who_liked_the_post,name="who_liked_in_post"),
] + router.urls
