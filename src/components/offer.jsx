import React from 'react';

const Offer = ({
  showOfferPopup,
  setShowOfferPopup
}) => {
  if (!showOfferPopup) return null;

  return (
    <div className="offer-popup-overlay">
      {/* Colorful Confetti Pieces - Full Page */}
      <div className="celebration-confetti">
        {[...Array(80)].map((_, i) => {
          const isTriangle = i % 3 === 0;
          const colors = ['#f2c23a', '#ff6b6b', '#ff6b9d', '#4ecdc4', '#a8e6cf', '#ffd93d', '#ff9ff3', '#95e1d3'];
          const color = colors[i % colors.length];
          // Denser at top: more pieces start from top 30% of screen
          const startPosition = i < 50 ? -5 - (i % 20) : -20 - (i % 10);
          return (
            <div 
              key={`confetti-${i}`} 
              className={`confetti-piece ${isTriangle ? 'triangle' : 'square'}`}
              style={{
                left: `${(i * 7.5) % 100}%`,
                top: `${startPosition}%`,
                ...(isTriangle ? { borderBottomColor: color } : { backgroundColor: color }),
                animationDelay: `${(i * 0.05) % 2}s`,
                animationDuration: `${3 + (i % 3)}s`
              }}
            ></div>
          );
        })}
      </div>

      {/* Curled Ribbons/Streamers - Full Page */}
      <div className="falling-ribbons">
        {[...Array(25)].map((_, i) => {
          const colors = ['#ff6b9d', '#f2c23a', '#4ecdc4', '#ff9ff3', '#ffe66d'];
          const color = colors[i % colors.length];
          return (
            <div 
              key={`ribbon-${i}`}
              className="ribbon"
              style={{
                left: `${5 + (i * 3.8) % 90}%`,
                top: `${-5 - (i % 20)}%`,
                borderColor: color,
                animationDelay: `${(i * 0.1) % 2}s`,
                animationDuration: `${4 + (i % 2)}s`
              }}
            ></div>
          );
        })}
      </div>

      <div className="offer-popup-container">
        <div className="offer-popup-content">
          {/* Close Button */}
          <button 
            className="offer-popup-close"
            onClick={() => setShowOfferPopup(false)}
            aria-label="Close offer popup"
          >
            ×
          </button>

          {/* Main Content */}
          <div className="offer-popup-main">
            <div className="offer-popup-icon">🎉</div>
            <h1 className="offer-popup-title">New Year Offer</h1>
            <div className="offer-popup-discount">30% OFF</div>
            <p className="offer-popup-message">
              Start the new year with stunning jewellery! Use code <strong>NEWYEAR2026</strong> to get 30% off on all products. Limited time offer - don't miss out!
            </p>
            <div className="offer-popup-coupon">
              <div className="coupon-label">Your Coupon Code:</div>
              <div className="coupon-code">NEWYEAR2026</div>
              <button 
                className="coupon-copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText('NEWYEAR2026');
                  const btn = document.querySelector('.coupon-copy-btn');
                  if (btn) {
                    const originalText = btn.textContent;
                    btn.textContent = '✓ Copied!';
                    setTimeout(() => {
                      btn.textContent = originalText;
                    }, 2000);
                  }
                }}
              >
                Copy Code
              </button>
            </div>
            <div className="offer-popup-timer">
              <span className="timer-text">This offer will ends soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;

