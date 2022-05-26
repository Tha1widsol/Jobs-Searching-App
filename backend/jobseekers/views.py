from rest_framework import status,generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser,FormParser
from .models import *
from rest_framework.decorators import api_view
from employers.models import Job,Application
from employers.serializers import JobSerializer, ApplicationSerializer
from accounts.serializers import SavedJobSerializer
from .serializers import *

# Create your views here.

def calculateScore(job, profile):
    score = 0
    currentSkills = [skill.name.lower() for skill in profile.skills.all()]

    for skill in job.skills.all():
        if skill.name.lower() in currentSkills:
            score += 1
    
    return round(score / len(job.skills.all()) * 100, 1)

@api_view()
def getMatchingScores(request):
    matchArr = {}
    profile = Profile.objects.filter(user = request.user)
    jobs = Job.objects.all()
    for job in jobs:
        matchArr[job.id] = calculateScore(job, profile.first())

    return Response({'arr': matchArr})

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
            return Response(serializer_class.data, status = status.HTTP_200_OK)

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
    lookup_url_kwarg = 'id'
    jobID = request.GET.get(lookup_url_kwarg)
    job = Job.objects.filter(id = jobID)
    profile = Profile.objects.get(user = request.user)
    application = Application.objects.filter(profile = profile, job = job.first())
    if application.exists():
        return Response({'doesExist': True}, status = status.HTTP_200_OK)

    return Response({'doesExist': False})
    

class ApplicationsListAPI(generics.ListAPIView):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        profile = Profile.objects.filter(user = self.request.user)
        applications = None
        if (profile.exists()):
           applications = Application.objects.filter(profile = profile.first())
        return applications

class ToggleProfileStatus(APIView):
    def put(self,request):
        profile = Profile.objects.get(user = request.user)
        profile.isActive = not(profile.isActive)
        profile.save()
        return Response({'success':'Profile status has been changed'},status = status.HTTP_200_OK)

class JobsListAPI(generics.ListAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        profile = Profile.objects.filter(user = self.request.user)
        jobs = Job.objects.all()
        if profile.exists():
            applications = Application.objects.filter(profile = profile.first()).values_list('job')
            jobs = Job.objects.exclude(id__in = applications)
        
        return jobs

class SaveJobAPI(APIView):
    def post(self, request):
        try:
            lookup_url_kwarg = 'id'
            jobID = request.GET.get(lookup_url_kwarg)
            job = Job.objects.filter(id = jobID).first()
            savedJob = SavedJob(job = job)
            savedJob.save()
            self.request.user.savedJobs.add(savedJob)
            return Response(status = status.HTTP_201_CREATED)

        except:
            return Response(status = status.HTTP_400_BAD_REQUEST)

    def get(self, request):
          lookup_url_kwarg = 'id'
          jobID = request.GET.get(lookup_url_kwarg)
          job = Job.objects.filter(id = jobID).first()
          if SavedJob.objects.filter(job = job).exists():
              return Response({'alreadySaved': True}, status = status.HTTP_200_OK)

          return Response({'alreadySaved': False}, status = status.HTTP_200_OK)

    def delete(self, request):
        lookup_url_kwarg = 'id'
        savedJobID = request.GET.get(lookup_url_kwarg)
        savedJob = SavedJob.objects.get(id = savedJobID)
        savedJob.delete()
        return Response(status = status.HTTP_200_OK)
        
class SavedJobsListAPI(generics.ListAPIView):
    serializer_class = SavedJobSerializer

    def get_queryset(self):
        return self.request.user.savedJobs.all()