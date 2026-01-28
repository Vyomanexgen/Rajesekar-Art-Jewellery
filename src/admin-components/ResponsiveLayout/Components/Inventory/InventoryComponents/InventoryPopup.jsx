// InventoryPopup.js
import React, { useState, useEffect } from "react";
import "./InventoryComponents.css";

function InventoryPopup({ mode, data, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    sku: "",
    product: "",
    warehouse: "",
    onHand: "",
    available: "",
    reserved: "",
    incoming: "",
    reorderPoint: "",
  });

  // Load selected item data when editing
  useEffect(() => {
    if (mode === "edit" && data) {
      setFormData(data);
    }
  }, [mode, data]);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <>
      <div className="popup-overlay" onClick={onClose}></div>

      <div className="inventory-popup">
        <h2 className="popup-title">
          {mode === "edit" ? "Edit Inventory" : "Add New Inventory"}
        </h2>

        <div className="popup-grid">
          <div className="popup-field">
            <label>SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              disabled={mode === "edit"} // SKU should not change in edit
            />
          </div>

          <div className="popup-field">
            <label>Product Name</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
            />
          </div>

          <div className="popup-field">
            <label>Warehouse</label>
            <select
              name="warehouse"
              value={formData.warehouse}
              onChange={handleChange}
            >
              <option value="Mumbai Main">Mumbai Main</option>
              <option value="Delhi Hub">Delhi Hub</option>
              <option value="Bangalore Hub">Bangalore Hub</option>
            </select>
          </div>

          <div className="popup-field">
            <label>On Hand</label>
            <input
              type="number"
              name="onHand"
              value={formData.onHand}
              onChange={handleChange}
            />
          </div>

          <div className="popup-field">
            <label>Available</label>
            <input
              type="number"
              name="available"
              value={formData.available}
              onChange={handleChange}
            />
          </div>

          <div className="popup-field">
            <label>Reserved</label>
            <input
              type="number"
              name="reserved"
              value={formData.reserved}
              onChange={handleChange}
            />
          </div>

          <div className="popup-field">
            <label>Incoming</label>
            <input
              type="number"
              name="incoming"
              value={formData.incoming}
              onChange={handleChange}
            />
          </div>

          <div className="popup-field">
            <label>Reorder Point</label>
            <input
              type="number"
              name="reorderPoint"
              value={formData.reorderPoint}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="popup-actions">
          <button className="popup-cancel" onClick={onClose}>
            Close
          </button>
          <button className="popup-save" onClick={handleSubmit}>
            {mode === "edit" ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </>
  );
}

export default InventoryPopup;
