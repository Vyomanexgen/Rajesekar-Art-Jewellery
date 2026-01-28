import React from "react";
import "./CampaignCard.css";

const CampaignCard = () => {
  return (
    <div className="campaign-card">
      {/* Image Section */}
      <div className="banner">
        <span className="status-tag">Active</span>
      </div>

      {/* Content Section */}
      <div className="content">
        <h2 className="title">Diwali Dhamaka 2024</h2>
        <p className="subtitle">
          Grand Diwali sale with up to 40% off on all jewellery
        </p>

        {/* Meta Info */}
        <div className="meta">
          <span>
            <i className="fa-regular fa-calendar"></i> 2024-10-20
          </span>
          <span>
            <i className="fa-regular fa-calendar"></i> 2024-11-05
          </span>
          <span>
            <i className="fa-solid fa-users"></i> All Customers
          </span>
          <span>
            <i className="fa-solid fa-bullseye"></i> Reach: 50K
          </span>
        </div>

        {/* Stats Grid */}
        <div className="stats">
          <div>
            <p className="label">Views</p>
            <p className="value">34.6K</p>
          </div>
          <div>
            <p className="label">Conv.</p>
            <p className="value success">1234</p>
          </div>
          <div>
            <p className="label">CVR</p>
            <p className="value">3.57%</p>
          </div>
          <div>
            <p className="label">ROI</p>
            <p className="value success">11308.3%</p>
          </div>
        </div>

        {/* Budget */}
        <div className="budget">
          <p>Budget Utilization</p>
          <div className="slider">
            <div className="progress"></div>
          </div>
          <div className="budget-row">
            <span>₹32,450 / ₹50,000</span>
            <span>65%</span>
          </div>
        </div>

        {/* Actions */}
        <div className="actions">
          <button className="edit-btn">
            <i className="fa-solid fa-pen"></i> Edit
          </button>
          <button className="delete-btn">
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
