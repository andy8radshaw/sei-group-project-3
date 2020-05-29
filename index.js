const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { dbURI, port } = require('./config/environment')
const bodyParser = require('body-parser')
const errorHandler = require('./lib/errorHandler')
const router = require('./config/routes')
const logger = require('./lib/logger')


mongoose.connect(dbURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo is Connected!')
  })


app.use(express.static(`${__dirname}/frontend/build`))

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router)

app.use('/*', (req, res) => res.sendFile(`${__dirname}/frontend/build/index.html`))

app.use(errorHandler)


app.listen(port, () => console.log(`Express is listening on port ${port}`))