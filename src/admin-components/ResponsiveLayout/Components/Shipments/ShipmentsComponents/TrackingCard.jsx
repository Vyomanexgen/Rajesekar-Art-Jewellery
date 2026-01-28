import React from "react";
import "./ShipmentsComponents.css";

const TrackingCard = ({ data, onViewDetails }) => {
    // Calculate progress percentage based on timeline
    const completedSteps = data.timeline.filter((step) => step.completed).length;
    const totalSteps = data.timeline.length;
    const progressPercentage = (completedSteps / totalSteps) * 100;

    // Get status color class
    const getStatusClass = (status) => {
        const statusMap = {
            "Order Placed": "status-pending",
            "Picked Up": "status-picked-up",
            "In Transit": "status-in-transit",
            "Out for Delivery": "status-out-for-delivery",
            Delivered: "status-delivered",
            Delayed: "status-delayed",
            Failed: "status-failed",
            Returned: "status-returned",
        };
        return statusMap[status] || "status-pending";
    };

    // Get last update info
    const lastUpdate = data.timeline
        .filter((step) => step.completed)
        .slice(-1)[0];

    // Format time ago
    const getTimeAgo = (timestamp) => {
        if (!timestamp) return "";
        const now = new Date();
        const updateTime = new Date(timestamp);
        const diffMs = now - updateTime;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
        if (diffHours > 0)
            return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
        return "Just now";
    };

    return (
        <div className="tracking-card">
            <div className="tracking-card-header">
                <div className="tracking-card-title">
                    <h3>{data.trackingId}</h3>
                    <span className={`tracking-status-badge ${getStatusClass(data.currentStatus)}`}>
                        {data.currentStatus}
                    </span>
                </div>
                <div className="tracking-partner">{data.shippingPartner}</div>
            </div>

            <div className="tracking-card-info">
                <p className="tracking-order">Order: {data.orderId}</p>
                <p className="tracking-customer">Customer: {data.customer}</p>
            </div>

            <div className="tracking-route">
                <div className="route-location">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{data.origin}</span>
                </div>
                <div className="route-arrow">
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
                <div className="route-location">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{data.destination}</span>
                </div>
            </div>

            <div className="tracking-progress">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <span className="progress-text">{Math.round(progressPercentage)}%</span>
            </div>

            <div className="tracking-card-details">
                <div className="detail-item">
                    <i className="fa-solid fa-calendar"></i>
                    <span>
                        Est. Delivery:{" "}
                        {new Date(data.estimatedDelivery).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                </div>
                {lastUpdate && (
                    <div className="detail-item last-update">
                        <i className="fa-solid fa-clock"></i>
                        <span>
                            {lastUpdate.location} - {getTimeAgo(lastUpdate.timestamp)}
                        </span>
                    </div>
                )}
            </div>

            <div className="tracking-card-actions">
                <button className="action-btn primary" onClick={() => onViewDetails(data)}>
                    <i className="fa-solid fa-eye"></i> View Details
                </button>
                <button className="action-btn secondary">
                    <i className="fa-solid fa-print"></i> Print Label
                </button>
                <button className="action-btn secondary">
                    <i className="fa-solid fa-bell"></i> Notify Customer
                </button>
            </div>
        </div>
    );
};

export default TrackingCard;
