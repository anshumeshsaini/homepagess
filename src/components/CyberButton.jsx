import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CyberButton = ({ children, primary = false, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [glitchActive, setGlitchActive] = useState(false);

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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`relative overflow-hidden py-3 px-6 rounded-xl font-bold 
                  transition-all duration-300 cyberpunk-button 
                  ${primary ? "bg-cyan-600 text-black" : "bg-transparent border border-cyan-500 text-cyan-400"} 
                  ${isHovered ? "shadow-[0_0_25px_rgba(0,255,255,0.9)]" : ""} 
                  ${isPressed ? "scale-95" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={onClick}
      >
        {/* Holographic Glow */}
        <div className={`absolute inset-0 transition-all duration-300 ${isHovered ? "bg-cyan-400/20" : "bg-cyan-800/10"}`}></div>

        {/* Text */}
        <span className="relative z-10 flex items-center justify-center">{children}</span>

        {/* Neon Border */}
        <div className={`absolute inset-0 rounded pointer-events-none transition-opacity duration-300 
                      ${isHovered ? "opacity-100 border-2 border-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.7)]"
            : "opacity-0 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]"}`}>
        </div>

        {/* Click Ripples */}
        {ripples.map((ripple) => (
            <span
                key={ripple.id}
                className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r
                     from-cyan-300 to-cyan-500 opacity-50 animate-ripple pointer-events-none"
                style={{ left: ripple.x, top: ripple.y, width: "200%", paddingBottom: "200%" }}
            ></span>
        ))}

        {/* Glitch Effect */}
        {glitchActive && (
            <>
              <div className="absolute inset-0 bg-cyan-400/10 -translate-x-1 translate-y-1 mix-blend-screen"></div>
              <div className="absolute inset-0 bg-purple-500/10 translate-x-1 -translate-y-1 mix-blend-screen"></div>
            </>
        )}
      </motion.button>
  );
};

export default CyberButton;
