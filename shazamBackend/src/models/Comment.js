const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Comment extends Model {}

Comment.init({
  texte: DataTypes.TEXT,
  id_user: DataTypes.INTEGER,
  id_vin: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'comment',
  tableName: 'comment',
  timestamps: true
});

Comment.associate = function(models) {
  Comment.belongsTo(models.Wine, { foreignKey: 'id_vin', as: 'wine' });
  Comment.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
};

module.exports = Comment;
