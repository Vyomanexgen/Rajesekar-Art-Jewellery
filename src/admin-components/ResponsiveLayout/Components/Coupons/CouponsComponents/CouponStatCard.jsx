import "./CouponStatCard.css";

const CouponStatCard = ({ label, value, valueColor }) => {
  return (
    <div className="coupon-stat-card">
      <p className="coupon-stat-label">{label}</p>
      <p
        className="coupon-stat-value"
        style={{ color: valueColor ? valueColor : "#000" }}
      >
        {value}
      </p>
    </div>
  );
};

export default CouponStatCard;
