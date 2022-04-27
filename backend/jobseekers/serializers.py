from rest_framework import serializers
from main.serializers import UserSerializer
from .models import Profile
from main.models import Skill
from accounts.serializers import *

class CreateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['user','skills','isActive']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)
    skills = SkillSerializer(read_only = True, many = True)

    class Meta:
        model = Profile
        fields = '__all__'