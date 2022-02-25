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
