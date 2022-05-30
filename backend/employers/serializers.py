from rest_framework import serializers
from jobseekers.serializers import ProfileSerializer, SkillSerializer
from main.serializers import UserSerializer
from main.models import Match
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
    employer = UserSerializer(read_only = True)
    company = CompanySerializer(read_only = True)
    roles = RoleSerializer(read_only = True, many = True)
    skills = SkillSerializer(read_only = True, many = True)
    benefits = BenefitSerializer(read_only = True, many = True)

    class Meta:
        model = Job
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only = True)
    job = JobSerializer(read_only = True)

    class Meta:
        model = Application
        fields = '__all__'

class MatchingJobsSerializer(serializers.ModelSerializer):
    employer = UserSerializer(read_only = True)
    company = CompanySerializer(read_only = True)
    job = JobSerializer(read_only = True)

    class Meta:
        model = Match
        fields = '__all__'