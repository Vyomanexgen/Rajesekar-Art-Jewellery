import "./CustomersComponents.css";

import { useState } from "react";

// --- Sample Customer Data (CustomerData.js - Hypothetical separate file) ---
// const customers = [
//   {
//     customerId: "CUST-1001",
//     customerName: "Priya Sharma",
//     email: "priya.sharma@example.com",
//     phone: "+91 98765 43210",
//     orders: 12,
//     ltv: "₹45,680",
//     segment: "VIP",
//     lastSeen: "2 hours ago",
//     riskFlags: "None",
//   },
//   {
//     customerId: "CUST-1002",
//     customerName: "Rahul Kumar",
//     email: "rahul.k@example.com",
//     phone: "+91 98765 43211",
//     orders: 3,
//     ltv: "₹8,950",
//     segment: "Regular",
//     lastSeen: "1 day ago",
//     riskFlags: "COD-Only",
//   },
//   {
//     customerId: "CUST-1003",
//     customerName: "Anjali Verma",
//     email: "anjali.v@example.com",
//     phone: "+91 98765 43212",
//     orders: 18,
//     ltv: "₹67,200",
//     segment: "VIP",
//     lastSeen: "3 hours ago",
//     riskFlags: "None",
//   },
//   {
//     customerId: "CUST-1004",
//     customerName: "Vikram Singh",
//     email: "vikram.singh@example.com",
//     phone: "+91 98765 43213",
//     orders: 5,
//     ltv: "₹15,420",
//     segment: "Regular",
//     lastSeen: "2 days ago",
//     riskFlags: "None",
//   },
//   {
//     customerId: "CUST-1005",
//     customerName: "Meera Patel",
//     email: "meera.patel@example.com",
//     phone: "+91 98765 43214",
//     orders: 1,
//     ltv: "₹2,499",
//     segment: "New",
//     lastSeen: "5 days ago",
//     riskFlags: "High RTO",
//   },
//   {
//     customerId: "CUST-1006",
//     customerName: "Arjun Reddy",
//     email: "arjun.reddy@example.com",
//     phone: "+91 98765 43215",
//     orders: 7,
//     ltv: "₹28,350",
//     segment: "Loyal",
//     lastSeen: "1 hour ago",
//     riskFlags: "None",
//   },
//   {
//     customerId: "CUST-1007",
//     customerName: "Sneha Gupta",
//     email: "sneha.gupta@example.com",
//     phone: "+91 98765 43216",
//     orders: 22,
//     ltv: "₹89,750",
//     segment: "VIP",
//     lastSeen: "30 mins ago",
//     riskFlags: "None",
//   },
//   {
//     customerId: "CUST-1008",
//     customerName: "Karthik Menon",
//     email: "karthik.m@example.com",
//     phone: "+91 98765 43217",
//     orders: 4,
//     ltv: "₹12,680",
//     segment: "Regular",
//     lastSeen: "4 days ago",
//     riskFlags: "COD-Only",
//   },
// ];

const customersPerPage = 5; // Showing 8 rows as seen in the image

const CustomerDataTable = ({ customers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // Assuming a total of 3421 customers from the footer text "Showing 1-8 of 3,421 customers"
  const totalCustomers = customers.length;
  const totalPages = Math.ceil(totalCustomers / customersPerPage);

  // Calculate visible rows for the current page (using the 8 sample customers for display)
  const startIndex = (currentPage - 1) * customersPerPage;
  // Use the sample data for demonstration. In a real app, you would fetch data for the current page.
  const visibleCustomers = customers.slice(
    startIndex,
    startIndex + customersPerPage
  );

  // Helper function to get segment badge color
  const getSegmentClass = (segment) => {
    switch (segment) {
      case "VIP":
        return "badge-purple";
      case "Loyal":
        return "badge-blue";
      case "Regular":
        return "badge-green";
      case "New":
        return "badge-yellow";
      default:
        return "badge-gray";
    }
  };

  // Helper function to get risk flag badge color
  const getRiskFlagClass = (flag) => {
    switch (flag) {
      case "High RTO":
        return "flag-red";
      case "COD-Only":
        return "flag-orange";
      default:
        return "flag-none";
    }
  };

  return (
    <div className="table-container">
      <table className="customers-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox"></input>
            </th>
            <th>CUSTOMER</th>
            <th>CONTACT</th>
            <th>ORDERS</th>
            <th>LTV</th>
            <th>SEGMENT</th>
            <th>LAST SEEN</th>
            <th>RISK FLAGS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {visibleCustomers.map((customer, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" className="InputBox"></input>
              </td>
              <td>
                <div className="customer-info">
                  <span className="bold blue-link">
                    {customer.customerName}
                  </span>
                  <span className="customer-id">{customer.customerId}</span>
                </div>
              </td>

              <td>
                <div className="contact-info">
                  <span className="contact-item">
                    <i className="fa-regular fa-envelope"></i>
                    {customer.email}
                  </span>
                  <span className="contact-item">
                    <i className="fa-solid fa-phone"></i>
                    {customer.phone}
                  </span>
                </div>
              </td>

              <td>{customer.orders}</td>
              <td className="bold blue-link">{customer.ltv}</td>

              {/* SEGMENT BADGE */}
              <td>
                <span
                  className={`badge segment ${getSegmentClass(
                    customer.segment
                  )}`}
                >
                  {customer.segment}
                </span>
              </td>

              <td>{customer.lastSeen}</td>

              {/* RISK FLAG BADGE */}
              <td>
                <span
                  className={`risk-flag-badge ${getRiskFlagClass(
                    customer.riskFlags
                  )}`}
                >
                  {customer.riskFlags}
                </span>
              </td>

              <td className="Menu">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* PAGINATION SECTION */}
      <div className="pagination footer-pagination">
        <span className="showing-info">
          Showing {startIndex + 1}-
          {Math.min(startIndex + customersPerPage, totalPages)} of{" "}
          {totalCustomers} customers
        </span>

        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        {/* Always show page 1 */}
        {totalPages > 0 && (
          <button
            className={`page-number ${currentPage === 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
        )}

        {/* Show Ellipsis if current page is far from page 1 */}
        {currentPage > 4 && totalPages > 5 && (
          <span className="ellipsis">...</span>
        )}

        {/* Display surrounding page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (p) =>
              // Show the current page and two pages around it
              p >= currentPage - 2 &&
              p <= currentPage + 2 &&
              // Ensure pages are not 1 or the last page (as they are handled separately)
              p !== 1 &&
              p !== totalPages
          )
          .map((p) => (
            <button
              key={p}
              className={`page-number ${currentPage === p ? "active" : ""}`}
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </button>
          ))}

        {/* Show Ellipsis if current page is far from the last page */}
        {currentPage < totalPages - 3 && totalPages > 5 && (
          <span className="ellipsis">...</span>
        )}

        {/* Always show the last page (only if totalPages > 1) */}
        {totalPages > 1 && (
          <button
            className={`page-number ${
              currentPage === totalPages ? "active" : ""
            }`}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </button>
        )}

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>{" "}
    </div>
  );
};

export default CustomerDataTable;
