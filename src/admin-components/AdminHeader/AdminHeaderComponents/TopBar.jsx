import "./AdminHeaderComponents.css";

function TopBar({ onLogout }) {
  return (
    <div className="col-12 TopBarContainer">
      {/* Logo Container */}
      <div className="TopBarLogoContainer"></div>
      {/* Heading */}
      <h1 className="TopBarHeading d-none d-sm-block">Art Jewellery Admin</h1>
      {/* Buttons */}
      <div className="TopBarButtons">
        {onLogout && (
          <button
            className="TransparentButton TopBarContainerGoogleButton"
            onClick={onLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default TopBar;
