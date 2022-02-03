from django.urls import path
from . import views

urlpatterns = [
    path('profile',views.ProfileAPI.as_view(),name = 'profile'),
    path('toggleProfileStatus',views.ToggleProfileStatus.as_view(),name = 'toggleProfileStatus'),
]
