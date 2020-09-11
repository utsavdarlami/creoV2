from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone

# Create your models here.

class Posts(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    content = models.ImageField(blank=True,upload_to="posts")
    publisher = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    like_count = models.IntegerField(default=0)
    comment_count = models.IntegerField(default=0)
    view_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title[:50]

    def get_absolute_url(self):
        return reverse('post_detail', args=[str(self.id)])

class CommentPost(models.Model):
    post = models.ForeignKey(Posts,on_delete=models.CASCADE,)
    publisher = models.ForeignKey(User,on_delete=models.CASCADE)
    pub_date = models.DateTimeField(auto_now_add=True)
    comment  = models.CharField(max_length=500)
    def __str__(self):
        return str(self.title)

class Likes(models.Model):
    post = models.ForeignKey(Posts,on_delete=models.CASCADE,)
    publisher = models.ForeignKey(User,on_delete=models.CASCADE,)
    pub_date = models.DateTimeField(auto_now_add=True)
    like  = models.BooleanField()
    def __str__(self):
        return str(self.publisher)

class Saves(models.Model):
    post = models.ForeignKey(Posts,on_delete=models.CASCADE,)
    savedby = models.ForeignKey(User,on_delete=models.CASCADE,)
    pub_date = models.DateTimeField(auto_now_add=True)
    saved = models.BooleanField()
    def __str__(self):
        return str(self.publisher)
