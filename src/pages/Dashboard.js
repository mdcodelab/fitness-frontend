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

  //all activities
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

  //choose activity to add
  const handleAddActivity = async (activity) => {
  try {
    await axios.post(
      "http://localhost:4000/api-gateway/activities",
      {
        typeId: activity.id,   // enum din seed: RUNNING, YOGA etc.
        duration: 30,
        calories: 200,
        date: new Date()
      },
      { withCredentials: true }
    );

    // re-fetch user activities
    const userRes = await axios.get(
      "http://localhost:4000/api-gateway/user-activities",
      { withCredentials: true }
    );

    setUserActivities(userRes.data);

  } catch (err) {
    console.error("Add activity error:", err.response?.data || err);
  }
};

console.log(userActivities);

//logout
const logout = ()=> {
  handleLogout();
  navigate("/");
}


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
          <button className="btn" onClick={logout}>
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
          <div className="available-activities">
            <h2>Available Activities</h2>
            <p>Choose an activity to get started.</p>
            <div className="activity-grid">
                  {availableActivities.map((act) => (
                     <div key={act.id} onClick={() => handleAddActivity(act)}>
                      <ActivityTypeCard activity={act} />
                   </div>
                  ))}
              </div>
          </div>

          <div className="user-activities">
            <h2>Your Activities for today</h2>
            <p>Choose an activity and see AI recommendations.</p>
            <div className="user-activity-grid">
                  {userActivities.length === 0 ? (
                    <p style={{ textAlign: "center", marginTop: "10rem",
                     fontSize: "0.8rem", color: "var(--red-color)" }}>
                     No activities added yet. Click on an activity above to add one!</p>
                  ) : (
                    userActivities.map((act) => (
                      <ActivityCard key={act.id} activity={act} />
                    ))
                  )}
            </div>
          </div>
        </div>
        </>
      )}
    </section>
  );
}

export default Dashboard;