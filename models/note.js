'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.Category, {foreignKey: 'categoryId'})
  };
  return Note;
};