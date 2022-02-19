from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser,FormParser
from .models import *
from .serializers import *

# Create your views here.

class ProfileAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self,request):
        serializer_class = CreateProfileSerializer
        serializer = serializer_class(data = request.data)
    
        if serializer.is_valid():
            profile = serializer.save()
            skills = request.data.get('skills')

            for s in skills.split(','):
                skill = Skill(name = s)
                skill.save()
                profile.skills.add(skill)

            profile.user = request.user
            profile.save()

            return Response(status = status.HTTP_201_CREATED) 
        
        return Response(status = status.HTTP_400_BAD_REQUEST)

    def get(self,request):
        profile = Profile.objects.filter(user = request.user)
        
        if profile.exists():
            serializer_class = ProfileSerializer(profile.first())
            return Response(serializer_class.data, status =  status.HTTP_200_OK)

        return Response(status = status.HTTP_404_NOT_FOUND)

    def delete(self,request):
        profile = Profile.objects.get(user = request.user)
        profile.delete()
        return Response(status = status.HTTP_200_OK)

class ToggleProfileStatus(APIView):
    def put(self,request):
        profile = Profile.objects.get(user = request.user)
        profile.isActive = not(profile.isActive)
        profile.save()
        return Response({'success':'Profile status has been changed'},status = status.HTTP_200_OK)
