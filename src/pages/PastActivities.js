import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import ActivityCard from "../components/ActivityCard";
import "./PastActivities.css";

function PastActivities() {
  const { user, handleLogout } = useUser();
  const [userActivities, setUserActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:4000/api-gateway/user-activities",
          { withCredentials: true }
        );
        setUserActivities(res.data);
      } catch (err) {
        console.error("Fetch activities error:", err.response?.data || err);
        setError("Failed to load your activities");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [user]);

  const logout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <section className="past-activities">
      <header>
        <div className="logo">
          <img src="/assets/logo.png" alt="Pulse Logo" />
          <h2>Pulse</h2>
        </div>
        <div className="buttons">
          <h2>Hello, {user}!</h2>
          <Link className="btn past-btn" to="/dashboard">
            <FaArrowLeftLong /> Back
          </Link>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <div className="past-container">
        <h2>Your Past Activities</h2>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : userActivities.length > 0 ? (
          <div className="past-activities-grid">
            {userActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "red" }}>No activities found yet.</p>
        )}
      </div>
    </section>
  );
}

export default PastActivities;