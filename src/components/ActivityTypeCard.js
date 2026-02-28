import React from "react";
import "./ActivityTypeCard.css";

function ActivityTypeCard({ activity }) {
  return (
    <div className="activity-card">
      <div className="activity-header">
        <h3>{activity.name}</h3>
        <span className="activity-type">{activity.type}</span>
      </div>

      <div className="activity-body">
        <p><strong>Duration:</strong> {activity.duration} min</p>
        <p><strong>Calories:</strong> {activity.calories} kcal</p>
        <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
      </div>

      <div className="activity-footer">
        <button className="btn-view">View</button>
        <button className="btn-delete">Delete</button>
      </div>
    </div>
  );
}

export default ActivityTypeCard;