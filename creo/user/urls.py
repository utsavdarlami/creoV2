from django.urls import path,include
from rest_framework import routers
from .views import RegisterAPI,LoginAPI,UserAPI,UserProfileInfoViewSet
from knox import views as knox_views

router = routers.DefaultRouter()
router.register('api/profile',UserProfileInfoViewSet,'profile')

urlpatterns = [
    path('api/auth',include('knox.urls')),
    path('api/auth/register',RegisterAPI.as_view()),
    path('api/auth/login',LoginAPI.as_view()),
    path('api/auth/user',UserAPI.as_view()),
    path('api/auth/logout',knox_views.LogoutView.as_view(),name='knox_logout')
] + router.urls

