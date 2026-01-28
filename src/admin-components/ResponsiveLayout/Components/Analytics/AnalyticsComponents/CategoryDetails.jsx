import "./AnalyticsComponents.css";

const CategoryDetails = ({ data }) => {
  return (
    <div className="category-container">
      <h2 className="category-title">Category Details</h2>

      <div className="table-wrapper">
        <table className="category-table">
          <thead>
            <tr>
              <th>CATEGORY</th>
              <th>REVENUE</th>
              <th>ORDERS</th>
              <th>AVG ORDER VALUE</th>
              <th>GROWTH</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td className="category-name">{item.category}</td>
                <td>{item.revenue}</td>
                <td>{item.orders}</td>
                <td>{item.avgOrderValue}</td>

                <td
                  className={`growth ${
                    item.growth.includes("-") ? "negative" : "positive"
                  }`}
                >
                  {item.growth.includes("-") ? "↘ " : "↗ "}
                  {item.growth}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryDetails;
