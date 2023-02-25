import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

function Header() {
  return (
    <header
      style={{
        backgroundColor: 'blue',
        height: '100px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <div className="container h-100">
        <Link to="/dashboard" className="h-100 d-flex align-items-center">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
