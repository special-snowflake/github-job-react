import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

function Header() {
  return (
    <header
      style={{
        backgroundColor: '#0d6efd',
        height: '80px',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        marginBottom: 80,
      }}
    >
      <div className="h-100 ps-3">
        <Link to="/dashboard" className="h-100 d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            style={{
              height: '35px',
            }}
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
