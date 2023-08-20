from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ['id','email','password']
        extra_kwargs = {'password':{'write_only':True}}
    
    def create(self,validate_data):
        user = settings.AUTH_USER_MODEL.objects.create_user(**validate_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        
        raise serializers.ValidationError("Incorrect Credentials")
