import "./InvoicesComponents.css";

function InvoicesStats({ data }) {
  return (
    <div className="invoices-stats-container">
      {data.map((stat, index) => (
        <div className="invoice-stat-card" key={index}>
          <div
            className="invoice-stat-icon"
            style={{ backgroundColor: stat.bg, color: stat.iconColor }}
          >
            <i className={`fa-solid ${stat.icon}`}></i>
          </div>

          <div className="invoice-stat-info">
            <p className="invoice-stat-title">{stat.title}</p>
            <h2 className="invoice-stat-value">{stat.value}</h2>
          </div>

          <div
            className="invoice-stat-icon d-none"
            style={{ backgroundColor: stat.bg, color: stat.iconColor }}
          >
            <i className={`fa-solid ${stat.icon}`}></i>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InvoicesStats;
