from django.db import models
from accounts.models import User

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





    