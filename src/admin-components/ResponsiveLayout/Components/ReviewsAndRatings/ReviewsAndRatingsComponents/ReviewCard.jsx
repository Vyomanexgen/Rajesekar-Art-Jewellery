import { useState } from "react";
import "./ReviewsAndRatingsComponents.css";

const ReviewCard = ({
  id,
  image,
  title,
  userName,
  verified,
  rating,
  date,
  message,
  helpfulCount,
  status,
  adminReply,
  replyDate,
  onReply,
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(id, replyText);
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  return (
    <div className="review-card">
      <img src={image} alt={title} className="review-img" />

      <div className="review-content">
        <div className="review-header">
          <h3>{title}</h3>
          <span className={`status ${status}`}>{status}</span>
        </div>

        <p className="user">
          {userName}{" "}
          {verified && <span className="verified">✔ Verified Purchase</span>}
        </p>

        <div className="stars">
          {Array.from({ length: rating }, (_, i) => (
            <span key={i}>⭐</span>
          ))}
          <span className="review-date">{date}</span>
        </div>

        <p className="review-message">{message}</p>

        {adminReply && (
          <div className="admin-reply">
            <div className="admin-reply-header">
              <strong>Admin Reply</strong>
              {replyDate && <span className="reply-date">{replyDate}</span>}
            </div>
            <p className="admin-reply-text">{adminReply}</p>
          </div>
        )}

        <div className="footer">
          <span className="helpful">👍 {helpfulCount} Helpful</span>

          <div className="actions">
            <button
              className="reply-btn"
              onClick={() => setShowReplyBox(!showReplyBox)}
            >
              💬 Reply
            </button>
          </div>
        </div>

        {showReplyBox && (
          <div className="reply-box">
            <textarea
              className="reply-textarea"
              placeholder="Write your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows="3"
            />
            <div className="reply-actions">
              <button className="send-reply" onClick={handleReplySubmit}>
                Send Reply
              </button>
              <button
                className="cancel-reply"
                onClick={() => {
                  setShowReplyBox(false);
                  setReplyText("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
