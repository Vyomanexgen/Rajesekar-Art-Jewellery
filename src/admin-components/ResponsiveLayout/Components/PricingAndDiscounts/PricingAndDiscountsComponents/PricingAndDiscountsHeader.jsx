import "./PricingAndDiscountsComponents.css";

function PricingAndDiscountsHeader() {
  return (
    <div className="PricingAndDiscountsHeadingContainer">
      <div className="PricingAndDiscountsHeadingLeftContainer">
        <h1 className="PricingAndDiscountsHeadingContainerHead">
          Pricing & Discounts
        </h1>
        <p className="PricingAndDiscountsHeadingContainerDescription">
          Manage dynamic pricing, discount rules, and price history
        </p>
      </div>
      <div className="PricingAndDiscountsHeadingRightContainer">
        {/* <ExcelExportButton jsonData={customers} fileName="UserData" />{" "} */}
        <button className="PricingAndDiscountsButton">
          {" "}
          + Add Discount Rules{" "}
        </button>
      </div>
    </div>
  );
}

export default PricingAndDiscountsHeader;
