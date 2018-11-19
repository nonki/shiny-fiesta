const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.set(200).send('Hello, World!')
})

app.get('/key/:keyId', (req, res) => {
  const keyId = req.params.keyId
  res.set(200).send(keyId)
})

app.listen(8080)
