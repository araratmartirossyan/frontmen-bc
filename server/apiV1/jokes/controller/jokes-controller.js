'use strict';

const axios = require('axios');
const Op = require('Sequelize').Op;
const models = require('../../../../database/models');
const Favorites = models.Favorites;

module.exports = {
  getJokes: () => {
    return new Promise((resolve, reject) => {
      axios.get('http://api.icndb.com/jokes/random/10')
        .then(resolve)
        .catch(reject)
    });
  },
  putFavorite: (joke, jokeId) => {
    return new Promise((resolve, reject) => {
      const data = { joke, jokeId };
      Favorites.find({
        where: {
          jokeId
        }
      }).then(findedData => {
        if (findedData === null) {
          new Favorites(data).save()
            .then(resolve)
            .catch(reject);
        } else {
          Favorites.destroy({
            where: {
              jokeId
            }
          }).then(resolve)
          .catch(reject);
        }
      })
     
    });
  },
  getFavorite: () => {
    return new Promise((resolve, reject) => {
      Favorites.findAll()
        .then(resolve)
        .catch(reject);
    });
  }
}