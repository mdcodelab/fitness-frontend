import React from "react";
import "./ActivityCard.css";

function ActivityCard({ activity }) {
  return (
    <div className="activity-card">
      <h3>{activity.name}</h3>
      <p>Type: {activity.type}</p>
      <p>Duration: {activity.duration} mins</p>
      <p>Calories Burned: {activity.caloriesBurned}</p>
    </div>
  );
}

export default ActivityCard;