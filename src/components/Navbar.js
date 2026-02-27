import React from 'react';
import "./nav.css";

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <h2>Pulse</h2>
      </div>

      <div className="buttons">
        <button className="btn">Login</button>
        <button className="btn">Register</button>
      </div>
    </nav>
  )
}

export default Navbar
