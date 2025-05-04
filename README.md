# InterviewIQ Chatbot Backend

This is the Django backend for the InterviewIQ chatbot feature.

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Download NLTK data:
```python
python -c "import nltk; nltk.download('punkt'); nltk.download('wordnet')"
```

4. Set up environment variables:
Create a `.env` file in the root directory with:
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgres://user:password@localhost:5432/interviewiq
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Start the development server:
```bash
python manage.py runserver
```

The chatbot API will be available at `http://localhost:8000/api/chat/` 