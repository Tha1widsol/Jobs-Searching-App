from django.db import models

# Create your models here.

class Skill(models.Model):
      name = models.CharField(max_length = 100)
      specific = models.BooleanField(default = False)
      
      def __str__(self):
          return self.name

class Match(models.Model):
      profile = models.ForeignKey('jobseekers.Profile',blank = True, null = True, on_delete = models.CASCADE)
      job = models.ForeignKey('employers.Job',blank = True, null = True, on_delete = models.CASCADE)
      score = models.IntegerField(default = 0)
