import { useState } from "react";
import "./Permissions.css";
import PermissionsStats from "./PermissionsComponents/PermissionsStats";
import RolesAndPermissions from "./PermissionsComponents/RolesAndPermissions";
import UserProfiles from "./PermissionsComponents/UserProfiles";

function Permissions() {
  const [activeTab, setActiveTab] = useState("permissions"); // 'permissions' or 'user-management'

  const PermissionStatsData = [
    {
      title: "Total Roles",
      value: 6,
      icon: "fa-shield-halved",
      bg: "#fde0e0",
      iconColor: "#ef4444",
    },
    {
      title: "Total Users",
      value: 45,
      icon: "fa-shield",
      bg: "#e0f7fa",
      iconColor: "#2277ff",
    },
    {
      title: "Custom Roles",
      value: 4,
      icon: "fa-user-group",
      bg: "#e8f5e9",
      iconColor: "#4caf50",
    },
  ];

  return (
    <div className="PermissionsContainer">
      <div className="MainDashboardHeaderContainer">
        <div className="MainDashboardHeaderTextSection">
          <h2 className="MainDashboardHeaderTitle">Roles & Permissions</h2>
          <p className="MainDashboardHeaderSubtitle">
            Manage user roles and access control
          </p>
        </div>
      </div>
      <PermissionsStats data={PermissionStatsData} />

      {/* Toggle Bar */}
      <div className="permissions-toggle-bar">
        <button
          className={`toggle-btn ${activeTab === "permissions" ? "active" : ""}`}
          onClick={() => setActiveTab("permissions")}
        >
          <i className="fa-solid fa-shield-halved"></i>
          Permissions
        </button>
        <button
          className={`toggle-btn ${activeTab === "user-management" ? "active" : ""}`}
          onClick={() => setActiveTab("user-management")}
        >
          <i className="fa-solid fa-users"></i>
          User Management
        </button>
      </div>

      {/* Conditional Content */}
      {activeTab === "permissions" ? <RolesAndPermissions /> : <UserProfiles />}
    </div>
  );
}

export default Permissions;

