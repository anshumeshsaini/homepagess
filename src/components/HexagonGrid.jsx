import React, { useEffect, useRef } from 'react';

const HexagonGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Hexagon properties
    const hexSize = 30;
    const hexHeight = hexSize * Math.sqrt(3);
    const hexWidth = hexSize * 2;
    const hexVerticalSpacing = hexHeight;
    const hexHorizontalSpacing = hexWidth * 0.75;

    // Calculate number of hexagons needed
    const columns = Math.ceil(canvas.width / hexHorizontalSpacing) + 1;
    const rows = Math.ceil(canvas.height / hexVerticalSpacing) + 1;

    // Create hexagons
    const hexagons = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = col * hexHorizontalSpacing + (row % 2 === 0 ? 0 : hexHorizontalSpacing / 2);
        const y = row * hexVerticalSpacing;

        hexagons.push({
          x,
          y,
          active: Math.random() < 0.2, // 20% chance to be active
          pulse: Math.random() * Math.PI * 2, // Random starting phase
          color: Math.random() > 0.7 ? '#06b6d4' : '#9333ea' // 70% cyan, 30% purple
        });
      }
    }

    // Draw a hexagon
    const drawHexagon = (x, y, size, active, pulse, color) => {
      ctx.beginPath();

      // Calculate vertices
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);

        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }

      ctx.closePath();

      if (active) {
        // Active hexagon with glow
        const glowSize = 5 + 3 * Math.sin(pulse);

        // Glow effect
        const gradient = ctx.createRadialGradient(x, y, size - glowSize, x, y, size + glowSize);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fill();

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner glow
        ctx.save();
        ctx.clip();
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = gradient;
        ctx.fillRect(x - size - glowSize, y - size - glowSize, (size + glowSize) * 2, (size + glowSize) * 2);
        ctx.restore();
      } else {
        // Inactive hexagon
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fill();

        ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw hexagons
      for (const hex of hexagons) {
        hex.pulse += 0.02;
        drawHexagon(hex.x, hex.y, hexSize, hex.active, hex.pulse, hex.color);

        // Randomly activate/deactivate hexagons
        if (Math.random() < 0.001) {
          hex.active = !hex.active;
        }
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />;
};

export default HexagonGrid;
