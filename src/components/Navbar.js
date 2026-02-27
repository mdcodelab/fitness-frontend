import React from 'react';
import { Link } from 'react-router-dom';
import "./nav.css";

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <h2>Pulse</h2>
      </div>

      <div className="buttons">
        <Link className="btn" to="/login">Login</Link>
        <Link className="btn" to="/register">Register</Link>
      </div>
    </nav>
  )
}

export default Navbar
