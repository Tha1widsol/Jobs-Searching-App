from django.urls import path
from . import views

urlpatterns = [
    path('profile', views.ProfileAPI.as_view(),name = 'profile'),
    path('profile/skills', views.ProfileSkillsAPI.as_view(), name = 'profileSkills'),
    path('toggleProfileStatus',views.ToggleProfileStatus.as_view(),name = 'toggleProfileStatus'),
    path('jobseeker/jobs',views.JobsListAPI.as_view(), name = 'jobs'),
    path('save-job',views.SaveJobAPI.as_view(), name = 'save-job'),
    path('saved-jobs',views.SavedJobsListAPI.as_view(), name = 'save-jobs'),
    path('application',views.ApplicationAPI.as_view(), name = 'application'),
    path('applications/jobseeker',views.ApplicationsListAPI.as_view(), name = 'applications'),
    path('profileExperience', views.ProfileExperienceAPI.as_view(), name = 'profileExperience'),
    path('checkApplication',views.checkApplicationExists, name = 'checkApplication'),
    path('getMatchingScores', views.getMatchingScores, name = 'getMatchingScores'),
    path('searchJobs', views.SearchJobsListAPI.as_view(), name = 'searchJobs')
]
