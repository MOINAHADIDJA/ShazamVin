const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'users',
  timestamps: true
});

User.associate = function(models) {
  User.hasMany(models.Wine, { foreignKey: 'creatorId' });
  User.hasMany(models.Comment, { foreignKey: 'id_user' });
  User.hasMany(models.Note, { foreignKey: 'id_user' });
};

module.exports = User;
