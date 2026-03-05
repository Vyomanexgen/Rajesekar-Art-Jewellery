import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const letters = "RAJASEKAR".split("");

const Loading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent body scroll during loading
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          document.body.style.overflow = '';
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a0b2e'
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              style={{
                fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
                fontSize: window.innerWidth < 768 ? '2.5rem' : '4rem',
                fontWeight: 'bold',
                fontStyle: 'italic',
                background: 'linear-gradient(90deg, #ffd700 0%, #ffed4e 25%, #ffd700 50%, #ffed4e 75%, #ffd700 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
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
        <motion.p
          style={{
            fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            fontSize: window.innerWidth < 768 ? '1.125rem' : '1.25rem',
            letterSpacing: '0.35em',
            color: 'rgba(255, 215, 0, 0.7)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Art Jewellery
        </motion.p>
        <motion.div
          style={{
            marginTop: '32px',
            width: '192px',
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            overflow: 'hidden'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            style={{
              height: '100%',
              backgroundColor: '#ffd700',
              width: `${progress}%`
            }}
            transition={{ ease: "linear" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loading;

