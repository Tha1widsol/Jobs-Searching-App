from django.urls import path
from . import views

urlpatterns = [
    path('company',views.CompanyAPI.as_view(),name = 'company'),
    path('companies',views.CompaniesListAPI.as_view(), name = 'companies'),
    path('employer/jobs',views.JobsListAPI.as_view(), name = 'jobs'),
    path('job',views.JobAPI.as_view(), name = 'job'),
    path('profiles',views.ProfilesListAPI.as_view(), name = 'profiles'),
    path('applications/employers', views.ApplicantsListAPI.as_view(), name = 'applicants'),
    path('applications/employers/job', views.JobApplicantsListAPI.as_view(), name = 'job-applicants')

]
