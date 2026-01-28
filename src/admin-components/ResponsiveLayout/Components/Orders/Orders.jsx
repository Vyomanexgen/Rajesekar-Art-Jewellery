import { useState } from "react";
// import { useEffect } from "react";
import exportJsonToExcel from "../../../ExportExcelToJson";
import "./Orders.css";

const Orders = () => {
  /* data */
  const OrdersData = [
    {
      orderId: "ORD-UNIQUE-001",
      date: "2024-01-10 14:32",
      customer: "Priya Sharma",
      items: 3,
      total: "₹8,950",
      payment: "Paid",
      status: "accepted",
      fulfillment: "Shipped",
      channel: "Website",
      sla: "2h left",
    },
    {
      orderId: "ORD-UNIQUE-002",
      date: "2024-01-10 13:18",
      customer: "Rahul Kumar",
      items: 1,
      total: "₹2,499",
      payment: "COD",
      status: "waiting",
      fulfillment: "Processing",
      channel: "Mobile App",
      sla: "4h left",
    },
    {
      orderId: "ORD-UNIQUE-003",
      date: "2024-01-10 12:05",
      customer: "Anjali Verma",
      items: 5,
      total: "₹12,450",
      payment: "Paid",
      status: "accepted",
      fulfillment: "Delivered",
      channel: "Website",
      sla: "On Time",
    },
    {
      orderId: "ORD-UNIQUE-004",
      date: "2024-01-10 14:32",
      customer: "Priya Sharma",
      items: 3,
      total: "₹8,950",
      payment: "Paid",
      status: "accepted",
      fulfillment: "Shipped",
      channel: "Website",
      sla: "2h left",
    },
    {
      orderId: "ORD-UNIQUE-005",
      date: "2024-01-10 13:18",
      customer: "Rahul Kumar",
      items: 1,
      total: "₹2,499",
      payment: "COD",
      status: "waiting",
      fulfillment: "Processing",
      channel: "Mobile App",
      sla: "4h left",
    },
    {
      orderId: "ORD-UNIQUE-006",
      date: "2024-01-10 12:05",
      customer: "Anjali Verma",
      items: 5,
      total: "₹12,450",
      payment: "Paid",
      status: "accepted",
      fulfillment: "Delivered",
      channel: "Website",
      sla: "On Time",
    },
    {
      orderId: "ORD-UNIQUE-007",
      date: "2024-01-10 11:42",
      customer: "Vikram Singh",
      items: 2,
      total: "₹5,980",
      payment: "Paid",
      status: "accepted",
      fulfillment: "Packed",
      channel: "Mobile App",
      sla: "1h left",
    },
    {
      orderId: "ORD-UNIQUE-008",
      date: "2024-01-10 10:15",
      customer: "Meera Patel",
      items: 4,
      total: "₹9,875",
      payment: "Failed",
      status: "rejected",
      fulfillment: "Cancelled",
      channel: "Website",
      sla: "Missed",
    },
    {
      orderId: "ORD-UNIQUE-009",
      date: "2024-01-10 09:23",
      customer: "Arjun Reddy",
      items: 1,
      total: "₹3,250",
      payment: "Paid",
      status: "accepted",
      fulfillment: "In Transit",
      channel: "Mobile App",
      sla: "On Track",
    },
    {
      orderId: "ORD-UNIQUE-010",
      date: "2024-01-09 18:45",
      customer: "Sneha Gupta",
      items: 6,
      total: "₹15,680",
      payment: "Paid",
      status: "accepted",
      fulfillment: "Delivered",
      channel: "Website",
      sla: "On Time",
    },
    {
      orderId: "ORD-UNIQUE-011",
      date: "2024-01-09 16:32",
      customer: "Karthik Menon",
      items: 2,
      total: "₹4,875",
      payment: "COD",
      status: "waiting",
      fulfillment: "Processing",
      channel: "Website",
      sla: "6h left",
    },
    {
      orderId: "ORD-UNIQUE-012",
      date: "2024-01-10 14:32",
      customer: "Priya Sharma",
      items: 3,
      total: "₹8,950",
      payment: "Paid",
      status: "accepted",
      fulfillment: "Shipped",
      channel: "Website",
      sla: "2h left",
    },
    {
      orderId: "ORD-UNIQUE-013",
      date: "2024-01-10 13:18",
      customer: "Rahul Kumar",
      items: 1,
      total: "₹2,499",
      payment: "COD",
      status: "waiting",
      fulfillment: "Processing",
      channel: "Mobile App",
      sla: "4h left",
    },
    {
      orderId: "ORD-UNIQUE-014",
      date: "2024-01-10 12:05",
      customer: "Anjali Verma",
      items: 5,
      total: "₹12,450",
      payment: "Paid",
      status: "accepted",
      fulfillment: "Delivered",
      channel: "Website",
      sla: "On Time",
    },
    {
      orderId: "ORD-UNIQUE-015",
      date: "2024-01-10 14:32",
      customer: "Priya Sharma",
      items: 3,
      total: "₹8,950",
      payment: "Paid",
      status: "accepted",
      fulfillment: "Shipped",
      channel: "Website",
      sla: "2h left",
    },
    {
      orderId: "ORD-UNIQUE-016",
      date: "2024-01-10 13:18",
      customer: "Rahul Kumar",
      items: 1,
      total: "₹2,499",
      payment: "COD",
      status: "waiting",
      fulfillment: "Processing",
      channel: "Mobile App",
      sla: "4h left",
    },
    {
      orderId: "ORD-UNIQUE-017",
      date: "2024-01-10 12:05",
      customer: "Anjali Verma",
      items: 5,
      total: "₹12,450",
      payment: "Paid",
      status: "accepted",
      fulfillment: "Delivered",
      channel: "Website",
      sla: "On Time",
    },
    {
      orderId: "ORD-UNIQUE-018",
      date: "2024-01-10 11:42",
      customer: "Vikram Singh",
      items: 2,
      total: "₹5,980",
      payment: "Paid",
      status: "accepted",
      fulfillment: "Packed",
      channel: "Mobile App",
      sla: "1h left",
    },
    {
      orderId: "ORD-UNIQUE-019",
      date: "2024-01-10 10:15",
      customer: "Meera Patel",
      items: 4,
      total: "₹9,875",
      payment: "Failed",
      status: "rejected",
      fulfillment: "Cancelled",
      channel: "Website",
      sla: "Missed",
    },
    {
      orderId: "ORD-UNIQUE-020",
      date: "2024-01-10 09:23",
      customer: "Arjun Reddy",
      items: 1,
      total: "₹3,250",
      payment: "Paid",
      status: "accepted",
      fulfillment: "In Transit",
      channel: "Mobile App",
      sla: "On Track",
    },
    {
      orderId: "ORD-UNIQUE-021",
      date: "2024-01-09 18:45",
      customer: "Sneha Gupta",
      items: 6,
      total: "₹15,680",
      payment: "Paid",
      status: "accepted",
      fulfillment: "Delivered",
      channel: "Website",
      sla: "On Time",
    },
    {
      orderId: "ORD-UNIQUE-022",
      date: "2024-01-09 16:32",
      customer: "Karthik Menon",
      items: 2,
      total: "₹4,875",
      payment: "COD",
      status: "waiting",
      fulfillment: "Processing",
      channel: "Website",
      sla: "6h left",
    },
  ];

  const [orders, setOrders] = useState(OrdersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [popupMode, setPopupMode] = useState("add"); // "add" | "edit"
  const [editingOrderId, setEditingOrderId] = useState(null);

  // const getStatusFromFulfillment = (fulfillment) => {
  //   if (fulfillment === "Processing") return "waiting";
  //   if (fulfillment === "Cancelled") return "rejected";
  //   return "accepted";
  // };

  // const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    customer: "",
    items: "",
    total: "",
    payment: "",
    status: "waiting",
    fulfillment: "",
    channel: "",
    sla: "",
  });
  // const [dateFilter, setDateFilter] = useState("Today");

  // View Order Popup
  const [viewOrder, setViewOrder] = useState(null);

  // Total Number of Orders Per Page
  const ordersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate visible rows
  const startIndex = (currentPage - 1) * ordersPerPage;

  // Main Filter Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPayment =
      paymentFilter === "All" || order.payment === paymentFilter;

    const matchesStatus =
      statusFilter === "All" || order.fulfillment === statusFilter;

    return matchesSearch && matchesPayment && matchesStatus;
  });

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [searchQuery, paymentFilter, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Apply pagination AFTER filtering
  const visibleOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  // State to track selected order IDs
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);

  // State for the "Select All" checkbox
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Function to handle individual checkbox clicks
  const handleCheckboxChange = (orderId) => {
    setSelectedOrderIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(orderId)) {
        // If already selected, remove it
        return prevSelectedIds.filter((id) => id !== orderId);
      } else {
        // If not selected, add it
        return [...prevSelectedIds, orderId];
      }
    });
  };

  // Function to handle "Select All" checkbox
  const handleSelectAll = (e) => {
    setIsAllSelected(e.target.checked);
    if (e.target.checked) {
      // Select all IDs
      setSelectedOrderIds(filteredOrders.map((order) => order.orderId));
    } else {
      // Deselect all if selected
      setSelectedOrderIds([]);
    }
  };

  const formatDateTime = (value) => {
    const dateObj = new Date(value);

    return dateObj.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If status is set to rejected → auto cancel fulfillment
    if (name === "status" && value === "rejected") {
      setFormData({
        ...formData,
        status: value,
        fulfillment: "Cancelled",
      });
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateOrderId = () => {
    const year = new Date().getFullYear();
    const next = orders.length + 1;
    return `ORD-${year}-${String(next).padStart(3, "0")}`;
  };

  const handleSubmit = () => {
    if (popupMode === "add") {
      const newOrder = {
        orderId: generateOrderId(),
        date: formatDateTime(formData.date),
        customer: formData.customer,
        items: formData.items,
        total: formData.total,
        payment: formData.payment,
        status: formData.status,
        fulfillment: formData.fulfillment,
        channel: formData.channel,
        sla: formData.sla,
      };

      setOrders([...orders, newOrder]);
    }

    if (popupMode === "edit") {
      const updatedOrders = orders.map((order) =>
        order.orderId === editingOrderId
          ? {
              ...order,
              date: formatDateTime(formData.date),
              customer: formData.customer,
              items: formData.items,
              total: formData.total,
              payment: formData.payment,
              status: formData.status,
              fulfillment: formData.fulfillment,
              channel: formData.channel,
              sla: formData.sla,
            }
          : order
      );

      setOrders(updatedOrders);
    }

    setIsOpen(false);
    setPopupMode("add");
    setEditingOrderId(null);

    setFormData({
      date: "",
      customer: "",
      items: "",
      total: "",
      payment: "",
      status: "",
      fulfillment: "",
      channel: "",
      sla: "",
    });
  };

  const handleEditOrder = (order) => {
    setPopupMode("edit");
    setEditingOrderId(order.orderId);

    setFormData({
      date: new Date(order.date).toISOString().slice(0, 16),
      customer: order.customer,
      items: order.items,
      total: order.total,
      payment: order.payment,
      status: order.status,
      fulfillment: order.fulfillment,
      channel: order.channel,
      sla: order.sla,
    });

    setIsOpen(true);
  };

  // Check if an order is selected
  const isSelected = (orderId) => selectedOrderIds.includes(orderId);

  // const handleRemoveItem = (orderId) => {
  //   const newOrders = orders.filter((order) => order.orderId !== orderId);
  //   setOrders(newOrders);
  // };

  // Selected Orders
  const selectedOrders = OrdersData.filter((order) =>
    selectedOrderIds.includes(order.orderId)
  );

  const totalOrders = filteredOrders.length;

  //  Open Popup
  const openViewPopup = (order) => {
    setViewOrder(order);
  };

  //  Close Popup
  const closeViewPopup = () => {
    setViewOrder(null);
  };

  // Print feature

  const handlePrintOrder = (order) => {
    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
    <html>
      <head>
        <title>Order ${order.orderId}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 20px;
          }
          h2 {
            text-align:center;
            margin-bottom:20px;
          }
          table {
            width:100%;
            border-collapse:collapse;
            margin-top:10px;
          }
          td {
            padding:8px;
            border:1px solid #999;
          }
        </style>
      </head>
      <body>
        <h2>Order Invoice</h2>
        <table>
          <tr><td><b>Order ID:</b></td><td>${order.orderId}</td></tr>
          <tr><td><b>Date:</b></td><td>${order.date}</td></tr>
          <tr><td><b>Customer:</b></td><td>${order.customer}</td></tr>
          <tr><td><b>Items:</b></td><td>${order.items}</td></tr>
          <tr><td><b>Total:</b></td><td>${order.total}</td></tr>
          <tr><td><b>Payment:</b></td><td>${order.payment}</td></tr>
          <tr><td><b>Status:</b></td><td>${order.status}</td></tr>
          <tr><td><b>Fulfillment:</b></td><td>${order.fulfillment}</td></tr>
          <tr><td><b>Channel:</b></td><td>${order.channel}</td></tr>
          <tr><td><b>SLA:</b></td><td>${order.sla}</td></tr>
        </table>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>

      </body>
    </html>
  `);

    printWindow.document.close();
  };

  // This bar will be visible if selectedOrderIds.length > 0
  const showSelectedHeader = selectedOrderIds.length > 0;

  return (
    <div className="OrdersContainer">
      {/* ⭐ VIEW POPUP OVERLAY */}
      {viewOrder && (
        <>
          <div className="order-overlay" onClick={closeViewPopup}></div>

          <div className="order-popup">
            <h2>Order Details</h2>

            <div className="order-form">
              <p>
                <b>Order ID:</b> {viewOrder.orderId}
              </p>
              <p>
                <b>Date:</b> {viewOrder.date}
              </p>
              <p>
                <b>Customer:</b> {viewOrder.customer}
              </p>
              <p>
                <b>Items:</b> {viewOrder.items}
              </p>
              <p>
                <b>Total:</b> {viewOrder.total}
              </p>
              <p>
                <b>Payment:</b> {viewOrder.payment}
              </p>
              <p>
                <b>Status:</b> {viewOrder.status}
              </p>
              <p>
                <b>Fulfillment:</b> {viewOrder.fulfillment}
              </p>
              <p>
                <b>Channel:</b> {viewOrder.channel}
              </p>
              <p>
                <b>SLA:</b> {viewOrder.sla}
              </p>
            </div>

            <button
              className="print-btn"
              onClick={() => handlePrintOrder(viewOrder)}
            >
              Print PDF
            </button>

            <button className="close-btn" onClick={closeViewPopup}>
              Close
            </button>
          </div>
        </>
      )}

      {/* Overlay + Popup */}
      {isOpen && (
        <>
          <div className="order-overlay" onClick={() => setIsOpen(false)}></div>

          <div className="order-popup">
            {/* <h2>Add New Order</h2> */}
            {/* <h2>{popupMode === "add" ? "Add New Order" : "Edit Order"}</h2> */}
            <h2>{popupMode === "add" ? "Add New Order" : "Edit Order"}</h2>

            <div className="order-form">
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Date & Time"
              />
              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                placeholder="Customer Name"
              />
              <input
                type="number"
                name="items"
                value={formData.items}
                onChange={handleChange}
                placeholder="Items Count"
              />
              <input
                type="text"
                name="total"
                value={formData.total}
                onChange={handleChange}
                placeholder="Total Amount"
              />
              <select
                name="payment"
                value={formData.payment}
                onChange={handleChange}
              >
                <option value="">Select Payment</option>
                <option value="Paid">Paid</option>
                <option value="COD">COD</option>
              </select>
              <div className="status-preview">
                <label>Status</label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="waiting">Waiting</option>
                </select>
              </div>

              <select
                name="fulfillment"
                value={formData.fulfillment}
                onChange={handleChange}
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <input
                type="text"
                name="channel"
                value={formData.channel}
                onChange={handleChange}
                placeholder="Channel (Website/App)"
              />
              <input
                type="text"
                name="sla"
                value={formData.sla}
                onChange={handleChange}
                placeholder="SLA (ex: 2h left)"
              />
            </div>

            <button className="save-btn" onClick={handleSubmit}>
              Save Order
            </button>

            <button
              className="cancel-btn"
              onClick={() => {
                setIsOpen(false);
                setPopupMode("add");
                setEditingOrderId(null);

                setFormData({
                  date: "",
                  customer: "",
                  items: "",
                  total: "",
                  payment: "",
                  fulfillment: "",
                  channel: "",
                  sla: "",
                });
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}

      <div className="OrdersHeaderContainer">
        <div className="OrdersHeaderTextSection">
          <h2 className="OrdersHeaderTitle">Orders</h2>
          <p className="OrdersHeaderSubtitle">
            Manage and track all customer orders
          </p>
        </div>

        <div className="OrdersHeaderControls">
          <button
            className="OrdersHeaderExport"
            onClick={() => setIsOpen(true)}
          >
            + Manual Order
          </button>
        </div>
      </div>

      {/* Search and Filter Option */}
      <div className="OrdersFilterBarContainer">
        <input
          type="text"
          placeholder=" 🔍 Search by Order ID,Customer Name"
          className="OrdersFilterBarSearch"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="FilterBarPaymentMethods"
          id="myDropdown"
          name="selectedOption"
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
        >
          <option value="All">All Payments</option>
          <option value="Paid">Paid</option>
          <option value="COD">COD</option>
          <option value="Failed">Failed</option>
        </select>

        <select
          className="FilterBarPaymentMethods"
          id="myDropdown"
          name="selectedOption"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Packed">Packed</option>
          <option value="In Transit">In Transit</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          className="FilterBarPaymentMethods"
          id="myDropdown"
          name="selectedOption"
        >
          <option value="LastSevenDays">Today</option>
          <option value="LastThirtyDays">Last 7 Days</option>
          <option value="LastThirtyDays">Last 30 Days</option>
        </select>

        {/* <div className="FilterBarFilter">
          <i class="fa-solid fa-filter"></i>
        </div>
        <div className="FilterBarDownload">
          <i class="fa-solid fa-download"></i>
        </div> */}
      </div>

      {/* Data Table Container */}
      <div className="OrdersTableContainer">
        {/* Download Option */}
        {showSelectedHeader && (
          <div className="SelectedHeaderBar">
            <span className="selection-count">
              <span className="selected-number">{selectedOrderIds.length}</span>{" "}
              selected
            </span>
            <button className="header-button">
              <i className="fa-solid fa-print"></i> Print Invoices
            </button>
            <button className="header-button">
              <i className="fa-solid fa-truck"></i> Mark as Shipped
            </button>
            <button
              className="header-button"
              onClick={() =>
                exportJsonToExcel(selectedOrders, "selectedOrdersData")
              }
            >
              <i className="fa-solid fa-download"></i> Export Selected
            </button>
          </div>
        )}

        {/* Data Table */}
        <table className="OrdersTable">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                ></input>
              </th>
              <th>ORDER ID</th>
              <th>DATE & TIME</th>
              <th>CUSTOMER</th>
              <th>ITEMS</th>
              <th>TOTAL</th>
              <th>PAYMENT</th>
              <th>STATUS</th>
              <th>FULFILLMENT</th>
              <th>CHANNEL</th>
              <th>SLA</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {visibleOrders.map((order, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    id={`checkbox-${order.orderId}`}
                    className="InputBox"
                    // The state tracks whether this box should be checked
                    checked={isSelected(order.orderId)}
                    //  Handle the click event to update the state
                    onChange={() => handleCheckboxChange(order.orderId)}
                  ></input>
                </td>
                <td className="blue-link" onClick={() => openViewPopup(order)}>
                  {order.orderId}
                </td>
                <td>{order.date}</td>
                <td>{order.customer}</td>
                <td>{order.items}</td>
                <td className="bold">{order.total}</td>

                {/* PAYMENT BADGE */}
                <td>
                  <span
                    className={`badge payment ${
                      order.payment === "Paid" ? "green" : "blue"
                    }`}
                  >
                    {order.payment}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge status ${
                      order.status === "accepted"
                        ? "green"
                        : order.status === "rejected"
                        ? "red"
                        : "orange"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* FULFILLMENT BADGE */}
                <td>
                  <span className={`badge fulfillment purple`}>
                    {order.fulfillment}
                  </span>
                </td>

                <td>{order.channel}</td>
                <td className="green-text">{order.sla}</td>

                <td style={{ paddingLeft: "15px" }}>
                  <button
                    className="edit"
                    onClick={() => handleEditOrder(order)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>

                  {/* <button
                      className="delete"
                      onClick={() => handleRemoveItem(order.orderId)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION SECTION */}
        <div className="pagination footer-pagination">
          <span className="showing-info">
            Showing {startIndex + 1}-
            {Math.min(startIndex + ordersPerPage, totalOrders)} of {totalOrders}
          </span>

          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {totalPages > 0 &&
            [...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const isFirst = page === 1;
              const isLast = page === totalPages;
              const isCurrent = page === currentPage;
              // Pages to display: First page, Last page, and pages within 1 of current page
              const isNearCurrent =
                page >= currentPage - 1 && page <= currentPage + 1;

              // Only display page 1, the last page, or pages near the current page
              if (isFirst || isLast || isCurrent || isNearCurrent) {
                // If it's the first page or the last page, and it's far from the current page,
                // we need to check if an ellipsis should precede it.
                if (isFirst && currentPage > 3) {
                  return (
                    <>
                      {/* Always show Page 1 */}
                      <button
                        key={1}
                        className={`page-number ${
                          currentPage === 1 ? "active" : ""
                        }`}
                        onClick={() => setCurrentPage(1)}
                      >
                        1
                      </button>
                      {/* Show leading ellipsis */}
                      <span key="start-ellipsis" className="ellipsis">
                        ...
                      </span>
                    </>
                  );
                }

                if (isLast && currentPage < totalPages - 2) {
                  // Show trailing ellipsis before the last page
                  return (
                    <>
                      <span key="end-ellipsis" className="ellipsis">
                        ...
                      </span>
                      <button
                        key={totalPages}
                        className={`page-number ${isCurrent ? "active" : ""}`}
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </button>
                    </>
                  );
                }

                // Skip rendering pages if they are not near the current page and are not 1 or totalPages
                if (!isNearCurrent && !isFirst && !isLast) {
                  return null;
                }

                // Render the page button
                return (
                  <button
                    key={page}
                    className={`page-number ${isCurrent ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              }
              return null; // Don't render pages outside the desired range
            })}

          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
