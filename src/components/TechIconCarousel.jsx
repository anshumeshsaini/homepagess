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
    const sensitivity = window.innerWidth < 768 ? 1 : 0.5;
    
    setRotation(prev => prev + deltaX * sensitivity);
    setStartX(currentX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className="tech-carousel w-full h-full min-h-[180px] max-h-[350px] m-0"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <div 
        className={`slider ${isDragging ? 'dragging' : ''} 
                   w-[110px] h-[154px] top-[45%] left-1/2
                   sm:w-[100px] sm:h-[150px]
                   md:w-[120px] md:h-[180px]
                   lg:w-[154px] lg:h-[220px] lg:top-1/2`}
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
              {/* Front of card */}
              <div className="card-front p-[0.35rem] gap-2 sm:p-2 md:p-3 lg:p-[0.6rem]">
                <div className="cyber-icon w-10 h-10 min-w-10 min-h-10 p-1.5 mb-0.5
                                sm:w-9 sm:h-9
                                md:w-10 md:h-10 
                                lg:w-12 lg:h-12">
                  <svg 
                    viewBox="0 0 24 24" 
                    width="24"
                    height="24"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path d={item.icon} />
                  </svg>
                </div>
                <span className="activity-label m-0 p-0 px-0 
                                sm:px-0.5 md:px-1 lg:px-1.5 
                                lg:mt-0.5">
                  {item.activity}
                </span>
              </div>
              
              {/* Back of card */}
              <div className="card-back p-[0.5rem]">
                <div className="description p-[0.35rem] 
                                sm:p-[0.3rem] md:p-[0.5rem] lg:p-[0.5rem]">
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechIconCarousel;
