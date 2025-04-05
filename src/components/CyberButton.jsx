import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Cyberpunk-themed button with interactive hover effects, glitch animations and ripples
const CyberButton = ({ children, primary = false, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [glitchActive, setGlitchActive] = useState(false);

  // Trigger random glitch effects when hovered
  useEffect(() => {
    if (isHovered) {
      const glitchInterval = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 80);
      }, Math.random() * 2000 + 500);
      
      return () => clearInterval(glitchInterval);
    }
  }, [isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  const handleMouseDown = (e) => {
    setIsPressed(true);
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples([...ripples, newRipple]);
    setTimeout(() => setRipples((r) => r.filter((r) => r.id !== newRipple.id)), 600);
  };
  
  const handleMouseUp = () => setIsPressed(false);

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden py-3 px-8 rounded-lg font-medium
                  backdrop-blur-sm transition-all duration-200
                  ${primary 
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white border border-cyan-400/30" 
                    : "bg-black/30 border border-cyan-500/30 text-cyan-400"
                  } 
                  ${isHovered ? "shadow-[0_0_15px_rgba(6,182,212,0.3)]" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
    >
      <div className={`absolute inset-0 transition-opacity duration-200 
                    ${isHovered ? "opacity-100" : "opacity-0"}
                    ${primary 
                      ? "bg-gradient-to-r from-cyan-400/10 to-cyan-300/10" 
                      : "bg-gradient-to-r from-cyan-500/5 to-cyan-400/5"
                    }`}
      />

      <span className="relative z-10 flex items-center justify-center tracking-wide">
        {children}
      </span>

      <div className={`absolute inset-0 rounded-lg pointer-events-none 
                    transition-all duration-200
                    ${isHovered 
                      ? "border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]" 
                      : "border border-cyan-500/20"}`}
      />

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 
                    mix-blend-screen pointer-events-none bg-cyan-400/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "150%",
            paddingBottom: "150%",
          }}
        />
      ))}

      {glitchActive && (
        <>
          <div className="absolute inset-0 bg-cyan-400/5 -translate-x-0.5 translate-y-0.5" />
          <div className="absolute inset-0 bg-cyan-500/5 translate-x-0.5 -translate-y-0.5" />
        </>
      )}
    </motion.button>
  );
};

export default CyberButton;
