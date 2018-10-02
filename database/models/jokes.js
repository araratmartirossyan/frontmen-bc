'use strict';
module.exports = (sequelize, DataTypes) => {
  var Jokes = sequelize.define('Jokes', {
    jokeId: DataTypes.STRING,
    favorite: DataTypes.STRING
  }, {});

  return Jokes;
};