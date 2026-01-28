import "./MainDashboardComponents.css";

const StatusCards = ({ cardData = [] }) => {
  return (
    <div className="ssc-grid">
      {cardData.map((item, index) => (
        <div
          className="ssc-card"
          key={index}
          style={{ borderColor: item.color }}
        >
          <div className="ssc-top">
            <i
              className={`ssc-icon fa-solid ${item.icon}`}
              style={{ color: item.color }}
            ></i>
            <span className="ssc-title">{item.title}</span>
          </div>

          <div className="ssc-count">{item.count}</div>
          <div className="ssc-note">{item.note}</div>
        </div>
      ))}
    </div>
  );
};

export default StatusCards;
