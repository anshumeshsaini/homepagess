import React, { useState, useEffect, useRef } from 'react';

const GlitchText = ({ text, intensity = 'medium' }) => {
  const [glitchedText, setGlitchedText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    let intervalId;
    let timeoutId;

    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

    const applyGlitch = () => {
      const glitchProbability =
          intensity === 'low' ? 0.1 :
              intensity === 'high' ? 0.3 : 0.2;

      const newText = text.split('').map(char => {
        if (Math.random() < glitchProbability) {
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        return char;
      }).join('');

      setGlitchedText(newText);
      setIsGlitching(true);

      timeoutId = setTimeout(() => {
        setGlitchedText(text);
        setIsGlitching(false);
      }, 100);
    };

    const triggerGlitch = () => {
      const glitchInterval =
          intensity === 'low' ? 5000 :
              intensity === 'high' ? 2000 : 3000;

      const randomDelay = Math.random() * glitchInterval;

      intervalId = setTimeout(() => {
        applyGlitch();
        triggerGlitch();
      }, randomDelay);
    };

    triggerGlitch();

    return () => {
      clearTimeout(intervalId);
      clearTimeout(timeoutId);
    };
  }, [text, intensity]);

  return (
      <span
          ref={textRef}
          className={`glitch-text ${isGlitching ? 'glitching' : ''}`}
          data-text={text}
      >
      {glitchedText}
    </span>
  );
};

export default GlitchText;
