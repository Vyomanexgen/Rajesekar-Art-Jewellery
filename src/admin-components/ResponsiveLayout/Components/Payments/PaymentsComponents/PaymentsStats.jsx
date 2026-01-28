import "./PaymentsComponents.css";

function PaymentsStats({ data }) {
  return (
    <div className="payment-stats-container">
      {data.map((stat, index) => (
        <div className="payment-stat-card" key={index}>
          <div
            className="payment-stat-icon "
            style={{ backgroundColor: stat.bg, color: stat.iconColor }}
          >
            <i className={`fa-solid ${stat.icon}`}></i>
          </div>

          <div className="payment-stat-info">
            <p className="payment-stat-title">{stat.title}</p>
            <h2 className="payment-stat-value">{stat.value}</h2>
          </div>

          <div
            className="payment-stat-icon d-none"
            style={{ backgroundColor: stat.bg, color: stat.iconColor }}
          >
            <i className={`fa-solid ${stat.icon}`}></i>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PaymentsStats;
