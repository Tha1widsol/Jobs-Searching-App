from django.db import models
from main.models import Skill

# Create your models here.

class Profile(models.Model):
   user = models.OneToOneField('accounts.user',on_delete = models.CASCADE,null = True)
   firstName = models.CharField(max_length = 200)
   middleName = models.CharField(max_length = 200,blank = True)
   lastName = models.CharField(max_length = 200)
   skills = models.ManyToManyField(Skill, blank = True)
   phone = models.CharField(max_length = 15)
   logo = models.ImageField(upload_to = 'profileLogosFiles', blank = True)
   cv = models.FileField(upload_to = 'cvFiles',blank = True)
   education = models.CharField(max_length = 50)
   industry = models.TextField(default = 'Any')
   distance = models.TextField(default = 'Any')
   experience = models.TextField(blank = True)
   about = models.CharField(max_length = 250)
   isActive = models.BooleanField(default = True)

   def __str__(self):
      return self.firstName

class ProfileExperience(models.Model):
      profile = models.ForeignKey(Profile, on_delete = models.CASCADE)
      title = models.CharField(max_length = 200)
      companyName = models.CharField(max_length = 200)
      companyEmail = models.EmailField(unique = True, blank = True)
      companyPhone = models.CharField(max_length = 15, blank = True)
      description = models.TextField()
      years = models.IntegerField()
      ongoing = models.BooleanField(default = False)

      def __str__(self):
         return self.description


