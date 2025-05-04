from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet
import random
from .chatbot_data import INTERVIEW_KEYWORDS, RESPONSE_TEMPLATES, FOLLOW_UP_QUESTIONS
from .models import ChatHistory
from .serializers import ChatHistorySerializer
from django.contrib.auth.models import User

class ChatView(viewsets.ViewSet):
    permission_classes = [AllowAny]  # Allow unauthenticated access
    
    @action(detail=False, methods=['post'])
    def chat(self, request):
        user_message = request.data.get('message', '')
        user = request.user if request.user.is_authenticated else None
        
        # Tokenize and lowercase the message
        tokens = word_tokenize(user_message.lower())
        
        # Determine the category of the message
        category = self._determine_category(tokens)
        
        # Generate appropriate response
        response = self._generate_response(category, tokens)
        
        # Save to database if user is authenticated
        if user:
            chat_history = ChatHistory.objects.create(
                user=user,
                message=user_message,
                response=response
            )
            serializer = ChatHistorySerializer(chat_history)
            return Response(serializer.data)
        
        return Response({'response': response})
    
    def _determine_category(self, tokens):
        # Check which category has the most matching keywords
        max_matches = 0
        best_category = 'general'
        
        for category, keywords in INTERVIEW_KEYWORDS.items():
            matches = sum(1 for keyword in keywords if keyword in tokens)
            if matches > max_matches:
                max_matches = matches
                best_category = category
                
        return best_category
    
    def _generate_response(self, category, tokens):
        # Get appropriate response templates
        templates = RESPONSE_TEMPLATES.get(category, RESPONSE_TEMPLATES['general'])
        
        # If it's a specific category, consider adding a follow-up question
        if category in ['technical', 'behavioral'] and random.random() < 0.3:  # 30% chance of follow-up
            follow_ups = FOLLOW_UP_QUESTIONS.get(category, [])
            if follow_ups:
                return random.choice(follow_ups)
        
        return random.choice(templates)
    
    @action(detail=False, methods=['get'])
    def history(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=401)
            
        chat_history = ChatHistory.objects.filter(user=request.user).order_by('-timestamp')
        serializer = ChatHistorySerializer(chat_history, many=True)
        return Response(serializer.data) 