import "./PermissionsComponents.css";

export default function PermissionsCard({ role, onView, onEdit }) {
  return (
    <div className="permission-card">
      <div className="permission-top">
        <div
          className="role-icon"
          style={{ backgroundColor: role.iconColor }}
        />
        <div className="role-info">
          <div className="role-row">
            <h3 className="role-title">{role.name}</h3>
          </div>
          <div className="users-count">👥 {role.users} users</div>
          <div className="role-desc">{role.description}</div>
        </div>
      </div>

      <div className="quick-summary">
        <strong>Quick Summary:</strong>
        <div className="summary-values">
          <span>View: {computeQuick(role.permissions, "view")}</span>
          <span>Create: {computeQuick(role.permissions, "create")}</span>
          <span>Edit: {computeQuick(role.permissions, "edit")}</span>
          <span>Delete: {computeQuick(role.permissions, "delete")}</span>
        </div>
      </div>

      <div className="card-actions">
        <button className="view-btn" onClick={onView}>
          View Permissions
        </button>
        <button
          className="card-edit-btn"
          onClick={onEdit}
          title="Edit permissions"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
    </div>
  );
}

function computeQuick(permissions, permName) {
  // quick summary like "4/20" where first is count of modules with that perm
  const modules = Object.keys(permissions || {});
  const count = modules.filter((m) =>
    (permissions[m] || []).includes(permName)
  ).length;
  return `${count}/${modules.length || 20}`;
}
