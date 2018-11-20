import 'dotenv/config'
import express from 'express'
import { getGameByKey, getGames } from './db.js'

console.log('Loaded app')

const app = express()
app.use(express.json())

app.param('keyId', (req, res, next, id) => {
  getGameByKey(id, (err, game) => {
    if (err) {return res.set(404).send(err)}

    req.game = game
    next()
  })
})

app.post('/auth', (req, res) => {
  if (!req.body.password)
    return res.set(400).send('HTTP 400 - Bad Request')

  const password = req.body.password.toLowerCase()
  if (process.env.PASSWORD != password)
    return res.set(401).send('HTTP 401 - Unauthorized')

  res.set(200).send('HTTP 200 - OK')
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
  res.set(404).send('HTTP 404 - Not Found')
})

app.listen(process.env.PORT || 8080)
