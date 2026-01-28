import {
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaCube,
  FaChartLine,
} from "react-icons/fa";
import "./DashboardComponents.css";

// Map the string keys from salesMetricsData to the imported React Icon components.
const iconMap = {
  "dollar-sign": FaDollarSign,
  "arrow-trend-up": FaChartLine,
  box: FaCube,
};

// Mapping of change status to the arrow icon
const trendIconMap = {
  up: FaArrowUp,
  down: FaArrowDown,
};

function MetricCard({ title, value, change, trend, icon }) {
  const IconComponent = iconMap[icon] || FaChartLine;
  const TrendIcon = trendIconMap[trend] || FaChartLine;
  const trendColorClass = trend === "up" ? "trend-up" : "trend-down";

  return (
    // We add the 'position-relative' class (or equivalent CSS) to the main container
    <div className="metric-card">
      <div className="inner-metric-card">
        {/* Title */}
        <div className="card-header">
          <h4 className="card-title">{title}</h4>
        </div>

        {/* Value and Trend */}
        <div className="card-body">
          <p className="card-value">{value}</p>

          {/* Percentage Change Display (Dynamic Color/Arrow) */}
          <div className={`trend-indicator ${trendColorClass}`}>
            <TrendIcon className="trend-arrow" />
            <span className="trend-text">{change} vs last week</span>
          </div>
        </div>
      </div>

      {/* Logo/Icon Container (Will be positioned absolutely) */}
      <div className="SalesPerformanceRightContainer">
        <IconComponent className="card-icon" />
      </div>
    </div>
  );
}

export default MetricCard;
