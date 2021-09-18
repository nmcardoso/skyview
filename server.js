const express = require('express')
const app = express()

app.get('/', function (req, res) {
  const ra = req.query.ra
  const dec = req.query.dec
  console.log('RA:', ra, '\tDEC:', dec)
  res.sendStatus(404)
})

app.listen(3000)
