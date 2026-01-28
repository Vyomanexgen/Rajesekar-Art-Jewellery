import "./MainDashboardComponents.css";

const OperationalMetrics = ({ metrics }) => {
  return (
    <div className="ops-grid">
      {metrics.map((metric, index) => (
        <div className="ops-card" key={index}>
          <span className="ops-icon">
            <i className={metric.icon}></i>
          </span>

          <p className="ops-title">{metric.title}</p>
          <h2 className="ops-value">{metric.value}</h2>

          <div className="ops-meta">
            <span
              className={`ops-change ${
                metric.isPositive ? "ops-up" : "ops-down"
              }`}
            >
              {metric.isPositive ? "▲" : "▼"} {metric.change}%
            </span>
            <span className="ops-compare">vs {metric.period}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OperationalMetrics;
