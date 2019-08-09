const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () => {
    console.log("connected to db!");
  })


const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//Routes
app.use('/users', require('./routes/users'));

//Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on mode ${process.env.PORT} or at local ${port}`)
});