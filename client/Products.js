import React from 'react';

const Products = ({ products, destroyProd }) => {
  return (
    <ul className="list-group">
      {products.map(product => (
        <li className="list-group-item" key={product.id}>
          {product.name}
          <br />
          <span
            style={product.discount ? { textDecoration: 'line-through' } : {}}
          >
            ${product.price}
            <br />
          </span>
          <div style={{ marginBottom: '5px' }}>
            {product.discount ? (
              <span className="badge badge-success">${product.discount}</span>
            ) : (
              ''
            )}
          </div>
          <span
            className={
              product.availability === 'instock'
                ? 'badge badge-success'
                : 'badge badge-warning'
            }
            style={{ marginBottom: '5px' }}
          >
            {product.availability}
          </span>
          <br />
          <button
            className="btn btn-danger btn-sm"
            onClick={() => destroyProd(product.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Products;
