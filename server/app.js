if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config() 
}

const cors = require('cors')

const express = require("express");
const app = express();

app.use(cors())

const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router)

app.use(errorHandler)

module.exports = app
