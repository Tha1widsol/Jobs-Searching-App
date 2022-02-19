from rest_framework import serializers
from main.serializers import UserSerializer
from .models import *

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)
    class Meta:
        model = Company
        fields = '__all__'
