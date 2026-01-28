import React, { useState } from "react";
import "./MainDashboardComponents.css";

const MainDashboardHeader = () => {
  const [selectedRange, setSelectedRange] = useState("Last 7 Days");

  const ranges = ["Today", "Last 7 Days", "Last 30 Days", "This Year"];

  return (
    <div className="MainDashboardHeaderContainer">
      <div className="MainDashboardHeaderTextSection">
        <h2 className="MainDashboardHeaderTitle">Dashboard</h2>
        <p className="MainDashboardHeaderSubtitle">
          Overview of your marketplace performance
        </p>
      </div>

      <div className="MainDashboardHeaderControls">
        <select
          className="MainDashboardHeaderDropdown"
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
        >
          {ranges.map((range, index) => (
            <option key={index} value={range}>
              {range}
            </option>
          ))}
        </select>

        <button className="MainDashboardHeaderExport">Export Report</button>
      </div>
    </div>
  );
};

export default MainDashboardHeader;
