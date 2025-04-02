import React, { useState, useEffect } from 'react';

const CosmicTypewriter = ({
                            text,
                            minDelay = 10,
                            maxDelay = 90,
                            cursor = true,
                            backspace = true,
                            loop = true,
                            pauseTime = 3000
                          }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const quantumDelay = Math.random() * (maxDelay - minDelay) + minDelay;

    if (isTyping && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, quantumDelay);
      return () => clearTimeout(timeout);
    }

    if (backspace && !isTyping && !isDeleting) {
      setTimeout(() => setIsDeleting(true), pauseTime);
    }

    if (isDeleting && displayText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
      }, quantumDelay);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setIsTyping(true);
      setCurrentIndex(0);
    }

    if (!isTyping && !backspace && loop) {
      setTimeout(() => {
        setIsTyping(true);
        setCurrentIndex(0);
        setDisplayText('');
      }, pauseTime);
    }
  }, [currentIndex, text, isTyping, displayText, isDeleting, backspace, loop]);

  return (
      <span className="cosmic-typewriter" style={{
        fontFamily: 'Galactic Mono',
        color: '#fbfafa',
        letterSpacing: '4px',

      }}>
      {displayText}
        {cursor && <span className={`text-cyan-400 ${isTyping || isDeleting ? 'animate-blink' : ''}`}>&#x25A0;</span>}
    </span>
  );
};

export default CosmicTypewriter;