const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Interview extends Model {
    static associate(models) {
      Interview.belongsTo(models.User, { foreignKey: 'user_id' });
      Interview.belongsTo(models.FormSubmission, { foreignKey: 'form_submission_id' });
    }
  }

  Interview.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    form_submission_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'form_submissions',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['technical', 'behavioral', 'system_design']]
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'scheduled',
      validate: {
        isIn: [['scheduled', 'completed', 'cancelled', 'pending']]
      }
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      }
    },
    video_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    audio_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    recording_duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Interview',
    tableName: 'interviews',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Interview;
}; 