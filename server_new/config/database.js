require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'interview_system',
    host: 'localhost',
    port: 1234,
    dialect: 'postgres',
    logging: console.log
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'interview_system_test',
    host: 'localhost',
    port: 1234,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: 'postgres',
    password: 'postgres',
    database: 'interview_system',
    host: 'localhost',
    port: 1234,
    dialect: 'postgres',
    logging: false
  }
}; 