const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const { Product } = require('./db');

//logging for api calls
app.use(morgan('dev'));

//Boddy parsing for form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//GET /api/products get all the products
app.get('/api/', (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.send(products);
    })
    .catch(next);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

module.exports = app;
