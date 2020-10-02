from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone

# Create your models here.

#Post Model
class Posts(models.Model):
    POST_CHOICES =  (
        ('I','Image'),
        ('V','Video'),
        ('A','Audio')
     )
    title = models.CharField(max_length=255)
    description = models.TextField()
    content = models.FileField(blank=True,upload_to="posts")
    created_at = models.DateTimeField(auto_now_add=True)
    post_type = models.CharField(choices=POST_CHOICES,max_length=2,blank=False)
    publisher = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    view_count = models.IntegerField(default=0)
    comment_count = models.IntegerField(default=0)
    like_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title[:50]

    # def get_absolute_url(self):
    #     return reverse('post_detail', args=[str(self.id)])


#Like Post Model
class Likes(models.Model):
    post = models.ForeignKey(Posts,on_delete=models.CASCADE,)
    publisher = models.ForeignKey(User,on_delete=models.CASCADE,)
    like  = models.BooleanField()
    pub_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.publisher)



#Save Post Model
class Saves(models.Model):
    post = models.ForeignKey(Posts,on_delete=models.CASCADE,)
    savedby = models.ForeignKey(User,on_delete=models.CASCADE,)
    saved = models.BooleanField()
    pub_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.savedby)



#Comment Post Model
class CommentPost(models.Model):
    post = models.ForeignKey(Posts,on_delete=models.CASCADE,)
    publisher = models.ForeignKey(User,on_delete=models.CASCADE)
    comment  = models.CharField(max_length=500)
    pub_date = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return str(self.comment[:10])


