from codecs import lookup
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework import generics
from .models import *
from .serializers import *

# Create your views here.

class CompanyAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self,request):
        serializer_class = CompanySerializer
        serializer = serializer_class(data = request.data)

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

class CompaniesListAPI(generics.ListAPIView):
    serializer_class = CompanySerializer

    def get_queryset(self):
        companies = Company.objects.filter(user = self.request.user)
        if companies.exists():
            return companies

        return Response(status = status.HTTP_404_NOT_FOUND)

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
                if not(Role.objects.filter(name = r).exists()):
                    role = Role(name = r)
                    role.save()

                else:
                    role = Role.objects.filter(name = r).first()

                job.roles.add(role)

            for b in benefits.split(','):
                if not(Benefit.objects.filter(name = b).exists()):
                    benefit = Benefit(name = b)
                    benefit.save()

                else:
                    benefit = Benefit.objects.filter(name = b).first()

                job.benefits.add(benefit)

            for s in skills.split(','):
                if not(Skill.objects.filter(name = s).exists()):
                    skill = Skill(name = s)
                    skill.save()
                    
                else:
                    skill = Skill.objects.filter(name = s).first()

                job.skills.add(skill)
            
            job.user = request.user
            job.save()
            return Response(status = status.HTTP_201_CREATED)

        return Response(status = status.HTTP_400_BAD_REQUEST)

            
class JobsListAPI(generics.ListAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        jobs = Job.objects.filter(user = self.request.user)
        if jobs.exists():
            return jobs

        return Response(status = status.HTTP_404_NOT_FOUND)
