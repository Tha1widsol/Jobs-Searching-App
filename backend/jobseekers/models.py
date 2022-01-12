from django.db import models
from accounts.models import User

# Create your models here.
class Profile(models.Model):
   user = models.OneToOneField(User,on_delete = models.CASCADE)
   firstName = models.CharField(max_length = 200)
   lastName = models.CharField(max_length = 200)
   phone = models.CharField(max_length = 11)
   cv = models.FileField(upload_to='cv_files',blank = True)
   resume = models.FileField(upload_to='resume_files',blank = True)
   skills = models.TextField()
   education = models.CharField(max_length = 50)
   sectors = models.CharField(max_length = 50)
   distance = models.IntegerField()
   experience = models.TextField(blank = True)
   about = models.TextField()
   active = models.BooleanField(default = True)

   def __str__(self):
      return self.firstName