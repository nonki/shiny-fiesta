import 'dotenv/config'
const express = require('express')
const { getGameByKey, getGames } = require('./db.js')

console.log('Loaded app');

const app = express()

app.get('/', (req, res) => {
  res.set(200).send({
    '/keys': {
      type: 'collection',
      children: {
        '/keys/:keyId': {
          type: 'singular',
        }
      }
    }
  })
})

app.get('/keys', (req, res) => {
  getGames(null, (err, games) => {
    if (err)
      return res.set(500).send(err)

    res.set(200).send(games)
  })
})

app.get('/keys/:keyId', (req, res) => {
  res.set(200).send(req.game)
})

app.param('keyId', (req, res, next, id) => {
  getGameByKey(id, (err, game) => {
    if (err)
      return res.set(404).send(err)

    req.game = game;
    next();
  });
})

app.listen(process.env.PORT || 8080)
