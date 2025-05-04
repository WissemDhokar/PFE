const { Sequelize } = require('sequelize');
const userModel = require('./user');
const interviewModel = require('./interview');
const formSubmissionModel = require('./formSubmission');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 1234,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'interview_system',
  logging: false
});

const models = {
  User: userModel(sequelize),
  Interview: interviewModel(sequelize),
  FormSubmission: formSubmissionModel(sequelize)
};

// Set up associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
}; 