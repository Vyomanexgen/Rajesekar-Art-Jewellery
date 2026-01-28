import "./ReviewsAndRatingsComponents.css";

function ReviewSummaryCard({ title, value }) {
  return (
    <div className="ReviewSummaryCardContainer">
      <p className="ReviewSummaryContainerHead">{title}</p>
      <p className="ReviewSummaryContainerValue">
        <b>{value}</b>
      </p>
    </div>
  );
}

export default ReviewSummaryCard;
