import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, Math.random() * 100 + 50);
      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length) {
      const blinkTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      return () => clearTimeout(blinkTimeout);
    }
  }, [currentIndex, text, isTyping]);

  return (
    <div className="inline-flex items-center">
      <span className="font-['Orbitron'] text-white font-bold">
        {displayText}
      </span>
      <span 
        className={`ml-0.5 h-5 w-2 bg-white ${isTyping ? 'animate-pulse' : 'animate-blink'}`}
        style={{animation: isTyping ? 'none' : 'blink 1s step-end infinite'}}
      ></span>
    </div>
  );
};

export default TypewriterEffect;