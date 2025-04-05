import React from 'react';
import '../styles/Glitch.css';

const GlitchText = ({ text }) => {
  return (
    <h2 className="glitch layers" data-text={text}>
      <span>{text}</span>
    </h2>
  );
};

export default GlitchText;
