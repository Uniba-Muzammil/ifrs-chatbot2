from rest_framework import serializers
from .models import ChatLog

class ChatLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatLog
        fields = ['id', 'standard', 'question', 'mode', 'answer', 'auditor_focus', 'deep_analysis', 'created_at']