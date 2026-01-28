import { useState, useMemo } from "react";
import "./PaymentsComponents.css";
import OrderDetailsPopup from "./OrderDetailsPopup";

const RecentTransactions = ({ transactions }) => {
  const [query, setQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openPopup = (order) => {
    setSelectedOrder(order);
  };

  const closePopup = () => {
    setSelectedOrder(null);
  };

  const filteredTransactions = useMemo(() => {
    if (!query.trim()) return transactions;
    const q = query.toLowerCase();
    return transactions.filter(
      (t) =>
        t.orderId.toLowerCase().includes(q) ||
        t.customer.toLowerCase().includes(q) ||
        t.method.toLowerCase().includes(q)
    );
  }, [transactions, query]);

  const statusStyle = {
    success: { color: "#00A96E", icon: "fa-check" },
    pending: { color: "#ffb100", icon: "fa-clock" },
    failed: { color: "#e63946", icon: "fa-times" },
  };

  return (
    <div className="rt-container">
      <input
        className="rt-search"
        type="text"
        placeholder="Search transactions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="rt-list">
        {filteredTransactions.map((item) => (
          <div key={item.orderId} className="rt-item">
            <div className="rt-left">
              <h4>{item.orderId}</h4>
              <div className="rt-status">
                <i
                  className={`fa ${statusStyle[item.status].icon}`}
                  style={{ color: statusStyle[item.status].color }}
                ></i>
                <span style={{ color: statusStyle[item.status].color }}>
                  {item.status}
                </span>
              </div>

              <p className="rt-customer">
                {item.customer} • {item.method} • {item.gateway}
              </p>
              <p className="rt-id">{item.transactionId}</p>
            </div>

            <div className="rt-right">
              <h4 className="rt-amount">₹{item.amount.toLocaleString()}</h4>
              <span className="rt-date">{item.date}</span>

              <button
                className="rt-details-btn"
                onClick={() => openPopup(item)}
              >
                <i className="fa fa-eye"></i> Details
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedOrder && (
        <OrderDetailsPopup data={selectedOrder} onClose={closePopup} />
      )}
    </div>
  );
};

export default RecentTransactions;
