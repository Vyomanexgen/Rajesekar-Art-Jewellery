import React, { useState } from "react";
import "./ShipmentsComponents.css";

const DeliveryZones = ({ zones, setZones }) => {
  const [search, setSearch] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    zoneName: "",
    locations: "",
    deliveryTime: "",
    shippingCost: "",
    codAvailable: "Yes",
    partners: "",
  });

  const openAddPopup = () => {
    setEditIndex(null);
    setFormData({
      zoneName: "",
      locations: "",
      deliveryTime: "",
      shippingCost: "",
      codAvailable: "Yes",
      partners: "",
    });
    setPopupVisible(true);
  };

  const openEdit = (index) => {
    setEditIndex(index);
    setFormData(zones[index]);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updated = [...zones];
      updated[editIndex] = formData;
      setZones(updated);
    } else {
      setZones([...zones, formData]);
    }
    closePopup();
  };

  const deleteZone = (index) => {
    const updated = zones.filter((_, i) => i !== index);
    setZones(updated);
  };

  const filteredZones = zones.filter((z) =>
    z.zoneName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="deliveryzones-container">
      {/* Top Control Bar */}
      <div className="zone-header">
        <input
          type="text"
          placeholder="Search zones..."
          className="zone-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-zone-btn" onClick={openAddPopup}>
          + Add Zone
        </button>
      </div>

      {/* Zone List */}
      {filteredZones.map((zone, index) => (
        <div className="zone-card" key={index}>
          <div className="zone-left">
            <h3 className="zone-title">{zone.zoneName}</h3>
            <p className="zone-location">📍 {zone.locations}</p>

            <div className="zone-row">
              <p>
                <strong>Delivery Time</strong>
                <br />
                {zone.deliveryTime}
              </p>
              <p>
                <strong>Shipping Cost</strong>
                <br />₹{zone.shippingCost}
              </p>
              <p>
                <strong>COD Available</strong>
                <br />
                <span className={zone.codAvailable === "Yes" ? "yes" : "no"}>
                  {zone.codAvailable}
                </span>
              </p>
              <p>
                <strong>Partners</strong>
                <br />
                {zone.partners} active
              </p>
            </div>
          </div>

          {/* Edit / Delete Buttons */}
          <div className="zone-actions">
            <button className="zone-edit-btn" onClick={() => openEdit(index)}>
              ✏ Edit
            </button>
            <button
              className="zone-delete-btn"
              onClick={() => deleteZone(index)}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}

      {/* Popup */}
      {popupVisible && (
        <>
          <div className="overlay" onClick={closePopup}></div>
          <div className="zone-popup">
            <h3>{editIndex !== null ? "Edit Zone" : "Add Zone"}</h3>

            <input
              placeholder="Zone Name"
              value={formData.zoneName}
              onChange={(e) =>
                setFormData({ ...formData, zoneName: e.target.value })
              }
            />

            <textarea
              placeholder="Locations (comma separated)"
              value={formData.locations}
              onChange={(e) =>
                setFormData({ ...formData, locations: e.target.value })
              }
            />

            <input
              placeholder="Delivery Time"
              value={formData.deliveryTime}
              onChange={(e) =>
                setFormData({ ...formData, deliveryTime: e.target.value })
              }
            />

            <input
              placeholder="Shipping Cost"
              value={formData.shippingCost}
              onChange={(e) =>
                setFormData({ ...formData, shippingCost: e.target.value })
              }
            />

            <select
              value={formData.codAvailable}
              onChange={(e) =>
                setFormData({ ...formData, codAvailable: e.target.value })
              }
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <input
              placeholder="No. of Active Partners"
              value={formData.partners}
              onChange={(e) =>
                setFormData({ ...formData, partners: e.target.value })
              }
            />

            <button className="submit-zone-btn" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeliveryZones;
