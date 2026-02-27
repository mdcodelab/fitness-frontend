import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";

function Login() {
  return (
    <section className="login">
      <h1>Welcome back!</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" placeholder="Enter your password" required />
        </div>

        <button type="submit" className="btn">Login</button>
        <p className="comment">
          Don't have an account? <Link to="/register" className="comment">
          Register here.</Link>
        </p>
      </form>
    </section>
  );
}

export default Login