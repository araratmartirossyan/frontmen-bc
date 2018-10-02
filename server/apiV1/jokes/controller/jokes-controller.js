'use strict';

const axios = require('axios');
const Op = require('Sequelize').Op;
const models = require('../../../../database/models');
const Favorites = models.Favorites;

module.exports = {
  getJokes: () => {
    return new Promise((resolve, reject) => {
      axios.get('http://api.icndb.com/jokes/random/10')
        .then(data => {
          Favorites.find({
            where: {
              jokeId: '1'
            }
          })
          resolve(data)
        })
        .catch(reject)
    });
  },
  putFavorite: (joke, jokeId) => {
    return new Promise((resolve, reject) => {
      const data = { joke, jokeId, isFavorite: true };
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
  getFavorite: (page = 1, limit = 10) => {
    return new Promise((resolve, reject) => {
      Favorites.findAndCountAll()
        .then(({ count }) => {
          const pages = Math.ceil(count / limit)
          const offset = limit * (page - 1)
          Favorites.findAll({
            limit,
            offset
          }).then(favorites =>
            resolve({ favorites, count, pages })
          )
        }).catch(reject)
    });
  }
}