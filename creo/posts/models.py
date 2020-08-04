from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone

# Create your models here.

class Posts(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    content = models.ImageField(blank=True,upload_to="posts")
    publisher = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title[:50]

    def get_absolute_url(self):
        return reverse('post_detail', args=[str(self.id)])
