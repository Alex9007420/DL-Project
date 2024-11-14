# backend/api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FileUploadViewSet
from .views import FileSubmissionViewSet
from .views import RegisterView, LogoutView, login_view
from .views import UserProfileView
from .views import LeaderboardView



router = DefaultRouter()
router.register(r'files', FileUploadViewSet)
router.register(r'submissions', FileSubmissionViewSet, basename='submission')  # New route for FileSubmission

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', login_view, name='login'),  # Add this line
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
    # path("data/", FileUploadViewSet.as_view(), name="register"),
] 
