const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Note extends Model {}

Note.init({
  valeur: DataTypes.STRING,
  id_user: DataTypes.INTEGER,
  id_vin: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'note',
  tableName: 'note',
  timestamps: true
});

Note.associate = function(models) {
  Note.belongsTo(models.Wine, { foreignKey: 'id_vin', as: 'wine' });
  Note.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
};

module.exports = Note;
