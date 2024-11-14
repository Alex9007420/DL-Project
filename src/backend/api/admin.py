from django.contrib import admin
from .models import FileUpload, FileSubmission

admin.site.register(FileUpload)

class FileSubmissionAdmin(admin.ModelAdmin):
    list_display = ('file', 'uploaded_at', 'user')  # Display the user in the admin list view
    list_filter = ('user', 'uploaded_at')           # Filter by user and upload date

admin.site.register(FileSubmission, FileSubmissionAdmin)