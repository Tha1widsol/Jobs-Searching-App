from django.urls import path
from . import views

urlpatterns = [
    path('user',views.getCurrentUser.as_view(),name = 'currentUser'),
    path('homePageJobs', views.HomePageJobsAPI.as_view(), name = 'homeJobs')
]