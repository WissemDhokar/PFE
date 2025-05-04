# InterviewIQ Backend

FastAPI backend for InterviewIQ - Your AI Interview Preparation Assistant.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:1234/interview_system
SECRET_KEY=your-secret-key-here
```

4. Run the application:
```bash
uvicorn app.main:app --reload
```

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
interviewiq/
├── app/
│   ├── __init__.py
│   ├── main.py              # Main FastAPI application
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database connection
│   ├── models/              # Database models
│   ├── schemas/             # Pydantic models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   └── utils/               # Utility functions
├── requirements.txt
└── README.md
``` 