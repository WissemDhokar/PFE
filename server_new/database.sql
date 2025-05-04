-- Drop existing tables and types if they exist
DROP TABLE IF EXISTS chat_history;
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS question_bank;
DROP TABLE IF EXISTS interview_feedback;
DROP TABLE IF EXISTS performance_analytics;
DROP TABLE IF EXISTS form_submissions;
DROP TYPE IF EXISTS interview_type;
DROP TYPE IF EXISTS interview_status;
DROP TYPE IF EXISTS gender_type;
DROP TYPE IF EXISTS availability_type;
DROP TYPE IF EXISTS role_type;
DROP TYPE IF EXISTS feedback_type;
DROP TYPE IF EXISTS question_category;
DROP TYPE IF EXISTS submission_status;

-- Create enum types FIRST
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE availability_type AS ENUM ('immediate', '2weeks', '1month', 'negotiable');
CREATE TYPE role_type AS ENUM ('frontend', 'backend', 'fullstack', 'devops', 'ui');
CREATE TYPE interview_type AS ENUM ('technical', 'behavioral', 'system_design');
CREATE TYPE interview_status AS ENUM ('scheduled', 'completed', 'cancelled', 'pending');
CREATE TYPE feedback_type AS ENUM ('positive', 'negative', 'neutral');
CREATE TYPE question_category AS ENUM ('technical', 'behavioral', 'system_design', 'general');
CREATE TYPE submission_status AS ENUM ('draft', 'submitted', 'in_review', 'accepted', 'rejected');

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    age INTEGER CHECK (age >= 18 AND age <= 100),
    gender gender_type NOT NULL,
    experience INTEGER CHECK (experience >= 0),
    skills TEXT[],
    preferred_role role_type,
    availability availability_type,
    additional_info TEXT,
    is_staff BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create form submissions table to track form progress
CREATE TABLE form_submissions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    form_data JSONB NOT NULL,
    status submission_status DEFAULT 'draft',
    submitted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create interviews table
CREATE TABLE interviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    form_submission_id INTEGER REFERENCES form_submissions(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date TIMESTAMP NOT NULL,
    duration INTEGER NOT NULL,
    type interview_type NOT NULL,
    status interview_status DEFAULT 'scheduled',
    feedback TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    video_url TEXT,
    audio_url TEXT,
    recording_duration INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create question bank table
CREATE TABLE question_bank (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    category question_category NOT NULL,
    difficulty INTEGER CHECK (difficulty >= 1 AND difficulty <= 5),
    sample_answer TEXT,
    keywords TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create interview feedback table
CREATE TABLE interview_feedback (
    id SERIAL PRIMARY KEY,
    interview_id INTEGER REFERENCES interviews(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    feedback_type feedback_type NOT NULL,
    feedback_text TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create performance analytics table
CREATE TABLE performance_analytics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    interview_id INTEGER REFERENCES interviews(id) ON DELETE CASCADE,
    speaking_time INTEGER,
    confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
    keywords_used TEXT[],
    sentiment_score FLOAT CHECK (sentiment_score >= -1 AND sentiment_score <= 1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create chat history table
CREATE TABLE chat_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    interview_id INTEGER REFERENCES interviews(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
    sentiment FLOAT CHECK (sentiment >= -1 AND sentiment <= 1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_preferred_role ON users(preferred_role);
CREATE INDEX idx_form_submissions_user_id ON form_submissions(user_id);
CREATE INDEX idx_form_submissions_status ON form_submissions(status);
CREATE INDEX idx_interviews_user_id ON interviews(user_id);
CREATE INDEX idx_interviews_date ON interviews(date);
CREATE INDEX idx_interviews_type ON interviews(type);
CREATE INDEX idx_interviews_status ON interviews(status);
CREATE INDEX idx_question_bank_category ON question_bank(category);
CREATE INDEX idx_question_bank_difficulty ON question_bank(difficulty);
CREATE INDEX idx_interview_feedback_interview_id ON interview_feedback(interview_id);
CREATE INDEX idx_performance_analytics_user_id ON performance_analytics(user_id);
CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX idx_chat_history_interview_id ON chat_history(interview_id);
CREATE INDEX idx_chat_history_created_at ON chat_history(created_at);

-- Create function to convert skills string to array
CREATE OR REPLACE FUNCTION skills_to_array(skills_text TEXT)
RETURNS TEXT[] AS $$
BEGIN
    RETURN string_to_array(trim(both ' ' from skills_text), ',');
END;
$$ LANGUAGE plpgsql;

-- Insert a test admin user (password: admin123)
INSERT INTO users (
    name, 
    surname, 
    email, 
    password, 
    gender,
    age,
    experience,
    skills,
    preferred_role,
    availability,
    is_staff
) VALUES (
    'Admin', 
    'User', 
    'admin@interviewiq.com', 
    '$2a$10$X7z3DBkKv1VHh7U0RZzQOeJY9VY9VY9VY9VY9VY9VY9VY9VY9VY9VY',
    'male',
    30,
    5,
    ARRAY['admin', 'management', 'leadership'],
    'fullstack',
    'immediate',
    TRUE
);

-- Insert sample questions
INSERT INTO question_bank (question, category, difficulty, sample_answer, keywords) VALUES
('Tell us about yourself?', 'general', 1, 'I am a passionate developer with 3 years of experience...', ARRAY['introduction', 'background', 'experience']),
('Why do you think you are good at sales?', 'behavioral', 2, 'I have consistently exceeded sales targets...', ARRAY['sales', 'achievements', 'skills']),
('What is the biggest deal you have closed?', 'behavioral', 3, 'I closed a $1M deal with a major client...', ARRAY['achievements', 'sales', 'experience']),
('Why you choose this company?', 'behavioral', 2, 'I admire the company''s innovative approach...', ARRAY['motivation', 'company', 'culture']),
('What your expectation in this company?', 'behavioral', 2, 'I expect to grow professionally and contribute...', ARRAY['expectations', 'growth', 'contribution']),
('Do you have any questions to our company?', 'general', 1, 'I would like to know more about the team structure...', ARRAY['questions', 'company', 'culture']); 