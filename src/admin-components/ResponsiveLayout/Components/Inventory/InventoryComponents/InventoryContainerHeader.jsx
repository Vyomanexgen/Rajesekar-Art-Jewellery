import "./InventoryComponents.css";

const InventoryContainerHeader = () => {
  return (
    <div className="InventoryHeadingContainer">
      <div className="InventoryHeadingLeftContainer">
        <h1 className="InventoryHeadingContainerHead">Inventory Management</h1>
        <p className="InventoryHeadingContainerDescription">
          Track and manage stock across warehouses
        </p>
      </div>
      <div className="InventoryHeadingRightContainer">
        <button className="InventoryHeaderButton">Import CSV</button>
        <button className="InventoryHeaderPurchaseButton">
          + Create Purchase Order
        </button>
      </div>
    </div>
  );
};

export default InventoryContainerHeader;
