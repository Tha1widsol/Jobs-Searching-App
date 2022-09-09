from rest_framework.views import APIView
from rest_framework import generics
from employers.serializers import JobSerializer
from rest_framework.response import Response
from employers.models import Job
from .models import *
from django.db.models import Q
from .serializers import *

# Create your views here.

class getCurrentUser(APIView):
    def get(self,request,*args,**kwargs):
        serializer_class = UserSerializer(request.user)
        return Response(serializer_class.data)


class HomePageJobsAPI(generics.ListAPIView):
     serializer_class = JobSerializer

     def get_queryset(self):
        query = self.request.GET.get('q' ,'')
        jobs = Job.objects.filter(
        Q(title__icontains = query)|
        Q(description__icontains = query)|
        Q(company__name__icontains = query))        
        return jobs