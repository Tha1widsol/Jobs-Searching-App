from django.db import models
from django.contrib.auth.models import AbstractUser
from jobseekers.models import SavedJob
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    isHired = models.BooleanField('is_hired',default=False)
    isAnEmployer = models.BooleanField('is_an_employer',default=False)
    savedJobs = models.ManyToManyField(SavedJob, blank = True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
 
    objects = UserManager()

    def __str__(self):
        return self.email