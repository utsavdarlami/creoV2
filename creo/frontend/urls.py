from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('profile', views.index),
    path('login', views.index),
    path('signup', views.index),
    path('profile', views.index),
    path('submitpost', views.index),
    path('posts/<int:post_id>', views.index)
]
