from django.urls import path
from . import views

urlpatterns = [
    path('currentUser',views.getCurrentUser.as_view(),name = 'currentUser')
]