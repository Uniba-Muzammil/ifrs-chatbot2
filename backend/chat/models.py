from django.db import models
from django.contrib.auth.models import User  # ✅ Add this

class ChatLog(models.Model):
    MODE_CHOICES = [('basic','Basic RAG'),('deep','Deep Analysis')]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # ✅ link to user
    standard = models.CharField(max_length=20)
    question = models.TextField()
    mode = models.CharField(max_length=10, choices=MODE_CHOICES, default='basic')
    answer = models.TextField(blank=True, null=True)
    paragraph_id = models.CharField(max_length=50, blank=True, null=True)
    auditor_focus = models.TextField(blank=True, null=True)
    deep_analysis = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.standard} | {self.mode} | {self.created_at}"