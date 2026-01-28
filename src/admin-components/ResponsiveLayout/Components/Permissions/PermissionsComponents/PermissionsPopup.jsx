import React, { useState, useEffect } from "react";
import "./PermissionsComponents.css";

/**
 * Props:
 * - role: role object (contains permissions map)
 * - mode: "view" | "edit"
 * - onClose: fn
 * - onEdit: optional fn to toggle edit mode
 * - onSave: fn(newPermissions)
 */
export default function PermissionsPopup({
  role,
  mode,
  onClose,
  onEdit,
  onSave,
}) {
  // local copy of permissions for editing
  const [localPermissions, setLocalPermissions] = useState({});
  const [currentMode, setCurrentMode] = useState(mode);
  const [newModuleName, setNewModuleName] = useState("");

  useEffect(() => {
    // deep copy to avoid accidental mutation of parent state
    setLocalPermissions(JSON.parse(JSON.stringify(role.permissions || {})));
    setCurrentMode(mode);
    setNewModuleName("");
  }, [role, mode]);

  const PERMS = ["view", "create", "edit", "delete"];

  function toggleOption(moduleName, option, checked) {
    setLocalPermissions((prev) => {
      const copy = { ...prev };
      const arr = new Set(copy[moduleName] || []);
      if (checked) arr.add(option);
      else arr.delete(option);
      copy[moduleName] = Array.from(arr);
      // If array becomes empty, keep it as empty array until save cleans it
      return copy;
    });
  }

  function handleSave() {
    // Clean empty module arrays
    const cleaned = {};
    for (const [mod, arr] of Object.entries(localPermissions)) {
      if (Array.isArray(arr) && arr.length > 0) cleaned[mod] = arr;
    }
    onSave(cleaned);
  }

  function handleAddModule() {
    const name = newModuleName.trim();
    if (!name) return;
    setLocalPermissions((prev) => {
      if (prev[name]) return prev; // already exists
      return { ...prev, [name]: [] };
    });
    setNewModuleName("");
  }

  function handleRemoveModule(moduleName) {
    setLocalPermissions((prev) => {
      const copy = { ...prev };
      delete copy[moduleName];
      return copy;
    });
  }

  return (
    <div className="overlay" onMouseDown={onClose}>
      <div
        className="popup"
        style={{ maxWidth: "95vw", maxHeight: "95vh" }}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="popup-header">
          <div
            className="role-icon large"
            style={{ backgroundColor: role.iconColor }}
          />
          <div style={{ marginLeft: 12 }}>
            <h2 style={{ margin: 0 }}>{role.name} Permissions</h2>
            <p style={{ margin: "6px 0 0 0", color: "#666" }}>
              {role.description}
            </p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {currentMode === "view" ? (
              <button
                className="popup-edit"
                onClick={() => {
                  setCurrentMode("edit");
                  if (onEdit) onEdit();
                }}
              >
                Edit
              </button>
            ) : null}
            <button className="close-btn popup-close" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

        <div className="permissions-scroll">
          {/* Add module (edit mode) */}
          {currentMode === "edit" && (
            <div className="add-module-row">
              <input
                className="add-module-input"
                placeholder="Add module name (e.g. Shipping)"
                value={newModuleName}
                onChange={(e) => setNewModuleName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddModule();
                }}
              />
              <button className="add-module-btn" onClick={handleAddModule}>
                Add
              </button>
            </div>
          )}

          <div className="table-wrapper">
            <table className="permissions-table" role="table">
              <thead>
                <tr>
                  <th>Module</th>
                  <th className="center-cell">View</th>
                  <th className="center-cell">Create</th>
                  <th className="center-cell">Edit</th>
                  <th className="center-cell">Delete</th>
                  {currentMode === "edit" && (
                    <th className="center-cell">Remove</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {Object.keys(localPermissions).length === 0 &&
                currentMode === "view" ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 18 }}>
                      <em style={{ color: "#666" }}>
                        No permissions assigned to this role.
                      </em>
                    </td>
                  </tr>
                ) : Object.keys(localPermissions).length === 0 &&
                  currentMode === "edit" ? (
                  // show a helpful empty state for editor (still present below)
                  <tr>
                    <td colSpan={6} style={{ padding: 18 }}>
                      <em style={{ color: "#666" }}>
                        Start by adding a module using the "Add" box above.
                      </em>
                    </td>
                  </tr>
                ) : (
                  Object.keys(localPermissions).map((moduleName) => {
                    const arr = localPermissions[moduleName] || [];
                    return (
                      <tr key={moduleName}>
                        <td style={{ minWidth: 160 }}>{moduleName}</td>

                        {/* PERMISSION CHECKBOXES */}
                        {PERMS.map((p) => (
                          <td key={p} className="center-cell">
                            {currentMode === "view" ? (
                              arr.includes(p) ? (
                                <span className="tick">✔</span>
                              ) : null
                            ) : (
                              <label className="perm-checkbox-label">
                                <input
                                  type="checkbox"
                                  checked={arr.includes(p)}
                                  onChange={(e) =>
                                    toggleOption(
                                      moduleName,
                                      p,
                                      e.target.checked
                                    )
                                  }
                                  aria-label={`${moduleName} ${p}`}
                                />
                              </label>
                            )}
                          </td>
                        ))}

                        {currentMode === "edit" && (
                          <td className="center-cell">
                            <button
                              className="remove-module-btn"
                              title={`Remove ${moduleName}`}
                              onClick={() => handleRemoveModule(moduleName)}
                            >
                              ✕
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="popup-footer">
          {currentMode === "edit" ? (
            <>
              <button
                className="close-btn"
                onClick={() => {
                  setLocalPermissions(role.permissions || {});
                  setCurrentMode("view");
                }}
              >
                Cancel
              </button>
              <button className="edit-btn" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <>
              <button className="close-btn" onClick={onClose}>
                Close
              </button>
              <button
                className="edit-btn"
                onClick={() => {
                  setCurrentMode("edit");
                  if (onEdit) onEdit();
                }}
              >
                Edit Permissions
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
