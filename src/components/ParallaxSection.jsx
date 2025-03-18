import React, { useRef, useEffect, useState } from 'react';

const ParallaxSection = ({ children, speed = 0.5 }) => {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is in viewport
      if (top < windowHeight && top + height > 0) {
        setIsVisible(true);

        // Calculate parallax offset
        const scrollPosition = window.scrollY;
        const sectionPosition = scrollPosition + top;
        const parallaxOffset = (scrollPosition - sectionPosition) * speed;

        setOffset(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
      <div
          ref={sectionRef}
          className="relative overflow-hidden"
      >
        <div
            className={`transition-transform duration-300 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transform: `translateY(${offset}px)` }}
        >
          {children}
        </div>
      </div>
  );
};

export default ParallaxSection;
