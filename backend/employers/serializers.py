from rest_framework import serializers
from main.serializers import UserSerializer
from jobseekers.serializers import SkillSerializer
from .models import *

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['name']

class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefit
        fields = ['name']

class CompanySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)
    class Meta:
        model = Company
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)
    company = CompanySerializer(read_only = True)
    roles = RoleSerializer(read_only = True, many = True)
    skills = SkillSerializer(read_only = True, many = True)
    benefits = BenefitSerializer(read_only = True, many = True)

    class Meta:
        model = Job
        fields = '__all__'
