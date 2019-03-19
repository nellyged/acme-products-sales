const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
});

const Product = conn.define(
  'product',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      isEmpty: false,
      unique: true,
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    discount: {
      type: Sequelize.DECIMAL,
      allowNull: true,
    },
    discountPer: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },

    availability: {
      type: Sequelize.STRING,
      allowNull: false,
      isEmpty: false,
    },
  },
  {
    hooks: {
      beforeValidate: product => {
        if (product.discount === '') {
          product.discount = null;
        }
      },
    },
  }
);

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(() => {
    Promise.all([
      Product.create({
        name: 'Foo',
        price: 3,
        discount: 2.4000000000000004,
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
