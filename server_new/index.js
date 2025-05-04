require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, User, Interview, FormSubmission } = require('./models');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Test database connection
const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    // Test if tables exist
    const tables = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log('Existing tables:', tables[0].map(t => t.table_name));
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('All models synchronized');
  } catch (error) {
    console.error('Database connection error:', error);
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/interviews', require('./routes/interviews'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
