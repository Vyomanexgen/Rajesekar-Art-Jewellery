import "./Coupons.css";
import CouponStatCard from "./CouponsComponents/CouponStatCard";
import CouponModal from "./CouponsComponents/CouponModal";
import { useState } from "react";

function Coupons() {
  const statsData = [
    { label: "Total Coupons", value: "3" },
    { label: "Active", value: "3", valueColor: "green" },
    { label: "Total Usage", value: "2839" },
    { label: "Avg Discount", value: "40%", valueColor: "orange" },
  ];

  const couponsData = [
    {
      code: "DIWALI40",
      description: "Diwali Special - 40% Off",
      discount: "40%",
      conditions: { min: "₹2000", max: "₹2000" },
      usage: { used: 342, limit: 1000 },
      validUntil: "2024-11-05",
      status: "active",
    },
    {
      code: "WELCOME500",
      description: "New Customer Discount",
      discount: "₹500",
      conditions: { min: "₹3000" },
      usage: { used: 156, limit: 500 },
      validUntil: "2024-12-31",
      status: "active",
    },
  ];

  const [data, setData] = useState(couponsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editCoupon, setEditCoupon] = useState(null);

  const filteredCoupons = data.filter((item) =>
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteData = (code) => {
    setData((prev) => prev.filter((item) => item.code !== code));
  };

  const handleAdd = () => {
    setEditCoupon(null);
    setShowModal(true);
  };

  const handleEdit = (coupon) => {
    setEditCoupon(coupon);
    setShowModal(true);
  };

  const handleSave = (coupon) => {
    if (editCoupon) {
      // EDIT
      setData((prev) =>
        prev.map((item) => (item.code === editCoupon.code ? coupon : item))
      );
    } else {
      // ADD
      setData((prev) => [...prev, coupon]);
    }
    setShowModal(false);
  };

  return (
    <div className="CouponsContainer">
      <div className="MainDashboardHeaderContainer">
        <div className="MainDashboardHeaderTextSection">
          <h2 className="MainDashboardHeaderTitle">Coupons</h2>
          <p className="MainDashboardHeaderSubtitle">
            Comprehensive business intelligence and Coupons Card
          </p>
        </div>

        <div className="MainDashboardHeaderControls">
          <button className="MainDashboardHeaderExport" onClick={handleAdd}>
            Add Coupon
          </button>
          {/* <i class="fa-solid fa-download"></i> */}
        </div>
      </div>

      <div className="coupon-stat-container">
        {statsData.map((stat, index) => (
          <CouponStatCard key={index} {...stat} />
        ))}
      </div>

      {/* Search + Add */}
      <div className="CouponHeader">
        <input
          type="text"
          placeholder=" 🔍 Search Coupons..."
          className="CouponSearchBar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="CouponTableContainer">
        <table className="CouponTable">
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Discount</th>
              <th>Conditions</th>
              <th>Usage</th>
              <th>Valid Until</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCoupons.map((item, index) => (
              <tr key={index}>
                <td className="coupon-code">{item.code}</td>
                <td>{item.description}</td>
                <td className="highlight">{item.discount}</td>

                <td>
                  <p>Min: {item.conditions.min}</p>
                  {item.conditions.max && <p>Max: {item.conditions.max}</p>}
                </td>

                <td>
                  {item.usage.used} / {item.usage.limit}
                </td>

                <td>{item.validUntil}</td>

                <td>
                  <span className={`status ${item.status}`}>{item.status}</span>
                </td>

                <td className="actions-cell">
                  <button className="edit" onClick={() => handleEdit(item)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDeleteData(item.code)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <CouponModal
          initialData={editCoupon}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Coupons;
