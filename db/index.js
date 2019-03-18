const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
});

const Product = conn.define('product', {
  name: Sequelize.STRING,
  price: Sequelize.INTEGER,
  discount: Sequelize.FLOAT,
  availability: Sequelize.STRING,
});

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(() => {
    Promise.all([
      Product.create({
        name: 'Foo',
        price: 3,
        discount: 2.4,
        availability: 'instock',
      }),
      Product.create({
        name: 'Bar',
        price: 8,
        availability: 'instock',
      }),
      Product.create({
        name: 'Baz',
        price: 4,
        availability: 'backordered',
      }),
    ]);
  });
};

module.exports = {
  syncAndSeed,
  Product,
};
