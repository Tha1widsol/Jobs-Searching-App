from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *

# Create your views here.

class getCurrentUser(APIView):
    def get(self,request,*args,**kwargs):
        serializer_class = UserSerializer(request.user)
        return Response(serializer_class.data)