from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    confidence = Column(Integer)  # Store confidence score as percentage
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship with User
    user = relationship("User", back_populates="chat_history")

# Add relationship to User model
from .user import User
User.chat_history = relationship("ChatHistory", back_populates="user") 