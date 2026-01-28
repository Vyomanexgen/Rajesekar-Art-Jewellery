import React from "react";
import "./PromotionsComponents.css";

const CampaignCard = ({ campaign, onDelete, onEdit }) => {
  // Calculate the budget percentage dynamically
  const budgetPercent = Math.round(
    (campaign.budget.used / campaign.budget.total) * 100
  );
  const budgetTotal = campaign.budget.total.toLocaleString();
  const budgetUsed = campaign.budget.used.toLocaleString();

  return (
    <div className="campaign-small">
      <div className="img-box">
        <img
          src={campaign.img}
          alt={campaign.title}
          className="campaign-image"
        />

        <span className={`tag tag-${campaign.tag.toLowerCase()}`}>
          {campaign.tag}
        </span>

        <span
          className={`status-badge status-${campaign.status.toLowerCase()}`}
        >
          {campaign.status}
        </span>
      </div>

      <div className="info">
        <h3>{campaign.title}</h3>
        <p className="desc">{campaign.description}</p>

        <div className="meta row">
          <div className="col-12 d-flex justify-content-between">
            <span>{campaign.startDate}</span>
            <span>{campaign.endDate}</span>
          </div>
          <div className="col-12 d-flex justify-content-between">
            <span>{campaign.targetAudience}</span>
            <span>🎯 Reach: {campaign.reach}</span>
          </div>
        </div>

        <div className="stats">
          <div>
            <p className="s-label">Views</p>
            <p>{campaign.stats.views}</p>
          </div>
          <div>
            <p className="s-label">Conv.</p>
            <p className="green">{campaign.stats.conv.toLocaleString()}</p>
          </div>
          <div>
            <p className="s-label">CVR</p>
            <p>{campaign.stats.cvr}</p>
          </div>
          <div>
            <p className="s-label">ROI</p>
            <p className="green">{campaign.stats.roi}</p>
          </div>
        </div>

        <div className="budget">
          <div className="bar">
            <div className="fill" style={{ width: `${budgetPercent}%` }} />
          </div>
          <div className="budget-line">
            <span>
              {campaign.budget.currency}
              {budgetUsed} / {campaign.budget.currency}
              {budgetTotal}
            </span>
            <span>{budgetPercent}%</span>
          </div>
        </div>

        <div className="vendor-actions">
          <button
            className="action-button edit-button"
            onClick={() => onEdit(campaign)} // <-- FIXED!
          >
            <i className="fa-solid fa-pen-to-square"></i> Edit
          </button>

          <button
            className="action-button delete-button"
            onClick={() => onDelete(campaign.id)}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
