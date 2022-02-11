from django.db import models
from accounts.models import User

# Create your models here.

class Employer(models.Model):
   user = models.OneToOneField(User,on_delete = models.CASCADE, null = True)
   firstName = models.CharField(max_length = 200)
   middleName = models.CharField(max_length = 200,blank = True)
   lastName = models.CharField(max_length = 200)
   about = models.TextField(blank = True)
   logo = models.ImageField(upload_to = 'EmployerLogosFiles', blank = True)

   def __str__(self):
    return self.firstName




    