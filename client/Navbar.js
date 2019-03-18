import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ location: { pathname } }) => {
  console.log(pathname);
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
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
