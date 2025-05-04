from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:1234/interview_system"
    
    # JWT settings
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS settings
    CORS_ORIGINS: list = ["http://localhost:3000"]
    
    class Config:
        env_file = ".env"

settings = Settings() 