from django.db import models

# Create your models here.
from django.contrib.auth.models import User



"""Model to store User Profile Information"""
class UserProfileInfo(models.Model):
    GENDER_CHOICES = (
     ('M', 'Male'),
     ('F', 'Female'),
     ('O', 'Other')
    )
    gender = models.CharField(choices=GENDER_CHOICES, max_length=12,blank=True,)
    #Each user has only one user profile therefore using OneToOneField
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    portfolio_site = models.URLField(blank=True)
    bio = models.TextField(max_length=500,blank=True)
    resume = models.FileField(upload_to ='resumes',blank=True)
    #stores the profile pictures under media folder/profilepics folder
    profile_pic = models.ImageField(upload_to ='profilepics',default="profilepics/default1.jpg", blank=True)

    
    def __str__(self):
        return self.user.username
