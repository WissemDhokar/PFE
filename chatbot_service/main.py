from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import re

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Download NLTK data
nltk.download('punkt')
nltk.download('stopwords')

class ChatRequest(BaseModel):
    message: str
    user_id: str

class ChatResponse(BaseModel):
    response: str
    confidence: float

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Process the message
        message = request.message.lower()
        tokens = word_tokenize(message)
        stop_words = set(stopwords.words('english'))
        filtered_tokens = [word for word in tokens if word not in stop_words]
        
        # Simple response logic (you can enhance this)
        if any(word in filtered_tokens for word in ['hello', 'hi', 'hey']):
            response = "Hello! How can I help you with your interview preparation today?"
            confidence = 0.9
        elif any(word in filtered_tokens for word in ['interview', 'prepare', 'practice']):
            response = "I can help you practice interview questions. What type of questions would you like to practice?"
            confidence = 0.8
        else:
            response = "I'm here to help with your interview preparation. What would you like to know?"
            confidence = 0.7
            
        return ChatResponse(response=response, confidence=confidence)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001) 