import React, { useEffect, useRef, useState } from 'react';
import { Monitor, Shield, Users, Cpu, Database } from 'lucide-react';
import GlitchText from './GlitchText.jsx';
import CyberButton from './CyberButton.jsx';
import TypewriterEffect from './TypewriterEffect.jsx';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particleCount, setParticleCount] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const particleInterval = setInterval(() => {
      setParticleCount(prev => {
        if (prev >= 50) {
          clearInterval(particleInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 500);

    const canvas = document.getElementById('connection-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const getIconPositions = () => {
      const icons = document.querySelectorAll('.connection-node');
      const positions = [];

      icons.forEach(icon => {
        const rect = icon.getBoundingClientRect();
        positions.push({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          size: rect.width / 2
        });
      });

      return positions;
    };

    let positions = getIconPositions();

    // Create particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.5 ? '#06b6d4' : '#9333ea';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const particles = [];

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      positions = getIconPositions();

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      // Draw connections between icons
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;

      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const start = positions[i];
          const end = positions[j];

          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);

          // Create gradient
          const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
          gradient.addColorStop(0, 'rgba(216,20,20,0.5)');
          gradient.addColorStop(0.5, 'rgba(60,38,38,0.5)');
          gradient.addColorStop(1, 'rgba(216,20,20,0.5)');

          ctx.strokeStyle = gradient;
          ctx.stroke();

          // Animated particles along the line
          const time = Date.now() / 1000;
          const particleCount = 3;

          for (let p = 0; p < particleCount; p++) {
            const t = (time * 0.5 + p / particleCount) % 1;
            const x = start.x + (end.x - start.x) * t;
            const y = start.y + (end.y - start.y) * t;

            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#cc1616';
            ctx.fill();

            // Glow effect
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
            glowGradient.addColorStop(0, 'rgb(53,214,16)');
            glowGradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
            ctx.fillStyle = glowGradient;
            ctx.fill();
          }
        }
      }

      // Connect particles to nearby nodes
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        for (let j = 0; j < positions.length; j++) {
          const node = positions[j];
          const dx = particle.x - node.x;
          const dy = particle.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(node.x, node.y);

            const opacity = 1 - distance / 150;
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.2})`;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      clearInterval(particleInterval);
    };
  }, [particleCount]);

  return (
      <div
          ref={sectionRef}
          className={`min-h-screen pt-24 pb-16 flex items-center relative transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <canvas id="connection-canvas" className="absolute inset-0 z-0"></canvas>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <div className="text-white mb-2">Welcome to</div>
                <div className="text-cyan-400 cyber-glow">
                  <GlitchText text="CYBERONITES" intensity="high" />
                </div>
              </h1>

              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  <span className="text-white">Empowering Students,</span><br />
                  <span className="text-cyan-400">Protecting </span>
                  <TypewriterEffect text="Cyberspace." />
                </h2>
                <div className="cyber-divider my-6 w-1/2 mx-auto lg:mx-0"></div>
                <p className="text-gray-300 mt-4">
                  The next generation of cyber defenders starts here. Join our elite community of hackers, security experts, and digital guardians.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <CyberButton primary>Join Us</CyberButton>
                <CyberButton>Sponsor</CyberButton>
              </div>
            </div>

            <div className="relative">
              <div className="cyber-grid-container">
                <div className="connection-node absolute top-0 left-1/4 transform -translate-x-1/2">
                  <div className="cyber-icon">
                    <Monitor className="w-12 h-12 text-cyan-400" />
                  </div>
                </div>

                <div className="connection-node absolute top-1/3 right-1/4 transform translate-x-1/2">
                  <div className="cyber-icon">
                    <Cpu className="w-12 h-12 text-cyan-400" />
                  </div>
                </div>

                <div className="connection-node absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="cyber-icon large">
                    <Shield className="w-16 h-16 text-cyan-400" />
                  </div>
                </div>

                <div className="connection-node absolute bottom-1/3 left-1/4 transform -translate-x-1/2">
                  <div className="cyber-icon">
                    <Database className="w-12 h-12 text-cyan-400" />
                  </div>
                </div>

                <div className="connection-node absolute bottom-0 right-1/4 transform translate-x-1/2">
                  <div className="cyber-icon">
                    <Users className="w-12 h-12 text-cyan-400" />
                  </div>
                </div>

                <div className="cyber-text-container absolute right-0 top-1/4 max-w-xs">
                  <h3 className="text-xl font-bold mb-2 text-cyan-300">
                    Building the next generation of <span className="text-cyan-400">cyber experts</span>
                  </h3>
                  <p className="text-gray-300">
                    through education and <span className="text-cyan-400">hands-on training</span>. Our <span className="text-cyan-400">university-based club</span> offers workshops, seminars, equipping students with the skills and knowledge to tackle the <span className="text-cyan-400">challenges of the digital world</span> and <span className="text-cyan-400">secure our future</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HeroSection;
