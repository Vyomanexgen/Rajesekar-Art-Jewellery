import "./PricingAndDiscountsComponents.css";
import { useState } from "react";

function EditDiscountRuleModal({ data, onClose, onSave }) {
  const [form, setForm] = useState({
    ...data,
  });

  const updateField = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "value" ||
        name === "conditionValue" ||
        name === "usageCount" ||
        name === "usageLimit"
          ? Number(value)
          : value,
    });
  };

  const saveChanges = () => {
    onSave(form);
  };

  return (
    <div className="PopupOverlay">
      <div className="PopupContainer">
        <h2 className="PopupTitle">Edit Discount Rule</h2>

        <label>Rule Name</label>
        <input name="ruleName" value={form.ruleName} onChange={updateField} />

        <label>Target Audience</label>
        <input
          name="targetAudience"
          value={form.targetAudience}
          onChange={updateField}
        />

        <label>Type</label>
        <select name="type" value={form.type} onChange={updateField}>
          <option>Percentage</option>
          <option>Flat</option>
          <option>Bulk</option>
        </select>

        <label>Value (%)</label>
        <input
          name="value"
          type="number"
          value={form.value}
          onChange={updateField}
        />

        <label>Condition Type</label>
        <select
          name="conditionType"
          value={form.conditionType}
          onChange={updateField}
        >
          <option>Minimum Amount</option>
          <option>Minimum Quantity</option>
          <option>None</option>
        </select>

        <label>Condition Value</label>
        <input
          name="conditionValue"
          type="number"
          value={form.conditionValue || ""}
          onChange={updateField}
        />

        <label>Currency (₹)</label>
        <input
          name="conditionCurrency"
          value={form.conditionCurrency}
          onChange={updateField}
        />

        <label>Valid From</label>
        <input
          type="date"
          name="validFromDate"
          value={form.validFromDate}
          onChange={updateField}
        />

        <label>Valid To</label>
        <input
          type="date"
          name="validToDate"
          value={form.validToDate}
          onChange={updateField}
        />

        <label>Usage Count</label>
        <input
          type="number"
          name="usageCount"
          value={form.usageCount}
          onChange={updateField}
        />

        <label>Usage Limit</label>
        <input
          type="number"
          name="usageLimit"
          value={form.usageLimit || ""}
          onChange={updateField}
        />

        <label>Status</label>
        <select name="status" value={form.status} onChange={updateField}>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div className="PopupButtons">
          <button className="CancelBtn" onClick={onClose}>
            Cancel
          </button>
          <button className="SaveBtn" onClick={saveChanges}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditDiscountRuleModal;
