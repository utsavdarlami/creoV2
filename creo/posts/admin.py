from django.contrib import admin
from .models import Posts,Likes,CommentPost
# Register your models here.

admin.site.register(Posts)
admin.site.register(Likes)
admin.site.register(CommentPost)
