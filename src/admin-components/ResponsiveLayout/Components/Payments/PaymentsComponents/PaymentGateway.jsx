import "./PaymentsComponents.css";
// import React, { useState } from "react";

const PaymentGateway = ({ data, onToggleStatus, onEdit }) => {
  const {
    id,
    name,
    method,
    transactionFee,
    settlement,
    transactions,
    successRate,
    merchantId,
    isActive,
    isPrimary,
    logo,
  } = data;

  return (
    <div className="pg-card">
      <div className="pg-header">
        <img src={logo} alt={name} className="pg-logo" />

        <div className="pg-title-row">
          <h3>{name}</h3>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span className={`pg-status ${isActive ? "active" : "inactive"}`}>
              {isActive ? "✔ active" : "✖ inactive"}
            </span>
            {isPrimary && (
              <span className="pg-status primary">
                Primary
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pg-info">
        <p className="pg-label">{method}</p>

        <div className="d-flex">
          <div className="pg-row">
            <p className="pg-grey">Transaction Fee</p>
            <p>{transactionFee}</p>
          </div>

          <div className="pg-row">
            <p className="pg-grey">Settlement</p>
            <p>{settlement}</p>
          </div>
        </div>

        <div className="d-flex">
          <div className="pg-row">
            <p className="pg-grey">Transactions</p>
            <p>{transactions.toLocaleString()}</p>
          </div>

          <div className="pg-row">
            <p className="pg-grey">Success Rate</p>
            <p className="pg-success">{successRate}</p>
          </div>
        </div>

        <div className="pg-footer-text">
          <p>Merchant ID: {merchantId}</p>
          <p>API Key: ***************</p>
        </div>
      </div>

      <div className="pg-actions">
        <button
          className={`pg-btn ${isActive ? "deactivate" : "activate"}`}
          onClick={() => onToggleStatus(id)}
        >
          {isActive ? "Deactivate" : "Activate"}
        </button>

        <button className="pg-btn configure" onClick={() => onEdit(data)}>
          ⚙ Configure
        </button>
      </div>
    </div>
  );
};

export default PaymentGateway;
