import "./PermissionsComponents.css";

function PermissionsStats({ data }) {
  return (
    <div className="permissions-stats-container">
      {data.map((stat, index) => (
        <div className="permission-stat-card" key={index}>
          <div
            className="permission-stat-icon"
            style={{ backgroundColor: stat.bg, color: stat.iconColor }}
          >
            <i className={`fa-solid ${stat.icon}`}></i>
          </div>

          <div className="permission-stat-info">
            <p className="permission-stat-title">{stat.title}</p>
            <h2 className="permission-stat-value">{stat.value}</h2>
          </div>

          <div
            className="permission-stat-icon d-none"
            style={{ backgroundColor: stat.bg, color: stat.iconColor }}
          >
            <i className={`fa-solid ${stat.icon}`}></i>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PermissionsStats;
