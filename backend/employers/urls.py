from django.urls import path,re_path
from . import views

urlpatterns = [
    path('create-company',views.CreateCompanyAPI.as_view(),name = 'company'),
    re_path(r'^companies/(?P<id>\d+)/$', views.GetCompanyAPI.as_view()),
    path('companies',views.CompaniesListAPI.as_view(), name = 'companies')

]
