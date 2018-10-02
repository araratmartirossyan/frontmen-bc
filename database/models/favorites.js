'use strict';
module.exports = (sequelize, DataTypes) => {
  var Favorites = sequelize.define('Favorites', {
    joke: DataTypes.STRING,
    jokeId: DataTypes.STRING,
    isFavorite: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Favorites;
};