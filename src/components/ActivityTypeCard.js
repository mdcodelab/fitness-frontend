import React from "react";
import "./ActivityTypeCard.css";
import { FaRegSmile } from "react-icons/fa";

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

      <p className="activity-type-cta">Choos me and let's go! <FaRegSmile style={{fontSize: "1.2rem"}} /></p>
    </div>
  );
}

export default ActivityTypeCard;