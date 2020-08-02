from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Posts(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    content = models.ImageField(blank=True)
    publisher = models.ForeignKey(User, on_delete=models.CASCADE)
    

    def __str__(self):
        return self.title[:50]

    def get_absolute_url(self):
        return reverse('post_detail', args=[str(self.id)])