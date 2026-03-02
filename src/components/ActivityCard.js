import React from "react";
import "./ActivityCard.css"; // eventual pentru stil

function ActivityCard({ activity }) {
  return (
    <div className="activity-card">
      <h3>{activity.type?.name || "Unknown Activity"}</h3>
      <p>Duration: {activity.duration ?? 0} mins</p>
      <p>Calories Burned: {activity.calories ?? 0}</p>
      <p>Date: {activity.date ? new Date(activity.date).toLocaleDateString() : "N/A"}</p>
    </div>
  );
}

export default ActivityCard;