from django.contrib import admin
from .models import Profile, ProfileExperience, SavedJob

# Register your models here.

admin.site.register(Profile)
admin.site.register(ProfileExperience)
admin.site.register(SavedJob)
