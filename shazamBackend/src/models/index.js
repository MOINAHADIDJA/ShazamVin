// const sequelize = require('../config/database');

// const user = require('./user');
// const wine = require('./wine');
// const comment = require('./comment');
// const note = require('./note');

// module.exports = {
//   sequelize,
//   user,
//   wine,
//   comment,
//   note,
  
  
// };
// index.js
const sequelize = require('../config/database');
const Sequelize = require('sequelize');


const User = require('./User');
const Wine = require('./Wine');
const Comment = require('./Comment');
const Note = require('./Note');


// Associations
Wine.hasMany(Comment, { foreignKey: 'id_vin', as: 'comments' });
Comment.belongsTo(Wine, { foreignKey: 'id_vin', as: 'wine' });

Wine.hasMany(Note, { foreignKey: 'id_vin', as: 'notes' });
Note.belongsTo(Wine, { foreignKey: 'id_vin', as: 'wine' });

User.hasMany(Comment, { foreignKey: 'id_user', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

User.hasMany(Note, { foreignKey: 'id_user', as: 'notes' });
Note.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

module.exports = {
  sequelize,
  User,
  Wine,
  Comment,
  Note
};
