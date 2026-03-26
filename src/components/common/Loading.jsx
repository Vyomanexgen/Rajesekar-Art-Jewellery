import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const letters = "RAJASEKAR".split("");

/**
 * Loading Component - Responsive loading screen with progress indication
 * Responsive: Mobile (text-2xl) → Tablet (text-3xl) → Desktop (text-4xl)
 * Accessibility: ARIA labels for screen readers, proper semantic structure
 * Production: Error handling, cleanup, memo optimization
 */
const Loading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof document === 'undefined' || typeof onComplete !== 'function') {
      return;
    }

    // Prevent body scroll during loading - production-safe approach
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let interval; // Store interval ref for cleanup
    let timeoutId; // Store timeout ref for cleanup

    try {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            clearInterval(interval);
            // Restore original overflow state
            document.body.style.overflow = originalOverflow;
            // Call completion with delay
            timeoutId = setTimeout(() => {
              try {
                onComplete?.();
              } catch (err) {
                console.error('Loading completion error:', err);
              }
            }, 600);
            return 100;
          }
          return newProgress;
        });
      }, 40);
    } catch (err) {
      console.error('Loading animation error:', err);
      document.body.style.overflow = originalOverflow;
    }

    // Comprehensive cleanup
    return () => {
      if (interval) clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0b2e] to-[#0f051a]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 px-4">
        {/* Logo/Name with responsive sizing */}
        <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
          {letters.map((letter, i) => (
            <motion.span
              key={`letter-${i}`}
              className="font-serif font-bold italic text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-md"
              style={{
                textShadow: '0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          className="font-sans text-base sm:text-lg md:text-xl tracking-widest text-yellow-400/70 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Art Jewellery
        </motion.p>

        {/* Progress bar container */}
        <motion.div
          className="mt-8 sm:mt-10 w-48 h-px bg-white/20 overflow-hidden rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {/* Progress fill */}
          <motion.div
            className="h-full bg-yellow-400 rounded"
            style={{
              width: `${progress}%`
            }}
            transition={{ ease: "linear" }}
          />
        </motion.div>

        {/* Progress percentage (accessibility) */}
        <motion.span
          className="text-xs sm:text-sm text-yellow-400/60 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          {progress}%
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Loading;

