import "./CustomersComponents.css";

const CustomersFilterBar = () => {
  return (
    <div className="CustomersFilterBarContainer">
      <input
        type="text"
        placeholder=" 🔍 Search by Name , Email , Phone , Customer ID..."
        className="CustomersFilterBarSearch"
      />

      <select
        className="CustomersFilterBarCustomerType"
        id="myDropdown"
        name="selectedOption"
      >
        <option value="LastSevenDays">All Segments</option>
        <option value="LastThirtyDays">VIP</option>
        <option value="LastThirtyDays">Loyal</option>
        <option value="LastThirtyDays">Regular</option>
        <option value="LastThirtyDays">New</option>
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

      {/* <div className="CustomersFilterBarFilter">
        <i class="fa-solid fa-filter"></i>
      </div>
      <div className="CustomersFilterBarDownload">
        <i class="fa-solid fa-download"></i>
      </div> */}
    </div>
  );
};

export default CustomersFilterBar;
