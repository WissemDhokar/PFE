const { Model, DataTypes } = require('sequelize');

class FormSubmission extends Model {
  static init(sequelize) {
    super.init({
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
        type: 'submission_status',
        defaultValue: 'draft'
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
      underscored: true
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.hasMany(models.Interview, { foreignKey: 'form_submission_id', as: 'interviews' });
  }
}

module.exports = FormSubmission; 