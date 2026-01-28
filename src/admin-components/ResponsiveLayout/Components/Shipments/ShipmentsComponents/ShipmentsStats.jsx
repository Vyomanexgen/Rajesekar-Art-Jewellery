import "./ShipmentsComponents.css";

function ShipmentsStats({ data }) {
  return (
    <div className="shipment-stats-container">
      {data.map((stat, index) => (
        <div className="shipment-stat-card" key={index}>
          <div
            className="shipment-stat-icon "
            style={{ backgroundColor: stat.bg, color: stat.iconColor }}
          >
            <i className={`fa-solid ${stat.icon}`}></i>
          </div>

          <div className="shipment-stat-info">
            <p className="shipment-stat-title">{stat.title}</p>
            <h2 className="shipment-stat-value">{stat.value}</h2>
          </div>

          <div
            className="shipment-stat-icon d-none"
            style={{ backgroundColor: stat.bg, color: stat.iconColor }}
          >
            <i className={`fa-solid ${stat.icon}`}></i>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShipmentsStats;
