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
from .calculateScore import calculateScore
import json

# Create your views here.


@api_view(['GET'])
def getMatchingScores(request):
    profile = Profile.objects.get(user = request.user)
    jobs = Job.objects.filter(industry = profile.industry)
    
    for job in jobs:
        match, created = Match.objects.update_or_create(profile = profile, job = job)
        score = calculateScore(profile, job)
        score.calculateTotalScore()
        match.score = score.getTotalScore()
        match.save()
        
    return Response(status = status.HTTP_200_OK)

@api_view(['GET'])
def getMatchScore(request):
     lookup_url_kwarg = 'id'
     jobID = request.GET.get(lookup_url_kwarg)
     job = Job.objects.get(id = jobID)
     profile = Profile.objects.get(user = request.user)
     score = calculateScore(profile, job)
     score.calculateTotalScore()
     return Response({'score': score.getTotalScore()})
     
    
@api_view(['GET'])
def checkProfileExists(request):
    lookup_url_kwarg = 'id'
    userID = request.GET.get(lookup_url_kwarg)
    profile = Profile.objects.filter(user__id = userID)
    if profile.exists():
        return Response({'exists': True})

    return Response({'exists': False})

class ProfileAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = CreateProfileSerializer

    def post(self,request):
        profile = Profile.objects.filter(user = request.user)

        if profile.exists():
            serializer = self.serializer_class(data = request.data, instance = profile.first())
        
        else:
             serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid():
            profile = serializer.save()
            profile.user = request.user
            profile.save()
            return Response(status = status.HTTP_201_CREATED) 

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

class ProfileSkillsAPI(generics.ListAPIView):
    serializer_class = SkillSerializer

    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid():
            skillName = serializer.data.get('name')
            isSpecific = serializer.data.get('specific')
            profile = Profile.objects.get(user = request.user)
            skill, created = Skill.objects.get_or_create(name = skillName, specific = isSpecific)
            profile.skills.add(skill)
            profile.save()
            serializer = self.serializer_class(skill)
            return Response({'skill': serializer.data}, status = status.HTTP_200_OK)

        return Response(status = status.HTTP_400_BAD_REQUEST)

    
    def put(self, request):
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        skill = Skill.objects.get(id = id)
        serializer = self.serializer_class(data = request.data, instance = skill)
        if serializer.is_valid():
            serializer.save()
            return Response({'skill': serializer.data}, status = status.HTTP_200_OK)
        
        return Response(status = status.HTTP_400_BAD_REQUEST)


    def get_queryset(self):
          profile = Profile.objects.get(user = self.request.user)
          skills = profile.skills.all()
          return skills
    
    def delete(self, request):
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        skill = Skill.objects.get(id = id)
        skill.delete()
        return Response(status = status.HTTP_200_OK)


class ProfileExperienceAPI(generics.ListAPIView):
      serializer_class = ProfileExperienceSerializer

      def post(self, request):
          lookup_url_kwarg = 'id'
          id = request.GET.get(lookup_url_kwarg)
          experience = ProfileExperience.objects.filter(id = id)
          
          if experience.exists():
            serializer = self.serializer_class(data = self.request.data, instance = experience.first())
        
          else:
              serializer = self.serializer_class(data = self.request.data)
         
          isOnGoing = request.data.get('isOnGoing')
          profile = Profile.objects.get(user = request.user)
          
          if serializer.is_valid():
             experience = serializer.save()
             experience.profile = profile
    
             if isOnGoing == 'true':
                    experience.isOnGoing = True
                  
             experience.save()
             return Response({'experience': serializer.data},status = status.HTTP_201_CREATED)
    
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

@api_view(['PUT'])
def EditProfilePreferences(request):
    profile = Profile.objects.get(user = request.user)
    profile.cv = request.data.get('cv')
    profile.industry = request.data.get('industry')
    profile.distance = request.data.get('distance')
    profile.save()
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

     def delete(self, request):
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        application = Application.objects.get(id = id)
        application.delete()
        return Response(status = status.HTTP_200_OK)

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
                score = calculateScore(profile.first(), job)
                score.calculateTotalScore()
                match.score = score.getTotalScore()
                match.save()

            applications = Application.objects.filter(profile = profile.first()).values_list('job')

            
            jobs = Match.objects.filter(
            Q(job__title__icontains = query)|
            Q(job__description__icontains = query)|
            Q(job__company__name__icontains = query),
            profile = profile.first()
         
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