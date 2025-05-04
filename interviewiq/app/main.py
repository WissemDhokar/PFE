from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, users, interviews, chatbot
from .config import settings

app = FastAPI(
    title="InterviewIQ API",
    description="API for InterviewIQ - Your AI Interview Preparation Assistant",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(interviews.router, prefix="/api/interviews", tags=["Interviews"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["Chatbot"])

@app.get("/")
async def root():
    return {"message": "Welcome to InterviewIQ API"} 