import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ location: { pathname }, counts }) => {
  const links = [
    {
      title: 'Home',
      path: '/home',
    },
    {
      title: 'Products',
      path: '/products',
    },
    {
      title: 'Sales',
      path: '/sales',
    },
    {
      title: 'Create',
      path: '/create',
    },
  ];
  return (
    <ul className="nav nav-tabs">
      {links.map(link => (
        <li key={link.path} className="nav-item">
          <Link
            to={link.path}
            className={`nav-link${link.path === pathname ? ' active' : ''}`}
          >
            {link.title}
            {link.path === '/products' || link.path === '/sales' ? (
              <span
                className="badge badge-primary"
                style={{ marginLeft: '10px' }}
              >
                {counts[link.path]}
              </span>
            ) : (
              ''
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
