from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Employer)
admin.site.register(Company)
admin.site.register(Job)
admin.site.register(Role)
admin.site.register(Benefit)
admin.site.register(Application)