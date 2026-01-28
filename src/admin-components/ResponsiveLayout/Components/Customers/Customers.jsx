import "./Customers.css";
import exportJsonToExcel from "../../../ExportExcelToJson";
import { db } from "../../../FirebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { useState } from "react";

function Customers() {

  const getCustomers = async () => {
    const alldata = await getDocs(collection(db, "customers"));

    const allcustomers = alldata.docs.map((data) => ({
      id: data.customer_id,
    }));

    console.log(allcustomers);

  };

  getCustomers();

  const customersData = [
    {
      customerId: "CUST-1001",
      customerName: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 43210",
      orders: 12,
      ltv: "₹45,680",
      segment: "VIP",
      lastSeen: "2 hours ago",
      riskFlags: "None",
    },
    {
      customerId: "CUST-1002",
      customerName: "Rahul Kumar",
      email: "rahul.k@example.com",
      phone: "+91 98765 43211",
      orders: 3,
      ltv: "₹8,950",
      segment: "Regular",
      lastSeen: "1 day ago",
      riskFlags: "COD-Only",
    },
    {
      customerId: "CUST-1003",
      customerName: "Anjali Verma",
      email: "anjali.v@example.com",
      phone: "+91 98765 43212",
      orders: 18,
      ltv: "₹67,200",
      segment: "VIP",
      lastSeen: "3 hours ago",
      riskFlags: "None",
    },
    {
      customerId: "CUST-1004",
      customerName: "Vikram Singh",
      email: "vikram.singh@example.com",
      phone: "+91 98765 43213",
      orders: 5,
      ltv: "₹15,420",
      segment: "Regular",
      lastSeen: "2 days ago",
      riskFlags: "None",
    },
    {
      customerId: "CUST-1005",
      customerName: "Meera Patel",
      email: "meera.patel@example.com",
      phone: "+91 98765 43214",
      orders: 1,
      ltv: "₹2,499",
      segment: "New",
      lastSeen: "5 days ago",
      riskFlags: "High RTO",
    },
    {
      customerId: "CUST-1006",
      customerName: "Arjun Reddy",
      email: "arjun.reddy@example.com",
      phone: "+91 98765 43215",
      orders: 7,
      ltv: "₹28,350",
      segment: "Loyal",
      lastSeen: "1 hour ago",
      riskFlags: "None",
    },
    {
      customerId: "CUST-1007",
      customerName: "Sneha Gupta",
      email: "sneha.gupta@example.com",
      phone: "+91 98765 43216",
      orders: 22,
      ltv: "₹89,750",
      segment: "VIP",
      lastSeen: "30 mins ago",
      riskFlags: "None",
    },
    {
      customerId: "CUST-1008",
      customerName: "Karthik Menon",
      email: "karthik.m@example.com",
      phone: "+91 98765 43217",
      orders: 4,
      ltv: "₹12,680",
      segment: "Regular",
      lastSeen: "4 days ago",
      riskFlags: "COD-Only",
    },
  ];

  const [customers, setCustomers] = useState(customersData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  const customersPerPage = 5; // Showing 8 rows as seen in the image
  const [searchQuery, setSearchQuery] = useState("");
  // const [statusFilter, setStatusFilter] = useState("All");
  const [segmentsFilter, setSegmentsFilter] = useState("All");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      segmentsFilter === "All" || customer.segment === segmentsFilter;

    // const matchesStatus =
    //   statusFilter === "All" || product.status === statusFilter;

    // let matchesStock = true;
    // const stock = order.stock;

    // if (stockFilter !== "All") {
    //   if (stockFilter === "Out of Stock") {
    //     matchesStock = stock === 0;
    //   } else if (stockFilter === "Low Stock") {
    //     matchesStock = stock > 0 && stock < 10;
    //   } else if (stockFilter === "In Stock") {
    //     matchesStock = stock >= 10;
    //   }
    // }

    return matchesSearch && matchesCategory; //&& matchesStatus && matchesStock
  });

  const [currentPage, setCurrentPage] = useState(1);
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [searchQuery, segmentsFilter]);

  // Assuming a total of 3421 customers from the footer text "Showing 1-8 of 3,421 customers"
  const totalCustomers = filteredCustomers.length;
  const totalPages = Math.ceil(totalCustomers / customersPerPage);

  const [selectedIDs, setSelectedIDs] = useState(new Set());

  // Calculate visible rows for the current page (using the 8 sample customers for display)
  const startIndex = (currentPage - 1) * customersPerPage;
  // Use the sample data for demonstration. In a real app, you would fetch data for the current page.
  const visibleCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + customersPerPage
  );

  // --- HELPER FUNCTIONS ---

  // Checks if a given SKU is in the selectedSkus set
  const isSelected = (customerId) => selectedIDs.has(customerId);

  // Checks if ALL visible products are selected
  const isAllSelected = visibleCustomers.every((item) =>
    selectedIDs.has(item.customerId)
  );

  // --- HANDLER FUNCTIONS ---

  /**
   * 2. Handles individual checkbox clicks (in <td>)
   * @param {string} sku The SKU of the product to select/deselect
   */
  const handleCheckboxChange = (customerId) => {
    setSelectedIDs((prevCustomerId) => {
      const newCustomers = new Set(prevCustomerId);
      if (newCustomers.has(customerId)) {
        newCustomers.delete(customerId); // Deselect
      } else {
        newCustomers.add(customerId); // Select
      }
      return newCustomers;
    });
  };

  /* 3. Handles the "Select All" checkbox click (in <th>) */
  const handleSelectAll = () => {
    // ✅ FIX: Use the SKUs of the currently 'visible' (paginated) products
    const visibleCustomerData = filteredCustomers.map(
      (item) => item.customerId
    );

    setSelectedIDs((prevCustomerId) => {
      const newCustomers = new Set(prevCustomerId);

      if (isAllSelected) {
        // Deselect all visible products
        visibleCustomerData.forEach((customerId) =>
          newCustomers.delete(customerId)
        );
      } else {
        // Select all visible products
        visibleCustomerData.forEach((sku) => newCustomers.add(sku));
      }
      return newCustomers;
    });
  };

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

  const emptyCustomer = {
    customerName: "",
    email: "",
    phone: "",
    orders: "",
    ltv: "",
    segment: "VIP",
    lastSeen: "",
    riskFlags: "None",
  };

  const [newCustomer, setNewCustomer] = useState(emptyCustomer);
  const [showAddModal, setShowAddModal] = useState(false);

  // const handleAddCustomer = () => {
  //   const idNumber = 1000 + customers.length + 1; // auto-increment
  //   const customerId = `CUST-${idNumber}`;

  //   const customerToAdd = {
  //     customerId,
  //     ...newCustomer,
  //     orders: Number(newCustomer.orders) || 0,
  //     ltv: newCustomer.ltv || "₹0",
  //   };

  //   setCustomers((prev) => [...prev, customerToAdd]);
  //   setNewCustomer(emptyCustomer);
  //   setShowAddModal(false);
  // };

  // --- CALCULATE SELECTED DATA ---

  // 4. Get the full product objects for all selected SKUs

  const selectedCustomers = filteredCustomers.filter((p) =>
    selectedIDs.has(p.customerId)
  );

  const showSelectedHeader = selectedCustomers.length > 0;

  // ----- Edit & Delete Option ---------//

  const handleSaveCustomer = () => {
    if (isEditMode) {
      // UPDATE EXISTING CUSTOMER
      setCustomers((prev) =>
        prev.map((cust) =>
          cust.customerId === editingCustomerId
            ? {
              ...cust,
              ...newCustomer,
              orders: Number(newCustomer.orders) || 0,
              ltv: newCustomer.ltv || "₹0",
            }
            : cust
        )
      );
    } else {
      // ADD NEW CUSTOMER
      const idNumber = 1000 + customers.length + 1;
      const customerId = `CUST-${idNumber}`;

      setCustomers((prev) => [
        ...prev,
        {
          customerId,
          ...newCustomer,
          orders: Number(newCustomer.orders) || 0,
          ltv: newCustomer.ltv || "₹0",
        },
      ]);
    }

    // RESET
    setShowAddModal(false);
    setIsEditMode(false);
    setEditingCustomerId(null);
    setNewCustomer(emptyCustomer);
  };

  const handleEditCustomer = (customer) => {
    setIsEditMode(true);
    setEditingCustomerId(customer.customerId);
    setNewCustomer({
      customerName: customer.customerName,
      email: customer.email,
      phone: customer.phone,
      orders: customer.orders,
      ltv: customer.ltv,
      segment: customer.segment,
      lastSeen: customer.lastSeen,
      riskFlags: customer.riskFlags,
    });
    setShowAddModal(true);
  };

  const handleRemoveItem = (customerId) => {
    const updatedData = customers.filter(
      (customer) => customerId !== customer.customerId
    );

    setCustomers(updatedData);
  };

  return (
    <div className="CustomersContainer">
      {/* <CustomersContainerHeader customers={customers} /> */}
      <div className="MainDashboardHeaderContainer">
        <div className="MainDashboardHeaderTextSection">
          <h2 className="MainDashboardHeaderTitle">Customers</h2>
          <p className="MainDashboardHeaderSubtitle">
            Manage customer relationships and profiles
          </p>
        </div>

        <div className="MainDashboardHeaderControls">
          <button
            className="MainDashboardHeaderExport"
            // onClick={() => setShowAddModal(true)}
            onClick={() => {
              setIsEditMode(false);
              setNewCustomer(emptyCustomer);
              setShowAddModal(true);
            }}
          >
            + Add Customer
          </button>
        </div>
      </div>

      <div className="CustomersFilterBarContainer">
        <input
          type="text"
          placeholder=" 🔍 Search by Name , Email , Phone , Customer ID..."
          className="CustomersFilterBarSearch"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="CustomersFilterBarCustomerType"
          id="myDropdown"
          name="selectedOption"
          value={segmentsFilter}
          onChange={(e) => setSegmentsFilter(e.target.value)}
        // value={statusFilter}
        // onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Segments</option>
          <option value="VIP">VIP</option>
          <option value="Loyal">Loyal</option>
          <option value="Regular">Regular</option>
          <option value="New">New</option>
        </select>

        <select
          className="CustomersFilterBarCustomerActive"
          id="myDropdown"
          name="selectedOption"
        >
          <option value="LastSevenDays">All Status</option>
          <option value="LastThirtyDays">Active</option>
          <option value="LastThirtyDays">Inactive</option>
          <option value="LastThirtyDays">Blocked</option>
        </select>
      </div>
      {/* <CustomersFilterBar /> */}
      {/* <CustomersDataTable customers={customers} /> */}
      <div className="table-container">
        {showSelectedHeader && (
          <div className="SelectedHeaderBar">
            <span className="selection-count">
              <span className="selected-number">
                {selectedCustomers.length}
              </span>{" "}
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
                exportJsonToExcel(selectedCustomers, "selectedCustomersData")
              }
            >
              <i className="fa-solid fa-download"></i> Export Selected
            </button>
          </div>
        )}
        <table className="customers-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  // 🟢 Use the isAllSelected helper function
                  checked={isAllSelected}
                  // 🟢 Use the handleSelectAll function
                  onChange={handleSelectAll}
                // Add a visual cue if some but not all are selected (indeterminate state)
                ></input>
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
                  <input
                    type="checkbox"
                    className="InputBox"
                    // 🟢 The state tracks whether this box should be checked
                    checked={isSelected(customer.customerId)}
                    // 🟢 Handle the click event to update the state
                    onChange={() => handleCheckboxChange(customer.customerId)} // Pass item.sku
                  ></input>
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

                {/* <td className="Menu">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </td> */}
                <td
                  className="actions"
                  style={{
                    margin: "0px",
                    borderBottom: "0px",
                    padding: "0px",
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "10px",
                  }}
                >
                  <button
                    className="edit"
                    onClick={() => handleEditCustomer(customer)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleRemoveItem(customer.customerId)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* PAGINATION SECTION */}

        <div className="pagination footer-pagination">
          <span className="showing-info">
            Showing {startIndex + 1}-
            {Math.min(startIndex + customersPerPage, totalCustomers)} of{" "}
            {totalCustomers}
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
                        className={`page-number ${currentPage === 1 ? "active" : ""
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

        {/* <div className="pagination footer-pagination">
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
          </button> */}

        {/* Always show page 1 */}
        {/* {totalPages > 0 && (
            <button
              className={`page-number ${currentPage === 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
          )} */}

        {/* Show Ellipsis if current page is far from page 1 */}
        {/* {currentPage > 4 && totalPages > 5 && (
            <span className="ellipsis">...</span>
          )}

          {/* Display surrounding page numbers */}
        {/* Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (p) =>
                
                p >= currentPage - 2 &&
                p <= currentPage + 2 &&
                
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
            ))} */}

        {/* Show Ellipsis if current page is far from the last page */}
        {/* {currentPage < totalPages - 3 && totalPages > 5 && (
            <span className="ellipsis">...</span>
          )} */}

        {/* Always show the last page (only if totalPages > 1) */}
        {/* {totalPages > 1 && (
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
        </div>{" "} */}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            {/* <h2>Add New Customer</h2> */}
            <h2>{isEditMode ? "Edit Customer" : "Add New Customer"}</h2>

            <label>Name</label>
            <input
              type="text"
              value={newCustomer.customerName}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, customerName: e.target.value })
              }
            />

            <label>Email</label>
            <input
              type="email"
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
            />

            <label>Phone</label>
            <input
              type="text"
              value={newCustomer.phone}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
            />

            <label>Orders</label>
            <input
              type="number"
              value={newCustomer.orders}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, orders: e.target.value })
              }
            />

            <label>LTV</label>
            <input
              type="text"
              value={newCustomer.ltv}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, ltv: e.target.value })
              }
            />

            <label>Segment</label>
            <select
              value={newCustomer.segment}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, segment: e.target.value })
              }
            >
              <option value="VIP">VIP</option>
              <option value="Loyal">Loyal</option>
              <option value="Regular">Regular</option>
              <option value="New">New</option>
            </select>

            <label>Last Seen</label>
            <input
              type="text"
              value={newCustomer.lastSeen}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, lastSeen: e.target.value })
              }
            />

            <label>Risk Flags</label>
            <select
              value={newCustomer.riskFlags}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, riskFlags: e.target.value })
              }
            >
              <option value="None">None</option>
              <option value="High RTO">High RTO</option>
              <option value="COD-Only">COD-Only</option>
            </select>

            <div className="modal-btns">
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
              {/* <button onClick={handleAddCustomer}>Add Customer</button> */}
              <button onClick={handleSaveCustomer}>
                {isEditMode ? "Update Customer" : "Add Customer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;
