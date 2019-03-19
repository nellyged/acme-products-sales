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

//Point traffic to the single html file
app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
);

//Bundle.js created by webpack will be found in public folder
app.use(express.static(path.join(__dirname, 'public')));

//GET /api/products get all the products
app.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.send(products);
    })
    .catch(next);
});

//POST /api/products create new product
app.post('/api/products', (req, res, next) => {
  Product.create(req.body)
    .then(prod => {
      res.send(prod);
    })
    .catch(next);
});

//DELETE /api/products remove a product
app.delete('/api/products/:id', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

module.exports = app;
