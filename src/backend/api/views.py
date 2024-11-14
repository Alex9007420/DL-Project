from django.shortcuts import render, redirect
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import FileUpload, FileSubmission, UserProfile
from .serializers import FileUploadSerializer, FileSubmissionSerializer, UserProfileSerializer, LeaderboardSerializer

from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.urls import reverse_lazy
from django.views import generic

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import serializers, generics

import logging

# Set up logging
logger = logging.getLogger(__name__)


# View for uploading files, restricted to authenticated users
class FileUploadViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]  # Allow access without authentication
    queryset = FileUpload.objects.all()
    serializer_class = FileUploadSerializer

# View for file submissions, also restricted to authenticated users
class FileSubmissionViewSet(viewsets.ModelViewSet):
    queryset = FileSubmission.objects.all()
    serializer_class = FileSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Filter submissions to only return those belonging to the logged-in user
    def get_queryset(self):
        return FileSubmission.objects.filter(user=self.request.user)

    # Override the create method to automatically associate the submission with the user
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Save submission with the current user

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()  # This will use the filtered queryset for the user
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

# User registration view
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]  # Allow access without authentication

    def post(self, request):
        logger.debug("hi")
        logger.debug(f"Received data: {request.data}")

        username = request.data.get("username")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create the user
        user = User.objects.create_user(username=username, password=password)

        # Create the associated UserProfile with a default score of 0
        UserProfile.objects.create(user=user, score=0)

        user = User.objects.create_user(username=username, password=password)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_201_CREATED)

# User logout view
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()  # Delete the token to log out
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'

    def form_valid(self, form):
        valid = super(SignUpView, self).form_valid(form)
        login(self.request, self.object)
        return valid

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)

# View to list all users with their scores
class LeaderboardView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]  # Allow access without authentication

    queryset = UserProfile.objects.all().order_by('-score')  # Order by score (descending)
    serializer_class = LeaderboardSerializer

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)