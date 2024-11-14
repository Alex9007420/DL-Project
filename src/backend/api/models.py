from django.db import models
from django.contrib.auth.models import User  # Import the User model
import os

# models.py
user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="files", null=True, blank=True)


class FileUpload(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def delete(self, *args, **kwargs):
        # Delete the file from the media folder
        if self.file:
            if os.path.isfile(self.file.path):
                os.remove(self.file.path)
        # Delete the database entry
        super().delete(*args, **kwargs)
        

class FileSubmission(models.Model):
    file = models.FileField(upload_to='submissions/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="files", null=True, blank=True)

    def delete(self, *args, **kwargs):
        # Delete the file from the filesystem when the database entry is deleted
        if self.file:
            self.file.delete()
        super().delete(*args, **kwargs)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)  # Default score is 0

    def __str__(self):
        return f"{self.user.username}'s profile"
