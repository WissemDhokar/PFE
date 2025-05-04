from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..models.chat import ChatHistory
from ..models.user import User
from ..schemas.chat import ChatRequest, ChatResponse, ChatHistoryResponse
from ..services.chatbot import process_message
from ..database import get_db
from ..services.auth import get_current_user

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Process the message and get response
    response, confidence = process_message(request.message)
    
    # Store in chat history
    chat_entry = ChatHistory(
        user_id=current_user.id,
        message=request.message,
        response=response,
        confidence=confidence
    )
    db.add(chat_entry)
    db.commit()
    
    return ChatResponse(
        response=response,
        confidence=confidence
    )

@router.get("/history", response_model=List[ChatHistoryResponse])
async def get_chat_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    history = db.query(ChatHistory).filter(
        ChatHistory.user_id == current_user.id
    ).order_by(ChatHistory.created_at.desc()).all()
    return history 