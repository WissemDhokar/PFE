import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import re

# Download NLTK data
nltk.download('punkt')
nltk.download('stopwords')

def process_message(message: str) -> tuple[str, float]:
    """
    Process the user message and generate a response with confidence score.
    """
    try:
        # Convert to lowercase and tokenize
        message = message.lower()
        tokens = word_tokenize(message)
        
        # Remove stopwords
        stop_words = set(stopwords.words('english'))
        filtered_tokens = [word for word in tokens if word not in stop_words]
        
        # Simple response logic (you can enhance this)
        if any(word in filtered_tokens for word in ['hello', 'hi', 'hey']):
            response = "Hello! How can I help you with your interview preparation today?"
            confidence = 0.9
        elif any(word in filtered_tokens for word in ['interview', 'prepare', 'practice']):
            response = "I can help you practice interview questions. What type of questions would you like to practice?"
            confidence = 0.8
        elif any(word in filtered_tokens for word in ['technical', 'coding', 'programming']):
            response = "I can help you practice technical interview questions. Would you like to start with algorithms, data structures, or system design?"
            confidence = 0.85
        elif any(word in filtered_tokens for word in ['behavioral', 'soft skills', 'communication']):
            response = "I can help you practice behavioral interview questions. Would you like to focus on teamwork, leadership, or problem-solving scenarios?"
            confidence = 0.85
        else:
            response = "I'm here to help with your interview preparation. What would you like to know?"
            confidence = 0.7
            
        return response, confidence
        
    except Exception as e:
        print(f"Error processing message: {e}")
        return "I'm sorry, I encountered an error processing your message.", 0.0 