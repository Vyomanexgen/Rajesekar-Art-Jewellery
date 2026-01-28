import "./PromotionsComponents.css";

function PromotionsSummaryCard({ title, value }) {
  return (
    <div className="PricingAndDiscountsCardContainer">
      <p className="PricingAndDiscountsContainerHead">{title}</p>
      <p className="PricingAndDiscountsContainerValue">
        <b>{value}</b>
      </p>
    </div>
  );
}

export default PromotionsSummaryCard;
