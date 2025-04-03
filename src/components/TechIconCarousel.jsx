import React, { useState, useRef } from 'react';
import './TechIconCarousel.css';

const TechIconCarousel = ({ items }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.type === 'touchstart' ? e.touches[0].pageX : e.pageX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
    const deltaX = currentX - startX;
    const sensitivity = window.innerWidth < 768 ? 1 : 0.5; // Increased sensitivity on mobile
    
    setRotation(prev => prev + deltaX * sensitivity);
    setStartX(currentX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className="tech-carousel"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <div 
        className={`slider ${isDragging ? 'dragging' : ''}`}
        style={{ 
          '--quantity': items.length,
          transform: `perspective(1000px) translate(-50%, -50%) rotateX(-16deg) rotateY(${rotation}deg)`
        }}
      >
        {items.map((item, index) => (
          <div 
            key={item.activity}
            className="item"
            style={{ '--position': index + 1 }}
          >
            <div className="cyber-icon-box">
              <div className="cyber-icon">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-8 h-8 text-cyan-400"
                >
                  <path d={item.icon} fill="currentColor" />
                </svg>
              </div>
              <span className="activity-label">{item.activity}</span>
              <div className="tooltip">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechIconCarousel;
