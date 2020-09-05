from django.urls import path,re_path
from . import views

urlpatterns = [
    path('', views.index),
    re_path(r'^(?:.*)/?$', views.index),
    # path('profile', views.index),
    # path('login', views.index),
    # path('signup', views.index),
    # path('profile', views.index),
    # path('submitpost', views.index),
    # path('posts/<int:post_id>', views.index)
]
