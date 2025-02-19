from rest_framework import serializers
from main.serializers import UserSerializer
from .models import *
from main.models import Skill
from accounts.serializers import *

class CreateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['firstName', 'middleName', 'lastName', 'phone', 'about', 'logo']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)
    skills = SkillSerializer(read_only = True, many = True)

    class Meta:
        model = Profile
        fields = '__all__'

class ProfileExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileExperience
        exclude = ['profile']


class ProfileEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileEducation
        exclude = ['profile']