import { useState } from "react";

import exportJsonToExcel from "./../../../ExportExcelToJson";
import InventoryContainerHeader from "./InventoryComponents/InventoryContainerHeader";
import "./Inventory.css";
import AnalyticComponent from "./InventoryComponents/AnalyticComponent";
import InventoryPopup from "./InventoryComponents/InventoryPopup";
import productsData from "../Products/productsData";

function Inventory() {
  const inventoryItems = productsData.map((product) => ({
    sku: product.sku,
    product: product.name,
    warehouse: "Mumbai Main", // Default value
    onHand: product.stock,
    available: product.stock,
    reserved: 0, // Default
    incoming: 0, // Default
    reorderPoint: 10, // Default
  }));

  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSkus, setSelectedSkus] = useState(new Set());
  const [inventoryData, setInventoryData] = useState(inventoryItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState("add"); // add | edit
  const [editData, setEditData] = useState(null);

  const filteredProducts = inventoryData.filter((inventory) => {
    const matchesSearch =
      inventory.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inventory.product.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesWarehouse =
      warehouseFilter === "All" || inventory.warehouse === warehouseFilter;

    // const matchesStatus =
    //   statusFilter === "All" || order.fulfillment === statusFilter;

    let matchesStock = true;
    const stock = inventory.available;

    if (stockFilter !== "All") {
      if (stockFilter === "Out of Stock") {
        matchesStock = stock === 0;
      } else if (stockFilter === "Low Stock") {
        matchesStock = stock > 0 && stock < 10;
      } else if (stockFilter === "In Stock") {
        matchesStock = stock >= 10;
      }
    }

    return matchesSearch && matchesStock && matchesWarehouse;
  });

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Use the sample data for display.
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Helper function to determine 'ON HAND' stock color
  const getStockColorClass = (onHand, reorderPoint) => {
    if (onHand === 0) return "stock-critical"; // Red if 0
    if (onHand <= reorderPoint) return "stock-low"; // Orange/Yellow if <= reorder point
    return "stock-safe"; // Green if > reorder point
  };

  // Helper function to format Incoming value with a '+' sign
  const formatIncoming = (incoming) => {
    return incoming > 0 ? `+${incoming}` : `+${incoming}`;
  };

  // --- HELPER FUNCTIONS ---

  {
    /* Analytic Component Data */
  }
  // const totalIncomingStock = filteredProducts.reduce((total, item) => {
  //   return total + item.incoming;
  // }, 0);

  // const outOfStock = filteredProducts.reduce((count, item) => {
  //   if (item.available === 0) {
  //     return count + 1; // Increment count if condition is met
  //   }
  //   return count;
  // }, 0);

  // const lowStock = filteredProducts.reduce((count, item) => {
  //   if (item.available > 0 && item.available < 10) {
  //     return count + 1;
  //   }
  //   return count;
  // }, 0);

  // Checks if a given SKU is in the selectedSkus set
  const isSelected = (sku) => selectedSkus.has(sku);

  // Checks if ALL visible products are selected
  const isAllSelected = filteredProducts.every((item) =>
    selectedSkus.has(item.sku)
  );

  // --- HANDLER FUNCTIONS ---

  /**
   * 2. Handles individual checkbox clicks (in <td>)
   * @param {string} sku The SKU of the product to select/deselect
   */
  const handleCheckboxChange = (sku) => {
    setSelectedSkus((prevSkus) => {
      const newSkus = new Set(prevSkus);
      if (newSkus.has(sku)) {
        newSkus.delete(sku); // Deselect
      } else {
        newSkus.add(sku); // Select
      }
      return newSkus;
    });
  };

  /* 3. Handles the "Select All" checkbox click (in <th>) */
  const handleSelectAll = () => {
    // const allVisibleSkus = new Set(inventoryItems.map((item) => item.sku));
    const allVisibleSkus = new Set(filteredProducts.map((item) => item.sku));

    setSelectedSkus((prevSkus) => {
      const newSkus = new Set(prevSkus);

      if (isAllSelected) {
        // Deselect all visible products
        allVisibleSkus.forEach((sku) => newSkus.delete(sku));
      } else {
        // Select all visible products
        allVisibleSkus.forEach((sku) => newSkus.add(sku));
      }
      return newSkus;
    });
  };

  // --- CALCULATE SELECTED DATA ---

  // 4. Get the full product objects for all selected SKUs
  const selectedInventories = inventoryData.filter((p) =>
    selectedSkus.has(p.sku)
  );

  // const handleRemoveItem = (skuToRemove) => {

  //   const updatedInventory = inventoryData.filter(
  //     (item) => item.sku !== skuToRemove
  //   );
  //   setInventoryData(updatedInventory);


  //   setSelectedSkus((prevSkus) => {
  //     const newSkus = new Set(prevSkus);
  //     newSkus.delete(skuToRemove);
  //     return newSkus;
  //   });
  // };

  const showSelectedHeader = selectedInventories.length > 0;

  const handleAddOrEdit = (formData) => {
    if (popupMode === "add") {
      setInventoryData((prev) => [...prev, formData]);
    } else {
      // Edit mode
      const updated = inventoryData.map((item) =>
        item.sku === formData.sku ? formData : item
      );
      setInventoryData(updated);
    }
  };

  return (
    <div className="InventoryContainer">
      {isPopupOpen && (
        <InventoryPopup
          mode={popupMode}
          data={editData}
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleAddOrEdit}
        />
      )}

      <div className="MainDashboardHeaderContainer">
        <div className="MainDashboardHeaderTextSection">
          <h2 className="MainDashboardHeaderTitle">Inventory Management</h2>
          <p className="MainDashboardHeaderSubtitle">
            Track and manage stock across warehouses
          </p>
        </div>
        <div className="ProductsHeaderControls">
          <button
            className="ProductsHeaderExport"
            onClick={() => {
              setPopupMode("add");
              setEditData(null);
              setIsPopupOpen(true);
            }}
          >
            Add Inventories
          </button>
        </div>
      </div>
      {/* <InventoryContainerHeader /> */}

      {/* <div className="InventoryContainerAnalytics">
        <AnalyticComponent
          icon="box"
          title="Total SKUs"
          value={inventoryItems.length}
        />
        <AnalyticComponent
          icon="arrow-trend-down"
          title="Low Stock Alerts"
          value={lowStock}
        />
        <AnalyticComponent
          icon="box-open"
          title="Out of Stock"
          value={outOfStock}
        />
        <AnalyticComponent
          icon="circle-down"
          title="Incoming Stock"
          value={` ${totalIncomingStock} units `}
        />
      </div> */}

      <div className="InventoryFilterBarContainer">
        <input
          type="text"
          placeholder=" 🔍 Search by SKU or Product Name... "
          className="InventoryFilterBarSearch"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="FilterBarPaymentMethods"
          id="myDropdown"
          name="selectedOption"
          value={warehouseFilter}
          onChange={(e) => setWarehouseFilter(e.target.value)}
        >
          <option value="All">All Warehouses</option>
          <option value="Mumbai Main">Mumbai Main</option>
          <option value="Delhi Hub">Delhi Hub</option>
          <option value="Banglore Hub">Banglore Hub</option>
        </select>

        <select
          className="FilterBarPaymentMethods"
          id="myDropdown"
          name="selectedOption"
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >
          <option value="All">All Stock</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        {/* <div className="FilterBarFilter">
          <i class="fa-solid fa-filter"></i>
        </div>
        <div className="FilterBarDownload">
          <i class="fa-solid fa-download"></i>
        </div> */}
      </div>

      {/* <InventoryTable /> */}
      <div className="InventoryTableContainer">
        {showSelectedHeader && (
          <div className="SelectedHeaderBar">
            <span className="selection-count">
              <span className="selected-number">
                {selectedInventories.length}
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
                exportJsonToExcel(
                  selectedInventories,
                  "selectedInventoriesData"
                )
              }
            >
              <i className="fa-solid fa-download"></i> Export Selected
            </button>
            {/* <ExcelExportButton jsonData={selectedOrders} fileName="OrdersData" /> */}
          </div>
        )}

        <table className="InventoryTable">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  // 🟢 Use the isAllSelected helper function
                  checked={isAllSelected}
                  // 🟢 Use the handleSelectAll function
                  onChange={handleSelectAll}
                />
              </th>
              <th>SKU</th>
              <th>PRODUCT</th>
              <th>WAREHOUSE</th>
              <th>ON HAND</th>
              <th>AVAILABLE</th>
              <th>RESERVED</th>
              <th>INCOMING</th>
              <th>REORDER POINT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {visibleItems.map((item) => (
              <tr key={item.sku}>
                <td>
                  <input
                    type="checkbox"
                    id={`checkbox-${item.sku}`} // Use item.sku instead of products.sku
                    className="InputBox"
                    // 🟢 The state tracks whether this box should be checked
                    checked={isSelected(item.sku)}
                    // 🟢 Handle the click event to update the state
                    onChange={() => handleCheckboxChange(item.sku)} // Pass item.sku
                  />
                </td>
                <td className="sku-cell">
                  <span className="sku-link">{item.sku}</span>
                </td>
                <td className="product-cell">{item.product}</td>
                <td className="warehouse-cell">{item.warehouse}</td>

                {/* ON HAND (Conditional Styling) */}
                <td
                  className={`number-cell bold ${getStockColorClass(
                    item.onHand,
                    item.reorderPoint
                  )}`}
                >
                  {item.onHand}
                </td>

                <td className="number-cell">{item.available}</td>
                <td className="number-cell">{item.reserved}</td>

                {/* INCOMING (Green Text and Plus Sign) */}
                <td className="incoming-cell bold">
                  <span className="incoming-text">
                    {formatIncoming(item.incoming)}
                  </span>
                </td>

                <td className="number-cell">{item.reorderPoint}</td>

                {/* ACTIONS */}
                {/* <td className="actions-cell">
                  <button className="action-btn add-btn">
                    <i className="fa-solid fa-plus"></i> Add
                  </button>
                  <button
                    className="action-btn remove-btn"
                    onClick={() => handleRemoveItem(item.sku)}
                  >
                    <i className="fa-solid fa-minus"></i> Remove
                  </button>
                </td> */}

                <td className="actions-cell">
                  <button
                    className="edit"
                    onClick={() => {
                      setPopupMode("edit");
                      setEditData(item);
                      setIsPopupOpen(true);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  {/* <button
                    className="delete"
                    onClick={() => handleRemoveItem(item.sku)}
                  >
                    <i className="fa-solid fa-trash-can"></i> 
                   </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination footer-pagination">
          <span className="showing-info">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
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
    </div>
  );
}

export default Inventory;
