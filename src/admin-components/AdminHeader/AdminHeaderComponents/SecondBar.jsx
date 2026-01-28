import "./AdminHeaderComponents.css";

function SecondBar() {
  return (
    <div className="SecondBarContainer d-flex flex-column ">
      <div className="SecondBarContainer d-flex flex-row justify-content-evenly align-items-center">
        <p className="SecondBarContainerHead ">Admin Dashboard</p>
        <div className="InputBarContainer">
          <input
            type="text"
            className="InputBar"
            placeholder=" 🔍 Search orders,products,customers... ( Press / to Focus ) "
          />
        </div>
        <div className="NavLogos"></div>
      </div>
    </div>
  );
}

export default SecondBar;
