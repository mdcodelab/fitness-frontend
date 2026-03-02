import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import ActivityCard from "../components/ActivityCard";
import "./PastActivities.css";

function PastActivities() {
  const { user, handleLogout } = useUser();
  const navigate = useNavigate();

  // Activities state
  const [userActivities, setUserActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [activitiesError, setActivitiesError] = useState("");

  // Recommendations state
  const [reco, setReco] = useState([]);
  const [recoLoading, setRecoLoading] = useState(true);
  const [recoError, setRecoError] = useState("");

  /* =========================
     FETCH ACTIVITIES
  ========================== */
  useEffect(() => {
    if (!user) return;

    const fetchActivities = async () => {
      try {
        setActivitiesLoading(true);

        const res = await axios.get(
          "http://localhost:4000/api-gateway/user-activities",
          { withCredentials: true }
        );

        setUserActivities(res.data);
      } catch (err) {
        console.error(
          "Fetch activities error:",
          err.response?.data || err
        );
        setActivitiesError("Failed to load your activities");
      } finally {
        setActivitiesLoading(false);
      }
    };

    fetchActivities();
  }, [user]);

  /* =========================
     FETCH RECOMMENDATIONS
  ========================== */
  useEffect(() => {
    if (!user) return;

    const fetchReco = async () => {
      try {
        setRecoLoading(true);

        const result = await axios.get(
          "http://localhost:4000/api-gateway/recom",
          { withCredentials: true }
        );

        setReco(result.data);
      } catch (error) {
        console.error(
          "Fetch reco error:",
          error.response?.data || error
        );
        setRecoError("Failed to load recommendations");
      } finally {
        setRecoLoading(false);
      }
    };

    fetchReco();
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

      {/* ================= ACTIVITIES ================= */}
      <div className="past-activities-container">
        <h2>Your Past Activities</h2>

        {activitiesError && (
          <p className="error-message">{activitiesError}</p>
        )}

        {activitiesLoading ? (
          <p>Loading...</p>
        ) : userActivities.length > 0 ? (
          <div className="past-activities-grid">
            {userActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "red" }}>
            No activities found yet.
          </p>
        )}
      </div>

      {/* ================= RECOMMENDATIONS ================= */}
      <div className="past-reco-section">
        <h2>Your Recommendations</h2>

        <div className="past-reco-container">
          {recoError && (
            <p className="error-message">{recoError}</p>
          )}

          {recoLoading ? (
            <p>Loading...</p>
          ) : reco.length > 0 ? (
            reco.map((rec) => (
              <div className="reco" key={rec.id}>
                <div>{rec.notes}</div>
                <p>
                  {rec.recommendedAt
                    ? new Date(rec.recommendedAt).toLocaleDateString()
                    : ""}
                </p>
                <FaRegTrashAlt className="icon" />
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "red" }}>
              No recommendations yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default PastActivities;