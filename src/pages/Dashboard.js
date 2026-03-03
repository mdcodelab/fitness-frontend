import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ActivityTypeCard from "../components/ActivityTypeCard";
import ActivityCard from "../components/ActivityCard";
import "./Dashboard.css";
import axios from "axios";
import { useUser } from "../context";

function Dashboard() {
  const [availableActivities, setAvailableActivities] = useState([]);
  const [userActivities, setUserActivities] = useState([]);

  const [availableLoading, setAvailableLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const[refresh, setRefresh] = useState(true);

  const [error, setError] = useState("");

  const { user, handleLogout } = useUser();
  const navigate = useNavigate();

  /* =========================
     FETCH AVAILABLE ACTIVITIES
  ========================== */
  useEffect(() => {
    setAvailableLoading(true);
    const fetchAvailable = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api-gateway/available-activities",
          { withCredentials: true }
        );

        setAvailableActivities(res.data);
        setAvailableLoading(false);
      } catch (err) {
        console.error("Fetch available error:", err.response?.data || err);
        setError("Failed to load available activities");
      } finally {
        setAvailableLoading(false);
      }
    };

    fetchAvailable();
  }, []);

  /* =========================
     FETCH USER ACTIVITIES
  /* =========================
  
     ADD ACTIVITY
  ========================== */
  useEffect(() => {
  if (!user) return;
  setUserLoading(true);

  const fetchUserActivities = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api-gateway/user-activities",
        { withCredentials: true }
      );

      console.log("Fetched user activities:", res.data);

      // sortăm descrescător după dată și luăm ultima
      if (res.data.length > 0) {
        const sorted = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setUserActivities([sorted[0]]); // doar ultima activitate
      } else {
        setUserActivities([]);
      }
    } catch (err) {
      console.error("Fetch user activities error:", err.response?.data || err);
      setError("Failed to load your activities");
    } finally {
      setUserLoading(false);
    }
  };

  fetchUserActivities();
}, [user, refresh]);


  const handleAddActivity = async (activity) => {
    try {
      const newActivity = await axios.post(
        "http://localhost:4000/api-gateway/activities",
        {
          typeId: activity.id,
          duration: 30,
          calories: 200,
          date: new Date(),
        },
        { withCredentials: true }
      );
      setRefresh(false);
    } catch (err) {
      console.error("Add activity error:", err.response?.data || err);
    }
  };

  console.log("UserActivities", userActivities.length);

  const logout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <section className="dashboard">
      <header>
        <div className="logo">
          <img src="/assets/logo.png" alt="Pulse Logo" />
          <h2>Pulse</h2>
        </div>

        <div className="buttons">
          <h2>Hello, {user}!</h2>
          <Link className="btn past-btn" to="/dashboard/past-activities">
            Past Activities
          </Link>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {error && <p className="error-message">{error}</p>}

      <div className="dashboard-main">
        {/* ================= AVAILABLE ACTIVITIES ================= */}
        <div className="available-activities">
          <h2>Available Activities</h2>
          <p>Choose an activity to get started.</p>

          {availableLoading ? (
            <p style={{ textAlign: "center", color: "var(--red-color)" }}>
              Loading activities...
            </p>
          ) : availableActivities.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--red-color)" }}>
              There are no available activities.
            </p>
          ) : (
            <div className="activity-grid">
              {availableActivities.map((act) => (
                <div key={act.id} onClick={() => handleAddActivity(act)}>
                  <ActivityTypeCard activity={act} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= USER ACTIVITIES ================= */}
        <div className="user-activities">
          <h2>Your Activities for Today</h2>
          <p>Choose an activity and see AI recommendations.</p>

          {userLoading ? (
            <p
              style={{
                textAlign: "center",
                marginTop: "4rem",
                color: "var(--red-color)",
              }}
            >
              Loading your activities...
            </p>
          ) : userActivities.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                marginTop: "4rem",
                fontSize: "0.9rem",
                color: "var(--red-color)",
              }}
            >
              There are no activities yet. Click above to add one!
            </p>
          ) : (
            <div className="user-activity-grid">
              {userActivities.map((act) => (
                <ActivityCard
                  key={act.id}
                  activity={act} userActivities={userActivities} setUserActivities={setUserActivities}
                  
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;