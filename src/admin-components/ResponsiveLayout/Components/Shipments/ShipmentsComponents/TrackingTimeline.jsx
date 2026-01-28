import React from "react";
import "./ShipmentsComponents.css";

const TrackingTimeline = ({ timeline }) => {
    return (
        <div className="tracking-timeline">
            {timeline.map((step, index) => (
                <div
                    key={index}
                    className={`timeline-item ${step.completed ? "completed" : ""} ${step.current ? "current" : ""
                        }`}
                >
                    <div className="timeline-marker">
                        <div className="timeline-icon">
                            {step.completed ? (
                                <i className="fa-solid fa-check"></i>
                            ) : step.current ? (
                                <i className={`fa-solid ${step.icon}`}></i>
                            ) : (
                                <i className="fa-regular fa-circle"></i>
                            )}
                        </div>
                        {index < timeline.length - 1 && <div className="timeline-line"></div>}
                    </div>

                    <div className="timeline-content">
                        <div className="timeline-header">
                            <h4 className="timeline-status">{step.status}</h4>
                            {step.timestamp && (
                                <span className="timeline-timestamp">{step.timestamp}</span>
                            )}
                        </div>
                        <p className="timeline-location">
                            <i className="fa-solid fa-location-dot"></i> {step.location}
                        </p>
                        <p className="timeline-description">{step.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TrackingTimeline;
