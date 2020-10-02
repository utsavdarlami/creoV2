from django.urls import path
from rest_framework import routers
from .views import PostViewSet,PostListViewSet,addLikeViewset,who_liked_the_post,SavePostViewset,CommentViewSet,UsersPostView,UsernameCommentViewSet,add_viewcount_post, PostSearchListApi

router = routers.DefaultRouter()

router.register('api/posts',PostViewSet,'posts')
router.register('api/allposts',PostListViewSet,'allposts')
router.register('api/like',addLikeViewset,'likepost')
router.register('api/save',SavePostViewset,'savepost')
router.register('api/comment',CommentViewSet,'commentpost')
router.register('api/users_post',UsersPostView,"users_post")
router.register('api/comments_on_post',UsernameCommentViewSet,"username_comments")


urlpatterns = [
        path('api/who_liked_in_post/<int:pk>',who_liked_the_post,name="who_liked_in_post"),
        path('api/add_viewcount_post/<int:pk>',add_viewcount_post,name="add_viewcount_post"),
        path('api/search_post/',PostSearchListApi.as_view()),
] + router.urls
