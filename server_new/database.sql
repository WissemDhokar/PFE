-- Drop the existing database if it exists
DROP DATABASE IF EXISTS interview_system;

-- Create the new database
CREATE DATABASE interview_system;

-- Connect to the new database
\c interview_system;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS interviews CASCADE;

-- Create users table (simplified)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create interviews table (simplified)
CREATE TABLE interviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_interviews_user_id ON interviews(user_id);

-- Insert admin test user
INSERT INTO users (
    name, surname, email, password
) VALUES (
    'Admin', 'User', 'admin@interviewiq.com', 
    '$2a$10$X7z3DBkKv1VHh7U0RZzQOeJY9VY9VY9VY9VY9VY9VY9VY9VY9VY'
);