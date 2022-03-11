from django.db import models
from accounts.models import User
from main.models import Skill

# Create your models here.

class Employer(models.Model):
   user = models.OneToOneField(User,on_delete = models.CASCADE, null = True)
   firstName = models.CharField(max_length = 200)
   middleName = models.CharField(max_length = 200,blank = True)
   lastName = models.CharField(max_length = 200)
   about = models.CharField(blank = True, max_length = 250)
   logo = models.ImageField(upload_to = 'EmployerLogosFiles', blank = True)

   def __str__(self):
    return self.firstName

class Company(models.Model):
    user = models.ForeignKey(User,on_delete = models.CASCADE, null = True)
    name = models.CharField(max_length = 200)
    email = models.EmailField(unique = True)
    about = models.CharField(max_length = 250)
    phone = models.CharField(max_length = 15)
    logo = models.ImageField(upload_to = 'CompanyLogosFiles', blank = True)
    banner = models.ImageField(upload_to = 'CompanyBannerFiles', blank = True)
    industry = models.TextField(default = 'Any')
    website = models.URLField(max_length = 200, blank = True)
    
    def __str__(self):
      return self.name
  
class Role(models.Model):
      name = models.CharField(max_length = 300)

      def __str__(self):
            return self.name

class Benefit(models.Model):
      name = models.CharField(max_length = 300)

      def __str__(self):
            return self.name

class Job(models.Model):
      user = models.ForeignKey(User,on_delete = models.CASCADE, null = True, blank = True)
      company = models.ForeignKey(Company, on_delete = models.CASCADE, null = True, blank = True)
      title = models.CharField(max_length = 60, blank = True)
      description = models.TextField(blank = True)
      salary = models.CharField(max_length = 50, blank = True)
      roles = models.ManyToManyField(Role, blank = True)
      industry = models.TextField(default = 'Any')
      remote = models.BooleanField(default = False)
      training = models.BooleanField(default = True)
      positions = models.TextField(default = "1")
      education = models.CharField(max_length = 50)
      skills = models.ManyToManyField(Skill, blank = True)
      startDate = models.DateField(null = True,blank = True)
      benefits = models.ManyToManyField(Benefit, blank = True)
      workingDays = models.CharField(max_length = 100, default = 'Monday-Friday')
      workingHours = models.IntegerField(default = 6)
      applicantsCount = models.IntegerField(default = 0)
      applyOnOwnWebsite = models.BooleanField(default = False)
      datePosted = models.DateTimeField('Job posted',auto_now_add = True)

      def __str__(self):
        return self.title

      







    