import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityTypeCard from "../components/ActivityTypeCard";
import ActivityCard from "../components/ActivityCard";
import "./Dashboard.css";
import axios from "axios";
import { useUser } from "../context";
import { Link } from "react-router-dom";

function Dashboard() {
  const [availableActivities, setAvailableActivities] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const[firstName, setFirstName] = useState("");
  const { user, handleLogout } = useUser();
  console.log(user);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const availableRes = await axios.get(
          "http://localhost:4000/api-gateway/available-activities",
          { withCredentials: true }
        );
        setAvailableActivities(availableRes.data);

      } catch (err) {
        console.error("Fetch error:", err.response?.data || err);
        setError("Failed to load activities");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {


  }, []);


  return (
    <section className="dashboard">
      <header>
        <div className="logo">
          <img src="/assets/logo.png" alt="Pulse Logo"></img>
          <h2>Pulse</h2>
        </div>
        <div className="buttons">
          <h2>Hello, {user}!</h2>
          <Link className="btn past-btn" to="/dashboard/past-activities">Past Activities</Link>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        
        <>
          <div className="dashboard-main">
          <section className="available-activities">
            <h2>Available Activities</h2>
            <div className="activity-grid">
              {availableActivities.map((act) => (
                <ActivityTypeCard key={act.id} activity={act} />
              ))}
            </div>
          </section>

          <section className="user-activities">
            <h2>Your Activities</h2>
            <p>Choose an activity and see AI recommendations.</p>
            <div className="activity-grid">
              {userActivities.map((act) => (
                <ActivityCard key={act.id} activity={act} completed />
              ))}
            </div>
          </section>
        </div>
        </>
      )}
    </section>
  );
}

export default Dashboard;