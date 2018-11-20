import 'dotenv/config'
import express from 'express'
import { getGameByKey, getGames } from './db.js'

console.log('Loaded app')

const app = express()

app.param('keyId', (req, res, next, id) => {
  getGameByKey(id, (err, game) => {
    if (err) {return res.set(404).send(err)}

    req.game = game
    next()
  })
})

app.get('/keys', (req, res) => {
  getGames(null, (err, games) => {
    if (err) {return res.set(500).send(err)}

    res.set(200).send(games)
  })
})

app.get('/keys/:keyId', (req, res) => {
  res.set(200).send(req.game)
})

app.get('*', (req, res) => {
  res.set(404).send()
})

app.listen(process.env.PORT || 8080)
