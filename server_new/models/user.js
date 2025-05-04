const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Interview, { foreignKey: 'user_id' });
      User.hasMany(models.FormSubmission, { foreignKey: 'user_id' });
    }

    async comparePassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 18,
        max: 100
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['male', 'female', 'other']]
      }
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    preferred_role: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['frontend', 'backend', 'fullstack', 'devops', 'ui']]
      }
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['immediate', '2weeks', '1month', 'negotiable']]
      }
    },
    additional_info: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_staff: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  });

  return User;
}; 