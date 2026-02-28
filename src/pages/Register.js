import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css";
import axios from "axios";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // resetăm eroarea la fiecare submit

    try {
      const payload = { first_name: firstName, last_name: lastName, email, password };
      const response = await axios.post(
        "http://localhost:4000/api-gateway/register",
        payload,
        { withCredentials: true } // pentru cookie HttpOnly
      );

      console.log("Login successful:", response.data);

      // dacă login-ul e ok, navigăm către dashboard
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register">
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input id="firstName" type="text"
          placeholder="Enter your first name" 
          value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input id="lastName" type="text" value={lastName}
           onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email}
           onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password}
           onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password" required />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn" style={{marginTop: "1rem"}}>Register</button>
        <p className="comment">
          Already have an account? <Link to="/login" className="comment">Login here</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;