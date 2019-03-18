import React from 'react';

const Products = ({ products }) => {
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
          <span className="badge badge-success" style={{ marginBottom: '5px' }}>
            {product.availability}
          </span>
          <br />
          <button className="btn btn-danger btn-sm">Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Products;
