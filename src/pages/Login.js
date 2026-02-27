import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {
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
      const payload = { email, password };
      const response = await axios.post(
        "http://localhost:4000/api-gateway/login",
        payload,
        { withCredentials: true } // pentru cookie HttpOnly
      );

      console.log("Login successful:", response.data);

      // dacă login-ul e ok, navigăm către dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login">
      <h1>Welcome back!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn" style={{ marginTop: "1rem" }} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="comment">
          Don't have an account? <Link to="/register" className="comment">Register here.</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;