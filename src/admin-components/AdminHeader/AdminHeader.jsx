import TopBar from "./AdminHeaderComponents/TopBar";
import SecondBar from "./AdminHeaderComponents/SecondBar";

import "./AdminHeader.css";

function AdminHeader({ onLogout }) {
  return (
    <div className="AdminHeaderContainer">
      <TopBar onLogout={onLogout} />
      <SecondBar />
    </div>
  );
}

export default AdminHeader;
