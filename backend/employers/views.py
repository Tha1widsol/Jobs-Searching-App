from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser,FormParser
from .models import *
from .serializers import *

# Create your views here.

class EmployerAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self,request):
        serializer_class = CreateEmployerSerializer
        serializer = serializer_class(data = request.data)

        if serializer.is_valid():
            employer = serializer.save()
            employer.user = request.user
            employer.save()
            return Response(status = status.HTTP_201_CREATED)

        return Response(status = status.HTTP_400_BAD_REQUEST)
