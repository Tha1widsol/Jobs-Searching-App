from rest_framework import status,generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser,FormParser
from .models import *
from rest_framework.decorators import api_view
from employers.models import Job,Application
from employers.serializers import JobSerializer,ApplicationSerializer
from .serializers import *

# Create your views here.

class ProfileAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = CreateProfileSerializer

    def post(self,request):
        serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid():
            profile = serializer.save()
            skills = request.data.get('skills')

            for s in skills.split(','):
                if not(Skill.objects.filter(name = s).exists()):
                    skill = Skill(name = s)
                    skill.save()
                    
                else:
                    skill = Skill.objects.filter(name = s).first()

                profile.skills.add(skill)

            profile.user = request.user
            profile.save()
            
            return Response(status = status.HTTP_201_CREATED) 

        return Response(status = status.HTTP_400_BAD_REQUEST)

    def put(self,request):
        profile = Profile.objects.get(user = request.user)
        serializer = self.serializer_class(data = request.data, instance = profile)

        if serializer.is_valid():
            profile = serializer.save()
            skills = request.data.get('skills')
            
            for s in skills.split(','):
                if not(Skill.objects.filter(name = s).exists()):
                    skill = Skill(name = s)
                    skill.save()
                    
                else:
                    skill = Skill.objects.filter(name = s).first()

                profile.skills.add(skill)

            profile.user = request.user
            profile.save()

            return Response(status = status.HTTP_200_OK) 

        return Response(status = status.HTTP_400_BAD_REQUEST) 
        
    def get(self,request):
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        user = User.objects.get(id = id)
        profile = Profile.objects.filter(user = user)
        
        if profile.exists():
            serializer_class = ProfileSerializer(profile.first())
            return Response(serializer_class.data, status =  status.HTTP_200_OK)

        return Response(status = status.HTTP_404_NOT_FOUND)

    def delete(self,request):
        profile = Profile.objects.get(user = request.user)
        profile.delete()
        return Response(status = status.HTTP_200_OK)


class ApplicationAPI(APIView):
     parser_classes = (MultiPartParser, FormParser)
     serializer_class = ApplicationSerializer

     def post(self, request):
        serializer = self.serializer_class(data = request.data)

        if serializer.is_valid():
            application = serializer.save()
            jobID = request.data.get('jobID')
            profile = Profile.objects.get(user = request.user)
            job = Job.objects.get(id = jobID)
            application.profile = profile
            application.job = job
            application.save()
            job.applicantsCount += 1
            job.save()

            return Response(status = status.HTTP_201_CREATED) 

        return Response(status = status.HTTP_400_BAD_REQUEST) 

     def get(self, request):
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        application = Application.objects.filter(id = id)

        if application.exists():
           serializer_class = ApplicationSerializer(application.first())
           return Response(serializer_class.data, status = status.HTTP_200_OK)

        return Response(status = status.HTTP_404_NOT_FOUND)

@api_view()
def checkApplicationExists(request):
    lookup_url_kwarg = 'jobID'
    jobID = request.GET.get(lookup_url_kwarg)
    job = Job.objects.get(id = jobID)
    profile = Profile.objects.get(user = request.user)
    application = Application.objects.filter(profile = profile, job = job)
    if application.exists():
        return Response(status = status.HTTP_200_OK)

    return Response(status = status.HTTP_404_NOT_FOUND)

class ToggleProfileStatus(APIView):
    def put(self,request):
        profile = Profile.objects.get(user = request.user)
        profile.isActive = not(profile.isActive)
        profile.save()
        return Response({'success':'Profile status has been changed'},status = status.HTTP_200_OK)

class JobsListAPI(generics.ListAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        profile = Profile.objects.get(user = self.request.user)
        applications = Application.objects.filter(profile = profile).values_list('job')
        jobs = Job.objects.exclude(id__in = applications)

        if jobs.exists():
            return jobs

        return Response(status = status.HTTP_404_NOT_FOUND)


