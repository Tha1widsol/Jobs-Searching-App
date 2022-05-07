from django.db import models
from accounts.models import User
from jobseekers.models import Profile
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
      salary1 = models.CharField(max_length = 10)
      salary2 = models.CharField(max_length = 10, blank = True)
      currency = models.CharField(max_length = 1, default = '$')
      roles = models.ManyToManyField(Role, blank = True)
      industry = models.TextField(default = 'Any')
      remote = models.BooleanField(default = False)
      type = models.CharField(max_length = 9, default = 'Full-time')
      training = models.BooleanField(default = True)
      positions = models.TextField(default = "1")
      education = models.CharField(max_length = 50)
      skills = models.ManyToManyField(Skill, blank = True)
      startDate = models.DateField(null = True,blank = True)
      benefits = models.ManyToManyField(Benefit, blank = True)
      workingDay1 = models.CharField(max_length = 10, default = 'Monday')
      workingDay2 = models.CharField(max_length = 10, default = 'Friday')
      workingHours = models.CharField(default = '6', max_length = 2)
      applicantsCount = models.IntegerField(default = 0)
      applyOnOwnWebsite = models.BooleanField(default = False)
      link = models.URLField(max_length = 200, blank = True)
      datePosted = models.DateTimeField('Job posted',auto_now_add = True)

      def __str__(self):
        return self.title


class Application(models.Model):
      profile = models.ForeignKey(Profile, on_delete = models.CASCADE, null = True, blank = True)
      job = models.ForeignKey(Job, on_delete = models.CASCADE, null = True, blank = True)
      coverLetter = models.TextField(blank = True)
      status = models.CharField(default = 'applied', max_length = 8)
      applicationDate = models.DateTimeField('ApplicationDate',auto_now_add = True)






    