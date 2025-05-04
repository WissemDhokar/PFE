from rest_framework import serializers
from .models import ChatHistory
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ChatHistorySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # This will show user details in the response
    
    class Meta:
        model = ChatHistory
        fields = ['id', 'user', 'message', 'response', 'timestamp', 'context']
        read_only_fields = ['id', 'timestamp', 'user']  # These fields can't be modified by the user 