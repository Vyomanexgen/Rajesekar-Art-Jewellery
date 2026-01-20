import React, { useEffect, useState } from 'react';
import './SuccessAnimation.css';

const SuccessAnimation = ({ message = 'Success!', onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Animation runs for 2 seconds, then fades out
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    // Complete removal after fade out
    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 2500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="success-animation-overlay">
      <div className="success-animation-container">
        <div className="success-checkmark">
          <svg className="checkmark-svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <div className="success-message">{message}</div>
        <div className="success-confetti">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="confetti-piece" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              backgroundColor: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'][Math.floor(Math.random() * 6)]
            }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessAnimation;

