'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('interviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      form_submission_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'form_submissions',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('technical', 'behavioral', 'system_design'),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('scheduled', 'completed', 'cancelled', 'pending'),
        defaultValue: 'scheduled'
      },
      feedback: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 5
        }
      },
      video_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      audio_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      recording_duration: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('interviews', ['user_id']);
    await queryInterface.addIndex('interviews', ['date']);
    await queryInterface.addIndex('interviews', ['type']);
    await queryInterface.addIndex('interviews', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('interviews');
  }
}; 