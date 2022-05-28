from rest_framework import status,generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser,FormParser
from jobseekers.models import Profile
from jobseekers.serializers import ProfileSerializer
from .models import *
from .serializers import *

# Create your views here.

class CompanyAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = CompanySerializer

    def post(self,request):
        serializer = self.serializer_class(data = request.data)

        if serializer.is_valid():
            employer = serializer.save()
            employer.user = request.user
            employer.save()
            return Response(status = status.HTTP_201_CREATED)

        return Response(status = status.HTTP_400_BAD_REQUEST)

    def get(self,request):
        lookup_url_kwarg ='id'
        id = request.GET.get(lookup_url_kwarg)
        company = Company.objects.filter(id = id)

        if company.exists():
            serializer_class = CompanySerializer(company.first())
            return Response(serializer_class.data, status =  status.HTTP_200_OK)

        return Response(status = status.HTTP_404_NOT_FOUND)
    
    def put(self,request):
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        company = Company.objects.get(id = id)
        serializer = self.serializer_class(data = request.data, instance = company)

        if serializer.is_valid():
            company = serializer.save()
            company.user = request.user
            company.save()

            return Response(status = status.HTTP_200_OK)

        return Response(status = status.HTTP_400_BAD_REQUEST) 

    def delete(self,request):
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        company = Company.objects.get(id = id)
        company.delete()
        return Response(status = status.HTTP_200_OK)

class CompaniesListAPI(generics.ListAPIView):
    serializer_class = CompanySerializer

    def get_queryset(self):
        companies = Company.objects.filter(user = self.request.user)
        return companies

class JobAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = JobSerializer

    def post(self,request):
        serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid():
            job = serializer.save()
            roles = request.data.get('roles')
            benefits = request.data.get('benefits')
            skills = request.data.get('skills')
            remote = request.data.get('remote')
            training = request.data.get('training')
            applyOnOwnWebsite = request.data.get('applyOnOwnWebsite')

            if remote == 'true':
                job.remote = True
            
            if training == 'true':
                job.training = True
            
            if applyOnOwnWebsite == 'true':
                job.applyOnOwnWebsite = True

            for r in roles.split(','):
                role, created = Role.objects.get_or_create(name = r)
                role.save()
                job.roles.add(role)

            for b in benefits.split(','):
                benefit, created = Benefit.objects.get_or_create(name = b)
                benefit.save()
                job.benefits.add(benefit)


            for s in skills.split(','):
                skill, created = Skill.objects.get_or_create(name = s)
                skill.save()
                job.skills.add(skill)
            
            job.employer = request.user
            job.save()
            return Response(status = status.HTTP_201_CREATED)

        return Response(status = status.HTTP_400_BAD_REQUEST)

    
    def put(self,request):
        lookup_url_kwarg ='id'
        id = request.GET.get(lookup_url_kwarg)
        job = Job.objects.get(id = id)
        serializer = self.serializer_class(data = request.data, instance = job)
        job.skills.clear()
        job.roles.clear()
        job.benefits.clear()

        if serializer.is_valid():
            job = serializer.save()
            roles = request.data.get('roles')
            benefits = request.data.get('benefits')
            skills = request.data.get('skills')
            remote = request.data.get('remote')
            training = request.data.get('training')
            applyOnOwnWebsite = request.data.get('applyOnOwnWebsite')

            
            if remote == 'true':
                job.remote = True
            
            if training == 'true':
                job.training = True
            
            if applyOnOwnWebsite == 'true':
                job.applyOnOwnWebsite = True

            job.skills.clear()
            job.benefits.clear()
            job.roles.clear()

            for r in roles.split(','):
                role, created = Role.objects.get_or_create(name = r)
                role.save()
                job.roles.add(role)

            for b in benefits.split(','):
                benefit, created = Benefit.objects.get_or_create(name = b)
                benefit.save()
                job.benefits.add(benefit)

            for s in skills.split(','):
                skill, created = Skill.objects.get_or_create(name = s)
                skill.save()
                job.skills.add(skill)
            
            job.user = request.user
            job.save()
            return Response(status = status.HTTP_200_OK)

        return Response(status = status.HTTP_400_BAD_REQUEST)
        
    def get(self,request):
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        job = Job.objects.filter(id = id)

        if job.exists():
            serializer_class = JobSerializer(job.first())
            return Response(serializer_class.data, status = status.HTTP_200_OK)
        
        return Response(status = status.HTTP_404_NOT_FOUND)

    def delete(self,request):
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        job = Job.objects.get(id = id)
        job.delete()
        return Response(status = status.HTTP_200_OK)

class JobsListAPI(generics.ListAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        jobs = Job.objects.filter(employer = self.request.user)
        return jobs

class ProfilesListAPI(generics.ListAPIView):
    serializer_class = ProfileSerializer
        
    def get_queryset(self):
        profiles = Profile.objects.all()
        return profiles
        
        
class ApplicantsListAPI(generics.ListAPIView):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        applicants = Application.objects.filter(job__employer = self.request.user)
        return applicants

class JobApplicantsListAPI(generics.ListAPIView):
      serializer_class = ApplicationSerializer

      def get_queryset(self):
          applicants = None
          lookup_url_kwarg = 'jobID'
          id = self.request.GET.get(lookup_url_kwarg)
          job = Job.objects.filter(id = id)

          if job.exists():
              applicants = Application.objects.filter(job = job.first())
    
          return applicants
