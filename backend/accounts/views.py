from rest_framework import generics
from rest_framework.response import Response
from .serializers import *
from main.serializers import UserSerializer
from knox.models import AuthToken

# Create your views here.

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self,request,option,*args,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()

        if option == 'employer':
            user.isAnEmployer = True
            user.save()

        return Response({"message": "Account is successfully made",
        "token": AuthToken.objects.create(user)[1]
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data
        newToken = AuthToken.objects.create(user)[1]
        response = Response({"message": "You've successfully logged in",
        "token": newToken
        })

        response.set_cookie('auth_token', newToken , httponly = True, samesite = 'strict')
        return response