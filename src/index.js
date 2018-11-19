const express = require('express')
const { getGameByKey } = require('./db.js')

console.log('Loaded app');

const app = express()

app.get('/', (req, res) => {
  res.set(200).send('Hello, World!')
})

app.get('/key/:keyId', (req, res) => {
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

app.listen(8080)
