// import PaymentsStats from "./PaymentsComponents/PaymentsStats";
// import PaymentGateway from "./PaymentsComponents/PaymentGateway";
// import GatewayModal from "./PaymentsComponents/Gateway";
// import RecentTransactions from "./PaymentsComponents/RecentTransactions";
// import "./Payments.css";

// import { useState, useMemo } from "react";

// function Payments() {
//   const PaymentGatewayData = [
//     {
//       id: 1,
//       name: "Razorpay",
//       method: "CARD",
//       transactionFee: "2% + ₹3",
//       settlement: "T+2 days",
//       transactions: 8542,
//       successRate: "98.3%",
//       merchantId: "MERCHANT_001",
//       isActive: true,
//       logo: "https://cdn-icons-png.flaticon.com/512/5968/5968757.png",
//     },
//     {
//       id: 2,
//       name: "PhonePe",
//       method: "UPI",
//       transactionFee: "1.5%",
//       settlement: "T+1 days",
//       transactions: 12453,
//       successRate: "97.8%",
//       merchantId: "MERCHANT_002",
//       isActive: false,
//       logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
//     },
//   ];

//   const sampleTransactions = [
//     {
//       orderId: "ORD-2024-1234",
//       status: "success",
//       customer: "Priya Sharma",
//       method: "Credit Card",
//       gateway: "Razorpay",
//       transactionId: "pay_MhJ7K8N9OP1Q2",
//       amount: 45999,
//       date: "28/11/2024, 2:30 pm",
//     },
//     {
//       orderId: "ORD-2024-1235",
//       status: "success",
//       customer: "Anita Reddy",
//       method: "UPI",
//       gateway: "PhonePe",
//       transactionId: "UPI_2024112813150001",
//       amount: 32500,
//       date: "28/11/2024, 1:15 pm",
//     },
//     {
//       orderId: "ORD-2024-1236",
//       status: "pending",
//       customer: "Meera Kapoor",
//       method: "Net Banking",
//       gateway: "Razorpay",
//       transactionId: "pay_NIK8L9MON1OP3",
//       amount: 28750,
//       date: "28/11/2024, 12:45 pm",
//     },
//     {
//       orderId: "ORD-2024-1237",
//       status: "pending",
//       customer: "Kavita Singh",
//       method: "COD",
//       gateway: "Cash on Delivery",
//       transactionId: "COD_2024112811200001",
//       amount: 15999,
//       date: "28/11/2024, 11:20 am",
//     },
//     {
//       orderId: "ORD-2024-1238",
//       status: "failed",
//       customer: "Ritu Verma",
//       method: "Wallet",
//       gateway: "Paytm",
//       transactionId: "PTM_2024112810150001",
//       amount: 52000,
//       date: "28/11/2024, 10:15 am",
//     },
//   ];

//   const [activeTab, setActiveTab] = useState("payment");
//   const [gateways, setGateways] = useState(PaymentGatewayData);
//   const [query, setQuery] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState(null);

//   const toggleStatus = (id) => {
//     setGateways((prev) =>
//       prev.map((g) => (g.id === id ? { ...g, isActive: !g.isActive } : g))
//     );
//   };

//   const handleEdit = (gateway) => {
//     setModalData(gateway);
//     setModalOpen(true);
//   };

//   const handleAdd = () => {
//     setModalData(null);
//     setModalOpen(true);
//   };

//   const handleSave = (gateway) => {
//     if (gateway.id) {
//       // Update existing
//       setGateways((prev) =>
//         prev.map((item) => (item.id === gateway.id ? gateway : item))
//       );
//     } else {
//       // Add new
//       setGateways((prev) => [
//         ...prev,
//         { ...gateway, id: Date.now(), isActive: false },
//       ]);
//     }
//     setModalOpen(false);

//     setModalData(null);
//   };

//   const filtered = useMemo(() => {
//     if (!query.trim()) return gateways;
//     const q = query.toLowerCase();
//     return gateways.filter(
//       (g) =>
//         g.name.toLowerCase().includes(q) ||
//         (g.method && g.method.toLowerCase().includes(q)) ||
//         (g.merchantId && g.merchantId.toLowerCase().includes(q))
//     );
//   }, [gateways, query]);

//   const totalTransactions = sampleTransactions.length;
//   const totalSuccessTransactions = sampleTransactions.reduce((total, item) => {
//     if (item.status == "success") return total + 1;
//     return total;
//   }, 0);
//   const totalPendingTransactions = sampleTransactions.reduce((total, item) => {
//     if (item.status == "pending") return total + 1;
//     return total;
//   }, 0);
//   const totalAmount = sampleTransactions.reduce((total, item) => {
//     return total + item.amount;
//   }, 0);
//   function formatNumber(num) {
//     if (num >= 1_000_000_000) {
//       return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
//     }
//     if (num >= 1_000_000) {
//       return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
//     }
//     if (num >= 1_000) {
//       return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
//     }
//     return String(num);
//   }

//   const transactionStatsData = [
//     {
//       title: "Total Transactions",
//       value: totalTransactions,
//       // value: "5",
//       icon: "fa-credit-card",
//       bg: "#e9f4ff",
//       iconColor: "#3d8bfd",
//     },
//     {
//       title: "Successful",
//       value: totalSuccessTransactions,
//       icon: "fa-check",
//       bg: "#e8f9f1",
//       iconColor: "#00A96E",
//     },
//     {
//       title: "Pending",
//       value: totalPendingTransactions,
//       icon: "fa-clock",
//       bg: "#fff7df",
//       iconColor: "#ffb100",
//     },
//     {
//       title: "Total Revenue",
//       value: `₹ ${formatNumber(totalAmount)}`,
//       icon: "fa-chart-line",
//       bg: "#f3edff",
//       iconColor: "#8b5cff",
//     },
//   ];

//   return (
//     <div className="PaymentsContainer">
//       <div className="MainDashboardHeaderContainer">
//         <div className="MainDashboardHeaderTextSection">
//           <h2 className="MainDashboardHeaderTitle">Payments & Settlements</h2>
//           <p className="MainDashboardHeaderSubtitle">
//             Manage payment gateways and transactions
//           </p>
//         </div>
//       </div>
//       <PaymentsStats data={transactionStatsData} />

//       <div className="toggle-container">
//         <div className="toggle-wrapper">
//           <button
//             className={`toggle-btn ${
//               activeTab === "payment" ? "active-toggle" : ""
//             }`}
//             onClick={() => setActiveTab("payment")}
//           >
//             Payment Gateways
//           </button>

//           <button
//             className={`toggle-btn ${
//               activeTab === "recent" ? "active-toggle" : ""
//             }`}
//             onClick={() => setActiveTab("recent")}
//           >
//             Recent Transactions
//           </button>
//         </div>
//       </div>

//       <div className="toggle-content">
//         {activeTab === "payment" ? (
//           <div className="pg-container">
//             <div className="pg-header-bar">
//               <input
//                 type="text"
//                 placeholder="Search Gateways..."
//                 className="pg-search"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//               />
//               <button className="pg-btn add" onClick={handleAdd}>
//                 + Add Gateway
//               </button>
//             </div>
//             <div className="pg-grid">
//               {filtered.map((gateway) => (
//                 <PaymentGateway
//                   key={gateway.id}
//                   data={gateway}
//                   onToggleStatus={toggleStatus}
//                   onEdit={handleEdit}
//                 />
//               ))}
//             </div>
//             {modalOpen && (
//               <GatewayModal
//                 existing={modalData}
//                 closeModal={() => setModalOpen(false)}
//                 onSubmit={handleSave}
//               />
//             )}
//           </div>
//         ) : (
//           <RecentTransactions transactions={sampleTransactions} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Payments;

import PaymentsStats from "./PaymentsComponents/PaymentsStats";
import PaymentGateway from "./PaymentsComponents/PaymentGateway";
import RecentTransactions from "./PaymentsComponents/RecentTransactions";
import "./Payments.css";

import { useState, useMemo } from "react";

function Payments() {
  const PaymentGatewayData = [
    {
      id: 1,
      name: "Razorpay",
      method: "CARD",
      transactionFee: "2% + ₹3",
      settlement: "T+2 days",
      transactions: 8542,
      successRate: "98.3%",
      merchantId: "MERCHANT_001",
      isActive: true,
      isPrimary: true,
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968757.png",
    },
    {
      id: 2,
      name: "PhonePe",
      method: "UPI",
      transactionFee: "1.5%",
      settlement: "T+1 days",
      transactions: 12453,
      successRate: "97.8%",
      merchantId: "MERCHANT_002",
      isActive: false,
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    },
  ];

  const sampleTransactions = [
    {
      orderId: "ORD-2024-1234",
      status: "success",
      customer: "Priya Sharma",
      method: "Credit Card",
      gateway: "Razorpay",
      transactionId: "pay_MhJ7K8N9OP1Q2",
      amount: 45999,
      date: "28/11/2024, 2:30 pm",
    },
    {
      orderId: "ORD-2024-1235",
      status: "success",
      customer: "Anita Reddy",
      method: "UPI",
      gateway: "PhonePe",
      transactionId: "UPI_2024112813150001",
      amount: 32500,
      date: "28/11/2024, 1:15 pm",
    },
    {
      orderId: "ORD-2024-1236",
      status: "pending",
      customer: "Meera Kapoor",
      method: "Net Banking",
      gateway: "Razorpay",
      transactionId: "pay_NIK8L9MON1OP3",
      amount: 28750,
      date: "28/11/2024, 12:45 pm",
    },
  ];

  const [activeTab, setActiveTab] = useState("payment");
  const [gateways, setGateways] = useState(PaymentGatewayData);
  const [query, setQuery] = useState("");

  const toggleStatus = (id) => {
    setGateways((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isActive: !g.isActive } : g))
    );
  };

  const filteredGateways = useMemo(() => {
    if (!query.trim()) return gateways;
    const q = query.toLowerCase();
    return gateways.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.method.toLowerCase().includes(q) ||
        g.merchantId.toLowerCase().includes(q)
    );
  }, [gateways, query]);

  const totalTransactions = sampleTransactions.length;
  const totalSuccess = sampleTransactions.filter(
    (t) => t.status === "success"
  ).length;
  const totalPending = sampleTransactions.filter(
    (t) => t.status === "pending"
  ).length;
  const totalAmount = sampleTransactions.reduce((sum, t) => sum + t.amount, 0);

  const transactionStatsData = [
    {
      title: "Total Transactions",
      value: totalTransactions,
      icon: "fa-credit-card",
      bg: "#e9f4ff",
      iconColor: "#3d8bfd",
    },
    {
      title: "Successful",
      value: totalSuccess,
      icon: "fa-check",
      bg: "#e8f9f1",
      iconColor: "#00A96E",
    },
    {
      title: "Pending",
      value: totalPending,
      icon: "fa-clock",
      bg: "#fff7df",
      iconColor: "#ffb100",
    },
    {
      title: "Total Revenue",
      value: `₹ ${totalAmount.toLocaleString()}`,
      icon: "fa-chart-line",
      bg: "#f3edff",
      iconColor: "#8b5cff",
    },
  ];

  return (
    <div className="PaymentsContainer">
      <div className="MainDashboardHeaderContainer">
        <div className="MainDashboardHeaderTextSection">
          <h2 className="MainDashboardHeaderTitle">Payments & Settlements</h2>
          <p className="MainDashboardHeaderSubtitle">
            Manage payment gateways and transactions
          </p>
        </div>
      </div>

      <PaymentsStats data={transactionStatsData} />

      <div className="toggle-container">
        <div className="toggle-wrapper">
          <button
            className={`toggle-btn ${activeTab === "payment" ? "active-toggle" : ""
              }`}
            onClick={() => setActiveTab("payment")}
          >
            Payment Gateways
          </button>

          <button
            className={`toggle-btn ${activeTab === "recent" ? "active-toggle" : ""
              }`}
            onClick={() => setActiveTab("recent")}
          >
            Recent Transactions
          </button>
        </div>
      </div>

      <div className="toggle-content">
        {activeTab === "payment" ? (
          <div className="pg-container">
            <div className="pg-header-bar">
              <input
                type="text"
                placeholder="Search Gateways..."
                className="pg-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="pg-grid">
              {filteredGateways.map((gateway) => (
                <PaymentGateway
                  key={gateway.id}
                  data={gateway}
                  onToggleStatus={toggleStatus}
                />
              ))}
            </div>
          </div>
        ) : (
          <RecentTransactions transactions={sampleTransactions} />
        )}
      </div>
    </div>
  );
}

export default Payments;
