import "./AnalyticsComponents.css";

const AnalyticsStats = ({ stats }) => {
  return (
    <div className="analytics-container">
      {stats.map((stat, index) => (
        <div
          className="stat-card"
          key={index}
          //   style={{ backgroundColor: stat.bg }}
        >
          <div className="stat-icon" style={{ color: stat.iconColor }}>
            <i className={`fa ${stat.icon}`}></i>
          </div>
          <div className="stat-info">
            <div className="stat-title">{stat.title}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-comparison">
              <span className="last-period"> {stat.lastPeriod}</span>
            </div>
          </div>
          <span
            className={`percent-change ${
              stat.isPositive ? "positive" : "negative"
            }`}
          >
            {stat.changePercent}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsStats;
