const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class FormSubmission extends Model {
    static associate(models) {
      FormSubmission.belongsTo(models.User, { foreignKey: 'user_id' });
      FormSubmission.hasMany(models.Interview, { foreignKey: 'form_submission_id' });
    }
  }

  FormSubmission.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    form_data: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'draft',
      validate: {
        isIn: [['draft', 'submitted', 'in_review', 'accepted', 'rejected']]
      }
    },
    submitted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'FormSubmission',
    tableName: 'form_submissions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return FormSubmission;
}; 