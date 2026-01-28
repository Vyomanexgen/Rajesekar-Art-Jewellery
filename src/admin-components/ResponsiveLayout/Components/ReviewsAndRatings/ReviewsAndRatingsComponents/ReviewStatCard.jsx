import React from "react";
import "./ReviewsAndRatingsComponents.css";

const ReviewStatCard = ({ label, value, valueColor, icon }) => {
  return (
    <div className="review-stat-card">
      <p className="review-stat-label">{label}</p>

      <div className="review-stat-value-wrapper">
        {icon && <span className="review-stat-icon">{icon}</span>}
        <p
          className="review-stat-value"
          style={{ color: valueColor || "#000" }}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default ReviewStatCard;
