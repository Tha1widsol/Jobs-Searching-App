from rest_framework import status,generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser,FormParser
from jobseekers.models import Profile
from jobseekers.serializers import *
from rest_framework.decorators import api_view
from .models import *
from django.db.models import Q
from .serializers import *
import json

# Create your views here.

def switchCurrentCompany(user, company):
    oldCompany = Company.objects.get(user = user, isActive = True)
    oldCompany.isActive = False
    oldCompany.save()
    company.isActive = True
    company.save()

class CompanyAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = CompanySerializer

    def post(self,request):
        serializer = self.serializer_class(data = request.data)

        if serializer.is_valid():
            company = serializer.save()
            company.user = request.user
            company.save()
            switchCurrentCompany(request.user, company)
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

class CurrentCompanyAPI(APIView):
    serializer_class = CompanySerializer

    def get(self, request):
        company = Company.objects.get(user = request.user, isActive = True)
        serializer = self.serializer_class(company)
        return Response(serializer.data, status = status.HTTP_200_OK)

    def put(self, request):
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        company = Company.objects.get(id = id)
        switchCurrentCompany(request.user, company)
        return Response(status = status.HTTP_200_OK)

class CompaniesListAPI(generics.ListAPIView):
    serializer_class = CompanySerializer

    def get_queryset(self):
        companies = Company.objects.filter(user = self.request.user, isActive = False)
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
            experience = json.loads(request.data.get('experience'))
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

            for exp in experience:
                newExp = Experience(job = job, experience = exp['description'], years = exp['years'], required = exp['isRequired'])
                newExp.save()
                
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
            experience = json.loads(request.data.get('experience'))
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

            for exp in experience:
                newExp = Experience(job = job, experience = exp['description'], years = exp['years'], required = exp['isRequired'])
                newExp.save()
           
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
        
class JobSkillsAPI(generics.ListAPIView):
    serializer_class = SkillSerializer

    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        if serializer.is_valid():
            skillName = serializer.data.get('name')
            isSpecific = serializer.data.get('specific')
            job = Job.objects.get(id = id)
            skill, created = Skill.objects.get_or_create(name = skillName, specific = isSpecific)
            job.skills.add(skill)
            job.save()
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


    def delete(self, request):
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        skill = Skill.objects.get(id = id)
        skill.delete()
        return Response(status = status.HTTP_200_OK)

class JobExperienceAPI(generics.ListAPIView):
    serializer_class = ExperienceSerializer

    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        if serializer.is_valid():
            experience = serializer.data.get('experience')
            years = serializer.data.get('years')
            required = serializer.data.get('required')
    
            job = Job.objects.get(id = id)
            experience, created = Experience.objects.get_or_create(job = job, experience = experience, years = years, required = required)
            experience.save()
            serializer = self.serializer_class(experience)
            return Response({'experience': serializer.data}, status = status.HTTP_200_OK)

        return Response(status = status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request):
        lookup_url_kwarg = 'id'
        id = request.GET.get(lookup_url_kwarg)
        experience = Experience.objects.get(id = id)
        experience.delete()
        return Response(status = status.HTTP_200_OK)

    def get_queryset(self):
        lookup_url_kwarg = 'id'
        id = self.request.GET.get(lookup_url_kwarg)
        experience = Experience.objects.defer('job').filter(job__id = id)
        return experience

class JobsListAPI(generics.ListAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        jobs = Job.objects.filter(employer = self.request.user, company__isActive = True)
        return jobs

class ProfilesListAPI(generics.ListAPIView):
    serializer_class = ProfileSerializer
        
    def get_queryset(self):
        profiles = None
        company = Company.objects.get(user = self.request.user, isActive = True)
        applications = Application.objects.filter(job__company = company)

        applied = [applicant.profile.id for applicant in applications]
      
        query = self.request.GET.get('q', '')
        profiles = Profile.objects.filter(
            Q(user__email__icontains = query)|
            Q(firstName__icontains = query)|
            Q(middleName__icontains = query)|
            Q(lastName__icontains = query)         
            )

        return profiles

class ApplicantsListAPI(generics.ListAPIView):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        applicants = Application.objects.filter(job__employer = self.request.user, job__company__isActive = True)
        return applicants

class JobApplicantsListAPI(generics.ListAPIView):
      serializer_class = ApplicationSerializer

      def get_queryset(self):
          applicants = None
          lookup_url_kwarg = 'jobID'
          id = self.request.GET.get(lookup_url_kwarg)
          applicants = Application.objects.filter(job__id = id, job__company__isActive = True)
          return applicants
