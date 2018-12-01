import 'dotenv/config'
import express from 'express'
import { getGameByKey, getGames } from './db.js'
import cors from 'cors';

const app = express()
app.use(express.json())
app.use(cors());

app.param('keyId', (req, res, next, id) => {
  if (!req.query.secret || process.env.SECRET != req.query.secret) {
    res.status(401).send();
  }

  getGameByKey(id, (err, game) => {
    if (err) {return res.status(404).send(err)}

    req.game = game
    next()
  })
})

app.get('/hongji', (req, res) => {
  return res.status(200).send({text: "Wassup dog"})
})

app.post('/auth', (req, res) => {
  if (!req.body.password) {
    return res.status(400).send('HTTP 400 - Bad Request')
  }

  const password = req.body.password.toLowerCase()
  if (process.env.PASSWORD != password) {
    return res.status(401).send('HTTP 401 - Unauthorized')
  }

  res.status(200).send({ secret: process.env.SECRET})
})

app.get('/keys', (req, res) => {
  getGames((err, games) => {
    if (err) {return res.status(500).send(err)}

    res.status(200).send(games)
  })
})

app.get('/keys/:keyId', (req, res) => {
  res.status(200).send(req.game)
})

app.get('*', (req, res) => {
  res.status(404).send('HTTP 404 - Not Found')
})

app.listen(process.env.PORT || 8080)
