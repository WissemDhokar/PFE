const { Sequelize } = require('sequelize');
const User = require('./user');
const Interview = require('./interview');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 1234,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'interview_system',
  logging: false
});

// Initialize models
User.init(sequelize);
Interview.init(sequelize);

// Set up associations
User.associate({ Interview });
Interview.associate({ User });

module.exports = {
  sequelize,
  User,
  Interview
}; 