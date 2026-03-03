import React from "react";
import "./ActivityCard.css";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";

function ActivityCard({ activity, userActivities, setUserActivities }) {
  const deleteActivity = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (!confirmed) return;

    try {
      // Aici folosim endpoint corect și portul backend-ului
      await axios.delete(
        `http://localhost:4000/api-gateway/delete-activity/${id}`,
        { withCredentials: true } // dacă folosești JWT cookie
      );

      // Filtrăm activitatea ștearsă din state
      const remainingActivities = userActivities.filter(
        (act) => act.id !== id
      );
      setUserActivities(remainingActivities);

      alert("Activity deleted successfully!");
    } catch (error) {
      console.error("Delete activity error:", error.response?.data || error);
      alert("Failed to delete activity.");
    }
  };

  return (
    <div className="activity-card">
      <h3>{activity.type?.name.replace("_", " ") || "Unknown Activity"}</h3>
      <p>Duration: {activity.duration ?? 0} mins</p>
      <p>Calories Burned: {activity.calories ?? 0}</p>
      <p>
        Date:{" "}
        {activity.date
          ? new Date(activity.date).toLocaleDateString()
          : "N/A"}
      </p>
      <FaRegTrashAlt
        className="icon"
        onClick={() => deleteActivity(activity.id)}
      />
    </div>
  );
}

export default ActivityCard;