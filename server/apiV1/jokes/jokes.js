'use strict';

const jokes = require('express').Router();
// const logger = require('../../utils/logger');
const controller = require('./controller/jokes-controller');

jokes.get('/random', (req, res) => {
  controller.getJokes()
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
jokes.get('/favorites', (req, res) => {
  controller.getFavorite()
    .then((data) => {
      console.log(data, 'important')
      res.status( 200 ).send({ data });
    }, err => {
      res.status( 400 ).send(err);
    })
})

module.exports = jokes;
