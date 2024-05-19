require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const allRoutes = require('./routes/allRoutes')
const cors = require('cors')
const bodyParser = require('body-parser');

// Create an Express Application
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// Install Various Middleware
app.use(express.static('public'))
app.use(cors())
app.use(express.json())

app.set('view engine', 'ejs')

// Route the API Endpoints
app.use('', allRoutes)

// Connect to MongoDB Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Start Listening to Requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  }) 