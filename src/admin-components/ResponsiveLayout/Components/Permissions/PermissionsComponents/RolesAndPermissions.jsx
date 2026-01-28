import PermissionsCard from "./PermissionsCard";
import PermissionsPopup from "./PermissionsPopup";
import "./PermissionsComponents.css";

import { useState } from "react";

const initialRoles = [
  {
    id: "r-super",
    name: "Super Admin",
    users: 2,
    description: "Full system access with all permissions",
    iconColor: "#f87171",
    quickSummary: {
      view: "20/20",
      create: "20/20",
      edit: "20/20",
      delete: "20/20",
    },
    permissions: {
      Dashboard: ["view", "create", "edit", "delete"],
      Orders: ["view", "create", "edit", "delete"],
      Products: ["view", "create", "edit", "delete"],
      Customers: ["view", "create", "edit", "delete"],
      Inventory: ["view", "create", "edit", "delete"],
      Categories: ["view", "create", "edit", "delete"],
      Brands: ["view", "create", "edit", "delete"],
      Pricing: ["view", "create", "edit", "delete"],
      Promotions: ["view", "create", "edit", "delete"],
      Banners: ["view", "create", "edit", "delete"],
      Reviews: ["view", "create", "edit", "delete"],
      Questions: ["view", "create", "edit", "delete"],
      Logistics: ["view", "create", "edit", "delete"],
      Payments: ["view", "create", "edit", "delete"],
      Invoices: ["view", "create", "edit", "delete"],
      Analytics: ["view", "create", "edit", "delete"],
      Reports: ["view", "create", "edit", "delete"],
      Coupons: ["view", "create", "edit", "delete"],
      Vendors: ["view", "create", "edit", "delete"],
      Settings: ["view", "create", "edit", "delete"],
    },
  },
  {
    id: "r-vendor",
    name: "Vendor",
    users: 15,
    description: "Manage own products and inventory",
    iconColor: "#34d399",
    quickSummary: {
      view: "4/20",
      create: "1/20",
      edit: "2/20",
      delete: "0/20",
    },
    permissions: {
      Products: ["view", "create", "edit"],
      Inventory: ["view", "edit"],
      Orders: ["view"],
    },
  },
  // add more roles as needed...
];

export default function RolesAndPermissions() {
  const [roles, setRoles] = useState(initialRoles);
  const [activeRoleId, setActiveRoleId] = useState(null);
  const [popupMode, setPopupMode] = useState("view"); // "view" | "edit"
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = (roleId, mode = "view") => {
    setActiveRoleId(roleId);
    setPopupMode(mode);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setActiveRoleId(null);
  };

  const handleSavePermissions = (roleId, newPermissions) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === roleId ? { ...r, permissions: newPermissions } : r
      )
    );
    closePopup();
  };

  const activeRole = roles.find((r) => r.id === activeRoleId) || null;

  return (
    <div>
      <div className="roles-container">
        {roles.map((role) => (
          <PermissionsCard
            key={role.id}
            role={role}
            onView={() => openPopup(role.id, "view")}
            onEdit={() => openPopup(role.id, "edit")}
          />
        ))}
      </div>

      {showPopup && activeRole && (
        <PermissionsPopup
          role={activeRole}
          mode={popupMode}
          onClose={closePopup}
          onEdit={() => setPopupMode("edit")}
          onSave={(newPerms) => handleSavePermissions(activeRole.id, newPerms)}
        />
      )}
    </div>
  );
}
