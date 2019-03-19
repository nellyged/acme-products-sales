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
      unique: true,
      validate: {
        notEmpty: true,
      },
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
        if (product.discountPer) {
          product.discount =
            product.price - (product.price * product.discountPer) / 100;
        } else {
          product.discount = null;
          product.discountPer = null;
        }
        if (
          product.discountPer &&
          (product.discountPer >= 100 || product.discountPer <= 0)
        ) {
          throw new Error('Percentage cant be higher than 99 or lower than 1');
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
        discountPer: 60,
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
