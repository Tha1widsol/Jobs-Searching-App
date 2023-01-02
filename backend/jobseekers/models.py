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
   education = models.CharField(max_length = 50, default = 'No formal education')
   industry = models.TextField(default = 'Any')
   distance = models.TextField(default = 'Any')
   experience = models.TextField(blank = True)
   about = models.CharField(max_length = 250)
   isActive = models.BooleanField(default = True)

   def __str__(self):
      return self.firstName

class ProfileExperience(models.Model):
      profile = models.ForeignKey(Profile, on_delete = models.CASCADE, null = True)
      title = models.CharField(max_length = 200)
      companyName = models.CharField(max_length = 200)
      EmployerName = models.CharField(max_length = 200, blank = True)
      EmployerEmail = models.EmailField(blank = True)
      EmployerPhone = models.CharField(max_length = 15, blank = True)
      description = models.TextField()
      years = models.IntegerField()
      isOnGoing = models.BooleanField(default = False)

      def __str__(self):
         return self.description

class ProfileEducation(models.Model):
      profile = models.ForeignKey(Profile, on_delete = models.CASCADE, null = True)
      education = models.TextField(blank = True)
      field = models.TextField(blank = False)
      institution = models.TextField(blank = True)
      country = models.TextField(blank = True)
      city = models.TextField(blank = True)
      currentlyEnrolled = models.BooleanField(default = False)
      fromDate = models.CharField(max_length = 13, blank = True)
      toDate = models.CharField(max_length = 13, blank = True)

      def __str__(self):
         return self.field

class SavedJob(models.Model):
      job = models.ForeignKey('employers.Job', on_delete = models.CASCADE, null = True, blank = True)
      savedDate = models.DateTimeField('savedDate',auto_now_add = True)




