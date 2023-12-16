const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Wine extends Model {}

Wine.init({
    nomProducteur: DataTypes.STRING,
    regionOrigine: DataTypes.STRING,
    couleur: DataTypes.STRING,
    chateau: DataTypes.STRING,
    prix: DataTypes.FLOAT,
    cepages: DataTypes.STRING,
    millesime: DataTypes.INTEGER,
    pourcentageAlcool: DataTypes.FLOAT,
    volumeBouteille: DataTypes.FLOAT,
    notesDegustation: DataTypes.TEXT,
    presenceSulfites: DataTypes.BOOLEAN,
    classificationQualite: DataTypes.STRING,
    conseilsConservation: DataTypes.TEXT,
    infoDistributeur: DataTypes.STRING,
    // appelation : DataTypes.STRING,
    image: DataTypes.STRING
}, {
    sequelize,
    modelName: 'wine',
    tableName: 'wine',
    timestamps: true
});

Wine.associate = function(models) {
    Wine.hasMany(models.Comment, {
        foreignKey: 'id_vin',
        as: 'comments',
        onDelete: 'CASCADE'
    });
    Wine.hasMany(models.Note, {
        foreignKey: 'id_vin',
        as: 'notes',
        onDelete: 'CASCADE'
    });
    Wine.belongsTo(models.User, { as: 'creatorId' });
};

module.exports = Wine;
