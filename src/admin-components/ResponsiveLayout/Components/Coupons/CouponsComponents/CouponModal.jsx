import { useState } from "react";
import "./CouponModal.css";

export default function CouponModal({ initialData, onClose, onSave }) {
  const [form, setForm] = useState(
    initialData || {
      code: "",
      description: "",
      discount: "",
      conditions: { min: "", max: "" },
      usage: { used: 0, limit: 0 },
      validUntil: "",
      status: "active",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="cm-overlay">
      <div className="cm-popup">
        <h3>{initialData ? "Edit Coupon" : "Add Coupon"}</h3>

        <input
          name="code"
          placeholder="Coupon Code"
          value={form.code}
          onChange={handleChange}
          disabled={!!initialData}
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="discount"
          placeholder="Discount"
          value={form.discount}
          onChange={handleChange}
        />

        <input
          placeholder="Min Amount"
          value={form.conditions.min}
          onChange={(e) =>
            setForm({
              ...form,
              conditions: { ...form.conditions, min: e.target.value },
            })
          }
        />

        <input
          placeholder="Max Amount"
          value={form.conditions.max || ""}
          onChange={(e) =>
            setForm({
              ...form,
              conditions: { ...form.conditions, max: e.target.value },
            })
          }
        />

        <input
          type="date"
          value={form.validUntil}
          onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
        />

        <div className="cm-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="primary" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
