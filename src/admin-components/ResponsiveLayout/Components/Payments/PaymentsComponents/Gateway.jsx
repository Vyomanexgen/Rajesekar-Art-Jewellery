import React, { useState } from "react";
import "./PaymentsComponents.css";

const GatewayModal = ({ closeModal, onSubmit, existing }) => {
  const [form, setForm] = useState(
    existing || {
      name: "",
      method: "",
      transactionFee: "",
      settlement: "",
      successRate: "",
      merchantId: "",
      transactions: 0,
      logo: "",
      isActive: false,
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="pg-overlay">
      <div className="pg-modal">
        <h2>{existing ? "Edit Gateway" : "Add Gateway"}</h2>

        <div className="pg-modal-body">
          {Object.keys(form).map(
            (field) =>
              field !== "isActive" &&
              field !== "id" && (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={form[field]}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  onChange={handleChange}
                />
              )
          )}
        </div>

        <div className="pg-modal-footer">
          <button className="pg-btn cancel" onClick={closeModal}>
            Cancel
          </button>
          <button className="pg-btn save" onClick={() => onSubmit(form)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GatewayModal;
