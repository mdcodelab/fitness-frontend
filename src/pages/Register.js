import React from 'react';
import { Link } from 'react-router-dom';
import "./Register.css";

function Register() {
  return (
    <section className="register">
    <h1>Create an account</h1>
    <form>
        <input type="text" placeholder="First name"/>
        <input type="text" placeholder="Last name"/>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="btn">Register</button>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
    </form>

    </section>
  
  
  )
}

export default Register