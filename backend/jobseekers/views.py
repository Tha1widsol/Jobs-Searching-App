from rest_framework import status,generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser,FormParser
from main.models import Match
from .models import *
from rest_framework.decorators import api_view
from employers.models import Job,Application
from employers.serializers import MatchingJobsSerializer, ApplicationSerializer, SavedJobSerializer
from .serializers import *
from django.db.models import Q
import json

# Create your views here.

def calculateScore(profile, job):
    totalScore = SkillsScore = 0
    educationRank = {
        'No formal education': 1,
        'Secondary education': 2,
        'GED': 3,
        'A-Levels': 4,
        "Bachelor's degree": 5,
        "Master's degree": 6,
        'Doctorate or higher': 7,
        'Vocational qualification': 8
    }

    currentSkills = [skill.name.lower() for skill in profile.skills.all()]

    for skill in job.skills.all():
        if skill.name.lower() in currentSkills:
            SkillsScore += 1

    if len(job.skills.all()):
       totalScore += (SkillsScore / len(job.skills.all())) * 0.2

    else:
        totalScore = 0.2
    
    if educationRank[profile.education] >= educationRank[job.education]:
        totalScore += 0.2

    if any(c in job.title.lower().split(' ') for c in profile.experience.lower().split(' ')):
        totalScore += 0.5

    if len(job.benefits.all()) < 10:
           totalScore += len(job.benefits.all()) * 0.005

    else:
        totalScore = 0.005

    return totalScore * 100

@api_view(['GET'])
def getMatchingScores(request):
    profile = Profile.objects.get(user = request.user)
    jobs = Job.objects.filter(industry = profile.industry)
    
    for job in jobs:
        match, created = Match.objects.update_or_create(profile = profile, job = job)
        match.score = calculateScore(profile, job)
        match.save()
        
    return Response(status = status.HTTP_200_OK)



class ProfileAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = CreateProfileSerializer

    def post(self,request):
        serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid():
            profile = serializer.save()
            skills = request.data.get('skills')
            experience = json.loads(request.data.get('experience'))

            profile.skills.clear()
            
            for s in skills.split(','):
                skill, created = Skill.objects.get_or_create(name = s)
                skill.save()
                profile.skills.add(skill)

            profile.user = request.user
            profile.save()

            for exp in experience:
                newExp = ProfileExperience(profile = profile, title = exp['title'], companyName = exp['companyName'], EmployerName = exp['EmployerName'], EmployerEmail = exp['EmployerEmail'], EmployerPhone = exp['EmployerPhone'], description = exp['description'], years = exp['years'], isOnGoing = exp['isOnGoing'])
                newExp.save()
            
            return Response(status = status.HTTP_201_CREATED) 

        return Response(status = status.HTTP_400_BAD_REQUEST)


    def put(self,request):
        profile = Profile.objects.get(user = request.user)
        serializer = self.serializer_class(data = request.data, instance = profile)

        if serializer.is_valid():
            profile = serializer.save()
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

class ProfileSkillsAPI(APIView):
    def post(self, request):
        newSkills = []
        profile = Profile.objects.get(user = self.request.user)
        skills = json.loads(request.data.get('skills'))

        for skillName in skills:
            skill, created = Skill.objects.get_or_create(name = skillName)
            skill.save()
            newSkills.append(skill)

        profile.skills.set(newSkills, clear = True)
        profile.save()
        return Response(status = status.HTTP_200_OK)

class ProfileExperienceAPI(generics.ListAPIView):
      serializer_class = ProfileExperienceSerializer

      def post(self, request):
          serializer = self.serializer_class(data = self.request.data)
          isOnGoing = request.data.get('isOnGoing')
          profile = Profile.objects.get(user = request.user)
          
          if serializer.is_valid():
             experience = serializer.save()
             experience.profile = profile
             if isOnGoing == 'True':
                    experience.isOnGoing = True
                  
             experience.save()
             return Response(status = status.HTTP_201_CREATED)
    
          return Response(status = status.HTTP_400_BAD_REQUEST)

      def delete(self, request):
          lookup_url_kwarg = 'id'
          id = request.GET.get(lookup_url_kwarg)
          experience = ProfileExperience.objects.get(id = id)
          experience.delete()
          return Response(status = status.HTTP_200_OK)

      def put(self, request):
          lookup_url_kwarg = 'id'
          id = request.GET.get(lookup_url_kwarg)
          experience = ProfileExperience.objects.get(id = id)
          serializer = self.serializer_class(data = request.data, instance = experience)

          if serializer.is_valid():
             experience = serializer.save()
             experience.save()
             return Response(status = status.HTTP_200_OK) 

          return Response(status = status.HTTP_400_BAD_REQUEST) 

      def get_queryset(self):
          lookup_url_kwarg = 'id'
          id = self.request.GET.get(lookup_url_kwarg)
          profile = Profile.objects.get(user__id = id)
          experience = ProfileExperience.objects.filter(profile = profile)
          return experience

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
    serializer_class = MatchingJobsSerializer

    def get_queryset(self):
        profile = Profile.objects.filter(user = self.request.user)
        query = self.request.GET.get('q' ,'')

        if profile.exists():
            allJobs = Job.objects.all()
            for job in allJobs:
                match, created = Match.objects.update_or_create(profile = profile.first(), job = job)
                match.score = calculateScore(profile.first(), job)
                match.save()

            applications = Application.objects.filter(profile = profile.first()).values_list('job')

            
            jobs = Match.objects.filter(
            Q(job__title__icontains = query)|
            Q(job__description__icontains = query)|
            Q(job__company__name__icontains = query)         
            ).exclude(job__id__in = applications).order_by('-score')

        else:
            jobs = Match.objects.all()

        return jobs

class SaveJobAPI(APIView):
    def post(self, request):
        lookup_url_kwarg = 'id'
        jobID = request.GET.get(lookup_url_kwarg)
        job = Job.objects.filter(id = jobID).first()
        savedJob = SavedJob(job = job)
        savedJob.save()
        self.request.user.savedJobs.add(savedJob)
        return Response(status = status.HTTP_201_CREATED)

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