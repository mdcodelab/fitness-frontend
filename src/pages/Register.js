import React from 'react';
import { Link } from 'react-router-dom';
import "./Register.css";

function Register() {
  return (
    <section className="register">
      <h1>Create an account</h1>
      <form>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input id="firstName" type="text" placeholder="Enter your first name" />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input id="lastName" type="text" placeholder="Enter your last name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Enter your password" required />
        </div>

        <button type="submit" className="btn" style={{marginTop: "1rem"}}>Register</button>
        <p className="comment">
          Already have an account? <Link to="/login" className="comment">Login here</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;