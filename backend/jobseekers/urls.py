from django.urls import path
from . import views

urlpatterns = [
    path('profile',views.ProfileAPI.as_view(),name = 'profile'),
    path('toggleProfileStatus',views.ToggleProfileStatus.as_view(),name = 'toggleProfileStatus'),
    path('jobseeker/jobs',views.JobsListAPI.as_view(), name = 'jobs'),
    path('application',views.ApplicationAPI.as_view(), name = 'application'),
    path('checkApplication',views.checkApplicationExists, name = 'checkApplication')
]
