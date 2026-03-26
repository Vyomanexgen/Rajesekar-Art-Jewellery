import React, { useEffect, useState } from 'react';

const Offer = ({ showOfferPopup, setShowOfferPopup }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!showOfferPopup) return undefined;

    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const scrollY = window.scrollY;

    const prevHtmlOverflow = htmlEl.style.overflow;
    const prevBodyOverflow = bodyEl.style.overflow;
    const prevBodyPosition = bodyEl.style.position;
    const prevBodyTop = bodyEl.style.top;
    const prevBodyLeft = bodyEl.style.left;
    const prevBodyRight = bodyEl.style.right;
    const prevBodyWidth = bodyEl.style.width;

    htmlEl.style.overflow = 'hidden';
    bodyEl.style.overflow = 'hidden';
    bodyEl.style.position = 'fixed';
    bodyEl.style.top = `-${scrollY}px`;
    bodyEl.style.left = '0';
    bodyEl.style.right = '0';
    bodyEl.style.width = '100%';

    return () => {
      htmlEl.style.overflow = prevHtmlOverflow;
      bodyEl.style.overflow = prevBodyOverflow;
      bodyEl.style.position = prevBodyPosition;
      bodyEl.style.top = prevBodyTop;
      bodyEl.style.left = prevBodyLeft;
      bodyEl.style.right = prevBodyRight;
      bodyEl.style.width = prevBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [showOfferPopup]);

  if (!showOfferPopup) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText('UGADHI2026');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (_err) {
      // no-op fallback to avoid noisy console in production
    }
  };

  return (
    <div className="offer-popup-overlay">
      <div className="celebration-confetti">
        {[...Array(80)].map((_, i) => {
          const isTriangle = i % 3 === 0;
          const colors = ['#f2c23a', '#ff6b6b', '#ff6b9d', '#4ecdc4', '#a8e6cf', '#ffd93d', '#ff9ff3', '#95e1d3'];
          const color = colors[i % colors.length];
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
                animationDuration: `${3 + (i % 3)}s`,
              }}
            />
          );
        })}
      </div>

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
                animationDuration: `${4 + (i % 2)}s`,
              }}
            />
          );
        })}
      </div>

      <div className="offer-popup-container">
        <div className="offer-popup-content">
          <div className="offer-popup-ambient-glow offer-popup-ambient-glow-left" aria-hidden="true" />
          <div className="offer-popup-ambient-glow offer-popup-ambient-glow-right" aria-hidden="true" />

          <div className="offer-popup-main">
            <button
              className="offer-popup-close"
              onClick={() => setShowOfferPopup(false)}
              aria-label="Close offer popup"
            >
              ×
            </button>

            <div className="offer-popup-icon" aria-hidden="true">🎉</div>
            <div className="offer-popup-badge">Festive Exclusive 2026</div>
            <h1 className="offer-popup-title">Ugadhi Exclusive Offer</h1>
            <div className="offer-popup-discount">30% OFF</div>
            <p className="offer-popup-subtitle">On our complete jewellery collection</p>
            <p className="offer-popup-message">
              Begin 2026 with timeless elegance. Use code <strong>UGADHI 2026</strong> at checkout and unlock a limited-time 30% celebration discount.
            </p>
            <div className="offer-popup-coupon">
              <div className="coupon-label">Your Coupon Code:</div>
              <div className="coupon-code">UGADHI2026</div>
              <button className="coupon-copy-btn" onClick={handleCopyCode}>
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>
            <div className="offer-popup-timer">
              <span className="timer-text">Offer ends soon. Reserve your favorites today.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;

