import React, { useEffect, useState } from 'react';
import './Loading.css';

const Loading = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent body scroll during loading
    document.body.style.overflow = 'hidden';

    // Animation runs for 2 seconds, then fade out starts
    // Total time: 2s animation + 0.3s fade out = 2.3s
    const fadeOutTimer = setTimeout(() => {
      // Trigger fade out by adding class
      const loadingScreen = document.querySelector('.loading-screen');
      if (loadingScreen) {
        loadingScreen.style.animation = 'fadeOut 0.3s ease-out forwards';
      }
    }, 2000);

    // Complete removal after fade out completes
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      if (onComplete) {
        onComplete();
      }
    }, 2300); // 2s animation + 0.3s fade out

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="loading-screen">
      <div className="loader-wrapper">
        <div className="loader-text-container">
          <div className="loader-name">
            <span className="loader-letter">R</span>
            <span className="loader-letter">a</span>
            <span className="loader-letter">j</span>
            <span className="loader-letter">a</span>
            <span className="loader-letter">s</span>
            <span className="loader-letter">e</span>
            <span className="loader-letter">k</span>
            <span className="loader-letter">a</span>
            <span className="loader-letter">r</span>
          </div>
          <div className="loader-subtitle">Art Jewellery</div>
        </div>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loading;

