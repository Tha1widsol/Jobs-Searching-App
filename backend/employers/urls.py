from django.urls import path
from . import views

urlpatterns = [
    path('employer',views.EmployerAPI.as_view(),name = 'employer')
]
