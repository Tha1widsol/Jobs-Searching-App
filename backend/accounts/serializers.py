from rest_framework import serializers
from .models import User, SavedJob
from employers.serializers import JobSerializer
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','password']
        extra_kwargs = {'password':{'write_only':True}}
    
    def create(self,validate_data):
        user = User.objects.create_user(**validate_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        
        raise serializers.ValidationError("Incorrect Credentials")

class SavedJobSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only = True)

    class Meta:
        model = SavedJob
        fields = '__all__'
