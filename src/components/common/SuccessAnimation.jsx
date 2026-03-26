import React, { useEffect, useState, useCallback } from 'react';

/**
 * SuccessAnimation Component - Responsive success notification
 * Responsive: Mobile (text-xl) → Tablet (text-2xl) → Desktop (text-3xl)
 * Accessibility: ARIA live region for screen readers
 * Production: Error handling, cleanup, memoization
 */
const SuccessAnimation = ({ message = 'Success!', onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof onComplete !== 'function' && onComplete !== undefined) {
      console.warn('SuccessAnimation: onComplete must be a function or undefined');
    }

    // Animation runs for 2 seconds, then fades out
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    // Complete removal after fade out
    const completeTimer = setTimeout(() => {
      try {
        onComplete?.();
      } catch (err) {
        console.error('SuccessAnimation callback error:', err);
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

  const confettiPieces = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    left: Math.random() * 100,
    color: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'][Math.floor(Math.random() * 6)]
  }));

  return (
    <>
      {/* Overlay - Responsive opacity and z-index */}
      <div 
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] animate-fadeIn"
        role="status"
        aria-label="Success notification"
        aria-live="polite"
      >
        {/* Container - Responsive padding and border radius */}
        <div className="relative bg-white rounded-2xl p-8 sm:p-10 md:p-12 shadow-2xl animate-scaleIn overflow-hidden">
          {/* Checkmark */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6">
            <svg className="w-full h-full" viewBox="0 0 52 52" aria-hidden="true">
              {/* Success circle animation */}
              <circle 
                cx="26" 
                cy="26" 
                r="25" 
                fill="none"
                className="stroke-green-500 stroke-[3px] stroke-dasharray-[166] stroke-dashoffset-[166] animate-strokeDash"
              />
              {/* Check mark animation */}
              <path 
                fill="none" 
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                className="stroke-green-500 stroke-[3px] stroke-linecap-round stroke-linejoin-round stroke-dasharray-[48] stroke-dashoffset-[48] animate-strokeCheckmark"
              />
            </svg>
          </div>

          {/* Success message - Responsive typography */}
          <div className="font-serif font-bold text-center text-xl sm:text-2xl md:text-3xl text-primary-darker mt-2 sm:mt-3 animate-slideUpSuccess">
            {message}
          </div>

          {/* Confetti pieces */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {confettiPieces.map((piece) => (
              <div
                key={piece.id}
                className="absolute w-2 h-2 sm:w-3 sm:h-3 animate-float"
                style={{
                  left: `${piece.left}%`,
                  top: '-10px',
                  backgroundColor: piece.color,
                  animationDelay: `${piece.delay}s`,
                  borderRadius: '50%'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind animations for success components */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes strokeDash {
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes strokeCheckmark {
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes slideUpSuccess {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0% { opacity: 1; transform: translateY(0px) scaleY(1); }
          100% { opacity: 0; transform: translateY(600px) scaleY(0); }
        }
        
        .animate-fadeIn { animation: fadeIn 0.3s ease-in forwards; }
        .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-strokeDash { animation: strokeDash 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
        .animate-strokeCheckmark { animation: strokeCheckmark 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards; }
        .animate-slideUpSuccess { animation: slideUpSuccess 0.5s ease-out 0.3s both; }
        .animate-float { animation: float 2s ease-in forwards; }
      `}</style>
    </>
  );
};

export default SuccessAnimation;

