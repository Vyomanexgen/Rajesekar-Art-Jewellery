import StatCard from "./PricingAndDiscountsComponents/StatCard";
import "./PricingAndDiscounts.css";
import { useState } from "react";
import EditDiscountRuleModal from "./PricingAndDiscountsComponents/EditDiscountRuleModal";

function PricingAndDiscounts() {
  const [searchTerm, setSearchTerm] = useState("");

  const PricingData = [
    {
      id: 1,
      ruleName: "Diwali Mega Sale",
      targetAudience: "All",
      type: "Percentage",
      value: 25,
      conditionType: "Minimum Amount",
      conditionValue: 2000,
      conditionCurrency: "₹",
      validFromDate: "2024-10-20",
      validToDate: "2024-11-05",
      usageCount: 342,
      usageLimit: 1000,
      status: "Active",
      actions: { edit: true, delete: true },
    },
    {
      id: 2,
      ruleName: "Buy 3 Get 10% Off",
      targetAudience: "Earrings, Rings",
      type: "Bulk",
      value: 10,
      conditionType: "Minimum Quantity",
      conditionValue: 3,
      conditionCurrency: "",
      validFromDate: "2024-01-01",
      validToDate: "2024-12-31",
      usageCount: 156,
      usageLimit: null,
      status: "Active",
      actions: { edit: true, delete: true },
    },
    {
      id: 3,
      ruleName: "New Customer Discount",
      targetAudience: "All",
      type: "Flat",
      value: 500,
      conditionType: "Minimum Amount",
      conditionValue: 3000,
      conditionCurrency: "₹",
      validFromDate: "2024-01-01",
      validToDate: "2024-12-31",
      usageCount: 89,
      usageLimit: 500,
      status: "Active",
      actions: { edit: true, delete: true },
    },
    {
      id: 4,
      ruleName: "Summer Sale - Bangles",
      targetAudience: "Bangles",
      type: "Percentage",
      value: 15,
      conditionType: "None",
      conditionValue: null,
      conditionCurrency: "",
      validFromDate: "2024-03-01",
      validToDate: "2024-05-31",
      usageCount: 234,
      usageLimit: null,
      status: "Inactive",
      actions: { edit: true, delete: true },
    },

    /* ----------- New 16 Records ----------- */

    {
      id: 5,
      ruleName: "Wedding Special Offer",
      targetAudience: "Necklaces",
      type: "Percentage",
      value: 20,
      conditionType: "Minimum Amount",
      conditionValue: 10000,
      conditionCurrency: "₹",
      validFromDate: "2024-06-01",
      validToDate: "2024-09-30",
      usageCount: 78,
      usageLimit: 300,
      status: "Active",
      actions: { edit: true, delete: true },
    },
    {
      id: 6,
      ruleName: "Festive Flat ₹1000 Off",
      targetAudience: "All",
      type: "Flat",
      value: 1000,
      conditionType: "Minimum Amount",
      conditionValue: 8000,
      conditionCurrency: "₹",
      validFromDate: "2024-10-01",
      validToDate: "2024-10-31",
      usageCount: 190,
      usageLimit: 500,
      status: "Active",
      actions: { edit: true, delete: true },
    },
    {
      id: 7,
      ruleName: "Silver Jewellery Deal",
      targetAudience: "Silver",
      type: "Percentage",
      value: 12,
      conditionType: "None",
      conditionValue: null,
      conditionCurrency: "",
      validFromDate: "2024-02-01",
      validToDate: "2024-04-30",
      usageCount: 210,
      usageLimit: null,
      status: "Inactive",
      actions: { edit: true, delete: true },
    },
    {
      id: 8,
      ruleName: "Buy 2 Get 5% Off",
      targetAudience: "Bracelets",
      type: "Bulk",
      value: 5,
      conditionType: "Minimum Quantity",
      conditionValue: 2,
      conditionCurrency: "",
      validFromDate: "2024-01-15",
      validToDate: "2024-12-31",
      usageCount: 145,
      usageLimit: null,
      status: "Active",
      actions: { edit: true, delete: true },
    },
    {
      id: 9,
      ruleName: "VIP Customer Discount",
      targetAudience: "VIP Customers",
      type: "Percentage",
      value: 18,
      conditionType: "None",
      conditionValue: null,
      conditionCurrency: "",
      validFromDate: "2024-01-01",
      validToDate: "2024-12-31",
      usageCount: 67,
      usageLimit: null,
      status: "Active",
      actions: { edit: true, delete: true },
    },
    {
      id: 10,
      ruleName: "Monsoon Sale",
      targetAudience: "All",
      type: "Percentage",
      value: 10,
      conditionType: "Minimum Amount",
      conditionValue: 2500,
      conditionCurrency: "₹",
      validFromDate: "2024-07-01",
      validToDate: "2024-08-31",
      usageCount: 312,
      usageLimit: 800,
      status: "Inactive",
      actions: { edit: true, delete: true },
    },
    {
      id: 11,
      ruleName: "Kids Jewellery Offer",
      targetAudience: "Kids",
      type: "Flat",
      value: 300,
      conditionType: "Minimum Amount",
      conditionValue: 1500,
      conditionCurrency: "₹",
      validFromDate: "2024-04-01",
      validToDate: "2024-06-30",
      usageCount: 98,
      usageLimit: 400,
      status: "Active",
      actions: { edit: true, delete: true },
    },
    {
      id: 12,
      ruleName: "Clearance Sale",
      targetAudience: "Selected Items",
      type: "Percentage",
      value: 40,
      conditionType: "None",
      conditionValue: null,
      conditionCurrency: "",
      validFromDate: "2024-12-01",
      validToDate: "2024-12-31",
      usageCount: 54,
      usageLimit: 200,
      status: "Upcoming",
      actions: { edit: true, delete: true },
    },
    {
      id: 13,
      ruleName: "First App Purchase",
      targetAudience: "App Users",
      type: "Flat",
      value: 250,
      conditionType: "Minimum Amount",
      conditionValue: 2000,
      conditionCurrency: "₹",
      validFromDate: "2024-01-01",
      validToDate: "2024-12-31",
      usageCount: 133,
      usageLimit: 1000,
      status: "Active",
      actions: { edit: true, delete: true },
    },
    {
      id: 14,
      ruleName: "Gold Coin Offer",
      targetAudience: "Gold Coins",
      type: "Percentage",
      value: 5,
      conditionType: "Minimum Amount",
      conditionValue: 5000,
      conditionCurrency: "₹",
      validFromDate: "2024-05-01",
      validToDate: "2024-07-31",
      usageCount: 41,
      usageLimit: 150,
      status: "Inactive",
      actions: { edit: true, delete: true },
    },
    {
      id: 15,
      ruleName: "Birthday Special",
      targetAudience: "Registered Users",
      type: "Percentage",
      value: 20,
      conditionType: "None",
      conditionValue: null,
      conditionCurrency: "",
      validFromDate: "2024-01-01",
      validToDate: "2024-12-31",
      usageCount: 60,
      usageLimit: null,
      status: "Active",
      actions: { edit: true, delete: true },
    },
    {
      id: 16,
      ruleName: "Flash Sale",
      targetAudience: "All",
      type: "Percentage",
      value: 30,
      conditionType: "None",
      conditionValue: null,
      conditionCurrency: "",
      validFromDate: "2024-11-15",
      validToDate: "2024-11-16",
      usageCount: 420,
      usageLimit: 500,
      status: "Upcoming",
      actions: { edit: true, delete: true },
    },
    {
      id: 17,
      ruleName: "Buy 5 Get 15% Off",
      targetAudience: "All",
      type: "Bulk",
      value: 15,
      conditionType: "Minimum Quantity",
      conditionValue: 5,
      conditionCurrency: "",
      validFromDate: "2024-01-01",
      validToDate: "2024-12-31",
      usageCount: 88,
      usageLimit: null,
      status: "Active",
      actions: { edit: true, delete: true },
    },
    {
      id: 18,
      ruleName: "Online Exclusive",
      targetAudience: "Website Users",
      type: "Flat",
      value: 400,
      conditionType: "Minimum Amount",
      conditionValue: 3500,
      conditionCurrency: "₹",
      validFromDate: "2024-02-01",
      validToDate: "2024-12-31",
      usageCount: 176,
      usageLimit: 600,
      status: "Active",
      actions: { edit: true, delete: true },
    },
    {
      id: 19,
      ruleName: "Weekend Special",
      targetAudience: "All",
      type: "Percentage",
      value: 8,
      conditionType: "None",
      conditionValue: null,
      conditionCurrency: "",
      validFromDate: "2024-01-01",
      validToDate: "2024-12-31",
      usageCount: 260,
      usageLimit: null,
      status: "Active",
      actions: { edit: true, delete: true },
    },
    {
      id: 20,
      ruleName: "Loyalty Reward",
      targetAudience: "Repeat Customers",
      type: "Flat",
      value: 750,
      conditionType: "Minimum Amount",
      conditionValue: 6000,
      conditionCurrency: "₹",
      validFromDate: "2024-01-01",
      validToDate: "2024-12-31",
      usageCount: 92,
      usageLimit: 300,
      status: "Active",
      actions: { edit: true, delete: true },
    },
  ];

  const [data, setData] = useState(PricingData);
  const [showAddModal, setShowAddModal] = useState(false);

  const emptyNewRule = {
    id: null,
    ruleName: "",
    targetAudience: "",
    type: "Percentage",
    value: "",
    conditionType: "",
    conditionValue: "",
    conditionCurrency: "",
    validFromDate: "",
    validToDate: "",
    usageCount: 0,
    usageLimit: "",
    status: "Active",
    actions: { edit: true, delete: true },
  };

  const [newRule, setNewRule] = useState(emptyNewRule);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Pagination state
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleSave = (updated) => {
    setData((prev) =>
      prev.map((row) => (row.id === updated.id ? updated : row))
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteData = (id) => {
    const updatedData = data.filter((item) => id !== item.id);
    setData(updatedData);
  };

  const activeCategoriesLen = data.reduce(
    (count, item) =>
      count + (item.status && item.status.toLowerCase() === "active" ? 1 : 0),
    0
  );

  const activeUsage = data.reduce((count, item) => count + item.usageCount, 0);

  const filteredPricing = data.filter((item) =>
    (item.ruleName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredPricing.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePricing = filteredPricing.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAddRule = (e) => {
    e.preventDefault();

    const newEntry = {
      ...newRule,
      id: Date.now(), // unique id
      value: Number(newRule.value),
      conditionValue: Number(newRule.conditionValue),
      usageLimit: newRule.usageLimit ? Number(newRule.usageLimit) : null,
    };

    setData([...data, newEntry]);
    setShowAddModal(false);
  };

  return (
    <div className="PricingAndDiscountsContainer">
      <div className="MainDashboardHeaderContainer">
        <div className="MainDashboardHeaderTextSection">
          <h2 className="MainDashboardHeaderTitle">Pricing & Discounts</h2>
          <p className="MainDashboardHeaderSubtitle">
            Manage dynamic pricing, discount rules, and price history
          </p>
        </div>

        <div className="MainDashboardHeaderControls">
          <button
            className="MainDashboardHeaderExport"
            onClick={() => {
              setNewRule(emptyNewRule);
              setShowAddModal(true);
            }}
          >
            + Add Discount Rule
          </button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Rules" value={data.length} />
        <StatCard
          label="Active Rules"
          value={activeCategoriesLen}
          valueColor="green"
        />
        <StatCard label="Total Usage" value={activeUsage} />
        <StatCard label="Avg Discount" value={20.0} valueColor="red" />
      </div>

      <div className="BrandsSearchBarContainer">
        <input
          type="text"
          placeholder=" 🔍 Search Discount Rules..."
          className="BrandsSearchBar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="tablecontainer">
        <table>
          <thead>
            <tr>
              <th>Rule Name</th>
              <th>Type</th>
              <th>Value</th>
              <th>Conditions</th>
              <th>Valid Period</th>
              <th>Usage</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visiblePricing.length > 0 ? (
              visiblePricing.map((item) => (
                <tr key={item.id}>
                  <td className="rule-name-cell">
                    <span className="main-rule-name">{item.ruleName}</span>
                    <span className="rule-category">{item.targetAudience}</span>
                  </td>

                  <td className="type-cell">
                    <span className={`type-${item.type.toLowerCase()}`}>
                      {item.type}
                    </span>
                  </td>

                  <td className="value-cell">{item.value}%</td>

                  <td>
                    {item.conditionType}: {item.conditionCurrency}
                    {item.conditionValue}
                  </td>

                  <td>
                    <div>{item.validFromDate}</div>
                    <div>{item.validToDate}</div>
                  </td>

                  <td>
                    <span className="usage-used">{item.usageCount}</span>/
                    <span className="usage-total">{item.usageLimit}</span>
                  </td>

                  {/* <td className="status-cell">
                    <span
                      className={`status-badge status-${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td> */}
                  <td>
                    <p
                      className={`status-${item.status.toLowerCase()}`}
                      style={{
                        width: "70%",
                        display: "flex",
                        alignItems: "center",
                        padding: "0px 10px",
                      }}
                    >
                      {item.status}
                    </p>
                  </td>

                  <td className="actions-cell">
                    {item.actions.edit && (
                      <button className="edit" onClick={() => handleEdit(item)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    )}
                    {item.actions.delete && (
                      <button
                        className="delete"
                        onClick={() => handleDeleteData(item.id)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No results found...
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION SECTION */}
        <div className="pagination footer-pagination">
          <span className="showing-info">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredPricing.length)} of{" "}
            {filteredPricing.length}
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
      </div>

      {isEditModalOpen && (
        <EditDiscountRuleModal
          data={selectedItem}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">Add Discount Rule</h2>

            <form className="modal-form" onSubmit={handleAddRule}>
              <label>Rule Name</label>
              <input
                type="text"
                value={newRule.ruleName}
                onChange={(e) =>
                  setNewRule({ ...newRule, ruleName: e.target.value })
                }
                required
              />

              <label>Target Audience</label>
              <input
                type="text"
                value={newRule.targetAudience}
                onChange={(e) =>
                  setNewRule({ ...newRule, targetAudience: e.target.value })
                }
                required
              />

              <label>Type</label>
              <select
                value={newRule.type}
                onChange={(e) =>
                  setNewRule({ ...newRule, type: e.target.value })
                }
              >
                <option value="Percentage">Percentage</option>
                <option value="Flat">Flat</option>
                <option value="Bulk">Bulk</option>
              </select>

              <label>Value</label>
              <input
                type="number"
                value={newRule.value}
                onChange={(e) =>
                  setNewRule({ ...newRule, value: e.target.value })
                }
                required
              />

              <label>Condition Type</label>
              <input
                type="text"
                value={newRule.conditionType}
                onChange={(e) =>
                  setNewRule({ ...newRule, conditionType: e.target.value })
                }
              />

              <label>Condition Value</label>
              <input
                type="number"
                value={newRule.conditionValue}
                onChange={(e) =>
                  setNewRule({ ...newRule, conditionValue: e.target.value })
                }
              />

              <label>Condition Currency</label>
              <input
                type="text"
                value={newRule.conditionCurrency}
                onChange={(e) =>
                  setNewRule({ ...newRule, conditionCurrency: e.target.value })
                }
              />

              <label>Valid From</label>
              <input
                type="date"
                value={newRule.validFromDate}
                onChange={(e) =>
                  setNewRule({ ...newRule, validFromDate: e.target.value })
                }
                required
              />

              <label>Valid To</label>
              <input
                type="date"
                value={newRule.validToDate}
                onChange={(e) =>
                  setNewRule({ ...newRule, validToDate: e.target.value })
                }
                required
              />

              <label>Usage Limit</label>
              <input
                type="number"
                value={newRule.usageLimit}
                onChange={(e) =>
                  setNewRule({ ...newRule, usageLimit: e.target.value })
                }
              />

              <label>Status</label>
              <select
                value={newRule.status}
                onChange={(e) =>
                  setNewRule({ ...newRule, status: e.target.value })
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Add Rule
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PricingAndDiscounts;
