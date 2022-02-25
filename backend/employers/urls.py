from django.urls import path,re_path
from . import views

urlpatterns = [
    path('company',views.CompanyAPI.as_view(),name = 'company'),
    path('companies',views.CompaniesListAPI.as_view(), name = 'companies')
]
