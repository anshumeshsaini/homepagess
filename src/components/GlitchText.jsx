import React from 'react';
import './Glitch.css';

// Simple component that uses the CSS-only glitch effect
const GlitchText = ({ text }) => {
  return (
    <h2 className="glitch layers" data-text={text}>
      <span>{text}</span>
    </h2>
  );
};

export default GlitchText;
