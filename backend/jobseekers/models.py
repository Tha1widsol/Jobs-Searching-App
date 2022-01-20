from django.db import models
from accounts.models import User

# Create your models here.

class Profile(models.Model):
   user = models.OneToOneField(User,on_delete = models.CASCADE)
   firstName = models.CharField(max_length = 200)
   lastName = models.CharField(max_length = 200)
   phone = models.CharField(max_length = 15)
   logo = models.ImageField(upload_to = 'profileLogosFiles', blank = True)
   cv = models.FileField(upload_to = 'cvFiles',blank = True)
   education = models.CharField(max_length = 50)
   industry = models.TextField(default = 'Any')
   distance = models.TextField(default = 'Any')
   experience = models.TextField(blank = True)
   about = models.TextField()
   isActive = models.BooleanField(default = True)

   def __str__(self):
      return self.firstName