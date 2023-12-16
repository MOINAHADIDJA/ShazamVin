const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgresql://postgres:user@localhost:5432/shazam", {
  dialect: 'postgres', //  ligne pour spécifier le dialecte
  
});

module.exports = sequelize;