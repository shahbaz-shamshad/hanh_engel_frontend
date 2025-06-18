import React from 'react';
import '../css/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/assets/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="nav-links">
        <a href="#" className="nav-link">Über Uns</a>
        <a href="#" className="nav-link">Testimonials</a>
        <a href="#" className="nav-link">Wie funktioniert es?</a>
        <a href="#" className="nav-link">Beispiele</a>
        <a href="#" className="nav-link">Pricing</a>
      </div>
    </nav>
  );
};

export default Navbar;