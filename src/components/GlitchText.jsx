import React, { useState, useEffect, useRef } from 'react';
import './Glitch.css';

const GlitchText = ({ text, intensity = 'cosmic' }) => {
  const [glitchedText, setGlitchedText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    let intervalId;
    let timeoutId;

    // 🔥 Alien & Cosmic Characters (Enhanced Set)
    const glitchChars = 'ΞΨΩΣΔΛ → ΞΩΨΣΔΛΣΩΞ';

    // 🔥 Glitch probability based on intensity level
    const glitchProbability = intensity === 'low' ? 0.1 :
        intensity === 'high' ? 0.7 :
            intensity === 'cosmic' ? 0.95 : 0.3;

    // 🔥 Apply Reality-Breaking Glitch Effect
    const applyGlitch = () => {
      const newText = text
          .split('')
          .map(char => (Math.random() < glitchProbability ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char))
          .join('');

      setGlitchedText(newText);
      setIsGlitching(true);

      // 🌀 Quantum Disappearance (Randomly make text vanish)
      if (Math.random() < 0.05) setGlitchedText(' ');

      timeoutId = setTimeout(() => {
        setGlitchedText(text);
        setIsGlitching(false);
      }, Math.random() * 100 + 50);
    };

    // 🔥 Trigger Multiversal Glitches Randomly
    const triggerGlitch = () => {
      const glitchInterval = intensity === 'low' ? 4000 :
          intensity === 'high' ? 1000 :
              intensity === 'cosmic' ? 300 : 2500;

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
      <span ref={textRef} className={`glitch-text ${isGlitching ? 'glitching' : ''}`} data-text={text}>
      {glitchedText}
    </span>
  );
};

export default GlitchText;
