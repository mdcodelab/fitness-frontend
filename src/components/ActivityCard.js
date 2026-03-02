import React from "react";
import "./ActivityCard.css";
import { FaRegTrashAlt } from "react-icons/fa";

function ActivityCard({ activity }) {
  return (
    <div className="activity-card">
      <h3>{activity.type?.name.replace("_", " ") || "Unknown Activity"}</h3>
      <p>Duration: {activity.duration ?? 0} mins</p>
      <p>Calories Burned: {activity.calories ?? 0}</p>
      <p>Date: {activity.date ? new Date(activity.date).toLocaleDateString() : "N/A"}</p>
      <FaRegTrashAlt className="icon" />

    </div>
  );
}

export default ActivityCard;