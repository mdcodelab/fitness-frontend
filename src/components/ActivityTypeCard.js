import React from "react";
import "./ActivityTypeCard.css";

function ActivityTypeCard({ activity }) {
  return (
    <div className="activity-type-card">
      <h1 className="activity-type-icon">
        {activity.icon}
      </h1>

      <h1 className="activity-type-name">
        {activity.name.replaceAll("_", " ")}
      </h1>

      <p className="activity-type-description">
        {activity.description}
      </p>
    </div>
  );
}

export default ActivityTypeCard;