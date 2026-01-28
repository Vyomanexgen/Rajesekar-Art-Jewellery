import "./ReviewsAndRatings.css";
import ReviewCard from "./ReviewsAndRatingsComponents/ReviewCard";
// import ReviewSummaryCard from "./ReviewsAndRatingsComponents/ReviewSummaryCard";
import ReviewStatCard from "./ReviewsAndRatingsComponents/ReviewStatCard";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const ReviewData = [
  {
    id: 1,
    image: "https://picsum.photos/200?random=1",
    title: "Golden Temple Necklace",
    userName: "Priya Sharma",
    verified: true,
    rating: 5,
    date: "2024-11-20",
    message:
      "The craftsmanship is exceptional. Gold plating is very good and looks authentic. Worth every penny!",
    helpfulCount: 12,
    status: "approved",
    // showActions: false,
  },
  {
    id: 2,
    image: "https://picsum.photos/200?random=2",
    title: "Pearl Pendant Set",
    userName: "Anjali Reddy",
    verified: true,
    rating: 4,
    date: "2024-11-18",
    message:
      "Nice product but delivery took longer than expected. Quality is good though.",
    helpfulCount: 8,
    status: "approved",
    // showActions: false,
  },
  {
    id: 3,
    image: "https://picsum.photos/200?random=3",
    title: "Diamond Bangles Set",
    userName: "Meera Patel",
    verified: true,
    rating: 5,
    date: "2024-11-15",
    message:
      "Bought this for my sister’s wedding. Everyone loved it! Highly recommended.",
    helpfulCount: 3,
    status: "pending",
    // showActions: true,
  },
  {
    id: 4,
    image: "https://picsum.photos/200?random=4",
    title: "Silver Toe Rings",
    userName: "Sneha Gupta",
    verified: false,
    rating: 3,
    date: "2024-11-10",
    message:
      "Product is okay, but expected better finishing. Packaging was great.",
    helpfulCount: 5,
    status: "pending",
    // showActions: true,
  },
];

function ReviewsAndRatings() {
  const [reviews, setReviews] = useState(ReviewData);

  const handleReply = (id, replyText) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id
          ? { ...review, adminReply: replyText, replyDate: new Date().toLocaleDateString() }
          : review
      )
    );
  };

  const totalReviews = reviews.length;
  const totalPending = reviews.reduce((total, item) => {
    if (item.status == "pending") return total + 1;
    return total;
  }, 0);
  const totalApproved = reviews.reduce((total, item) => {
    if (item.status == "approved") return total + 1;
    return total;
  }, 0);
  const totalRating = reviews.reduce((total, item) => {
    return item.rating + total;
  }, 0);
  const avgRating = totalRating / totalReviews;

  return (
    <div className="ReviewsAndRatingsContainer">
      <div className="MainDashboardHeaderContainer">
        <div className="MainDashboardHeaderTextSection">
          <h2 className="MainDashboardHeaderTitle">Reviews & Ratings</h2>
          <p className="MainDashboardHeaderSubtitle">
            Manage customer reviews and testimonials
          </p>
        </div>
      </div>

      <div className="review-stat-grid">
        <ReviewStatCard
          label="Total Reviews"
          value={totalReviews}
          valueColor="red"
        />
        <ReviewStatCard
          label="Pending"
          value={totalPending}
          valueColor="orange"
        />
        <ReviewStatCard
          label="Approved"
          value={totalApproved}
          valueColor="green"
        />
        <ReviewStatCard
          label="Avg Rating"
          value={avgRating}
          icon={<FaStar color="#f5b000" />}
        />
      </div>
      {/* <div className="ReviewSummaryCardContainers">
        <ReviewSummaryCard title="Total Rules" value="5" />
        <ReviewSummaryCard title="Total Rules" value="5" />
        <ReviewSummaryCard title="Total Rules" value="5" />
        <ReviewSummaryCard title="Total Rules" value="5" />
      </div> */}
      <div className="ReviewsAndRatingsDataContainer">
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} onReply={handleReply} />
        ))}
      </div>
    </div>
  );
}

export default ReviewsAndRatings;
