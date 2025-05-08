from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

app = FastAPI()

engine = create_engine("sqlite:///chatbot.db")
Session = sessionmaker(bind=engine)
Base = declarative_base()

class QA(Base):
    __tablename__ = "qa"
    id = Column(Integer, primary_key=True)
    question = Column(String)
    answer = Column(String)

Base.metadata.create_all(engine)

class UserQuery(BaseModel):
    question: str

@app.post("/chat")
def chat(query: UserQuery):
    session = Session()
    q = session.query(QA).filter(QA.question.ilike(f"%{query.question}%")).first()
    session.close()
    if q:
        return {"response": q.answer}
    return {"response": "Sorry, I don't know the answer yet."}
