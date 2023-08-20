from django.urls import path
from knox import views as knox_views
from . import views

urlpatterns = [
  path('auth/register/<str:option>',views.RegisterAPI.as_view(),name = 'register'),
  path('auth/login',views.LoginAPI.as_view(),name = 'login'),
  path('auth/refresh-token', views.CookieTokenRefreshView.as_view()),
  path('auth/user', views.user),
  path('auth/logout',knox_views.LogoutView.as_view(),name = 'knox_logout')
]