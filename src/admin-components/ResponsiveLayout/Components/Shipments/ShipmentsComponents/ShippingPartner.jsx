import React, { useState } from "react";
import "./ShipmentsComponents.css";

const ShippingPartner = ({ partnersData, setPartnersData, onViewTracking }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    deliveryType: "",
    baseRate: "",
    totalShipments: "",
    successRate: "",
    regions: "",
    deliveryTime: "",
  });

  const filteredPartnersData = partnersData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddPopup = () => {
    setEditIndex(null);
    setFormData({
      name: "",
      deliveryType: "",
      baseRate: "",
      totalShipments: "",
      successRate: "",
      regions: "",
      deliveryTime: "",
    });
    setPopupVisible(true);
  };

  const openEditPopup = (index) => {
    setEditIndex(index);
    setFormData(partnersData[index]);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updated = [...partnersData];
      updated[editIndex] = formData;
      setPartnersData(updated);
    } else {
      setPartnersData([...partnersData, formData]);
    }
    closePopup();
  };

  const toggleStatus = (index) => {
    const updated = [...partnersData];
    updated[index].status =
      updated[index].status === "active" ? "inactive" : "active";
    setPartnersData(updated);
  };

  return (
    <div className="partners-container">
      {/* HEADER */}
      <div className="partner-header">
        <input
          type="text"
          placeholder="Search partners..."
          className="partner-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="add-btn" onClick={openAddPopup}>
          + Add Partner
        </button>
      </div>

      {/* PARTNER ROWS */}
      {filteredPartnersData.map((item, index) => (
        <div className="partner-row" key={index}>
          <div className="partner-left">
            <img src={item.image} alt="logo" className="partner-img" />

            <div className="partner-info">
              <div className="partner-title">
                <strong>{item.name}</strong>
                <p className={`${item.status}`}>{item.status}</p>
                {/* <span className={`status-badge ${item.status}`}>
                  {item.status}
                </span> */}
              </div>

              <p>{item.deliveryType}</p>
              <p className="small-text">{item.deliveryTime}</p>

              <div className="partner-actions">
                <button
                  className="action-btn"
                  onClick={() => toggleStatus(index)}
                >
                  {item.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  className="action-btn edit"
                  onClick={() => openEditPopup(index)}
                >
                  Edit
                </button>
                <button
                  className="action-btn view"
                  onClick={() => onViewTracking && onViewTracking(item.name)}
                >
                  View Tracking
                </button>
              </div>
            </div>
          </div>

          <div className="partner-stats">
            <p>
              <strong>₹{item.baseRate}</strong>
              <br />
              Base Rate
            </p>
            <p>
              <strong>{item.totalShipments}</strong>
              <br />
              Shipments
            </p>
            <p className={item.successRate < 95 ? "warn" : "success"}>
              <strong>{item.successRate}%</strong>
              <br />
              Success Rate
            </p>
            <p>
              <strong>{item.regions} zones</strong>
              <br />
              Regions
            </p>
          </div>
        </div>
      ))}

      {/* POPUP */}
      {popupVisible && (
        <>
          <div className="overlay" onClick={closePopup}></div>

          <div className="popup">
            <h3>{editIndex !== null ? "Edit Partner" : "Add Partner"}</h3>

            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              placeholder="Delivery Type"
              value={formData.deliveryType}
              onChange={(e) =>
                setFormData({ ...formData, deliveryType: e.target.value })
              }
            />

            <input
              placeholder="Base Rate"
              value={formData.baseRate}
              onChange={(e) =>
                setFormData({ ...formData, baseRate: e.target.value })
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
              placeholder="Total Shipments"
              value={formData.totalShipments}
              onChange={(e) =>
                setFormData({ ...formData, totalShipments: e.target.value })
              }
            />

            <input
              placeholder="Success Rate"
              value={formData.successRate}
              onChange={(e) =>
                setFormData({ ...formData, successRate: e.target.value })
              }
            />

            <input
              placeholder="Regions"
              value={formData.regions}
              onChange={(e) =>
                setFormData({ ...formData, regions: e.target.value })
              }
            />

            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShippingPartner;
