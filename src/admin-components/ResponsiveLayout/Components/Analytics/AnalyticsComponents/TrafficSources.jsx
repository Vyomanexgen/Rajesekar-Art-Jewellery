import "./AnalyticsComponents.css";

const TrafficSources = ({ data }) => {
  return (
    <div className="traffic-container">
      <h2 className="traffic-title">Traffic Sources & Conversion</h2>

      <div className="traffic-table-wrapper">
        <table className="traffic-table">
          <thead>
            <tr>
              <th>SOURCE</th>
              <th>VISITORS</th>
              <th>CONVERSION RATE</th>
              <th>PERFORMANCE</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td className="traffic-source">{item.source}</td>
                <td>{item.visitors}</td>

                <td className="traffic-rate">
                  <span className="rate-green">{item.conversionRate}</span>
                </td>

                <td className="traffic-bar-cell">
                  <div className="bar-background">
                    <div
                      className="bar-fill"
                      style={{ width: item.performance + "%" }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrafficSources;
