import "./MainDashboardComponents.css";

const SalesPerformance = ({ data }) => {
  return (
    <div className="sales-performance-container">
      {data.map((item, index) => (
        <div className="metric-card" key={index}>
          <div className="metric-header">
            <p className="metric-title">{item.title}</p>
            <span className="metric-icon">
              <i className={item.icon}></i>
            </span>
          </div>

          <h2 className="metric-value">{item.value}</h2>

          <div className="metric-footer">
            <span
              className={`change ${item.isPositive ? "positive" : "negative"}`}
            >
              {item.isPositive ? "▲" : "▼"} {item.change}%
            </span>
            <span className="compare-text">vs last week</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesPerformance;
