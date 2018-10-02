'use strict';

const jokes = require('express').Router();
const logger = require('../../utils/logger');
const controller = require('./controller/jokes-controller');

jokes.get('/generateFavorite', (req, res) => {
  const count = Number(req.query.count)
  controller.generateFavorite(count)
    .then(data => {
      res.status( 200 ).send({ data });
	  }, err => {
      res.status( 400 ).send(err);
    })
});
jokes.get('/random', (req, res) => {
  const count = Number(req.query.count)
  controller.getJokes(count)
    .then(({ data: { value } }) => {
      res.status( 200 ).send({ value });
	  }, err => {
      res.status( 400 ).send(err);
    })
});
jokes.options('/')
jokes.post('/', (req, res, next) => {
  controller.putFavorite(req.body.joke, req.body.jokeId)
    .then(() => {
      res.status(200).send({
        success: true,
        title: 'Joke marked as favorite. Chuck started watching on you.'
      })
    }, err => {
      res.status(400).send({
        error: 'Something wrong'
      })
    })
})
jokes.options('/favorites')
jokes.get('/favorites', (req, res, next) => {
  const page = Number(req.query.page)
  const limit =  Number(req.query.limit)
  controller.getFavorite(page, limit)
    .then((data) => {
      res.status( 200 ).send({ data });
    }, err => {
      res.status( 400 ).send(err);
    })
})

module.exports = jokes;
