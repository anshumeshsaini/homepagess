import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ text, delay = 100, cursor = true }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, delay, text]);

  return (
      <span className="typewriter-text">
      {displayText}
        {cursor && (
            <span className={`text-cyan-400 ${isTyping ? 'animate-blink' : ''}`}>|</span>
        )}
    </span>
  );
};

export default TypewriterEffect;
