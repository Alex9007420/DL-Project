from rest_framework import serializers
from .models import FileUpload
from .models import FileSubmission

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import UserProfile

# Serializer to structure the user data for the response
class UserProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='first_name')
    last_name = serializers.CharField(source='last_name')
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

# Profile view to return user information
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)



class FileUploadSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = FileUpload
        fields = ['id', 'file', 'uploaded_at', 'file_url']  # Include file_url as a custom field

    def get_file_url(self, obj):
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.file.url)  # Full URL
        return obj.file.url
    
class FileSubmissionSerializer(serializers.ModelSerializer):
    size = serializers.SerializerMethodField()

    class Meta:
        model = FileSubmission
        fields = ['id', 'file', 'uploaded_at', 'size']

    def get_size(self, obj):
        return obj.file.size if obj.file else 0  # File size in bytes
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

# Serializer for leaderboard data
class LeaderboardSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')

    class Meta:
        model = UserProfile
        fields = ['username', 'score']
