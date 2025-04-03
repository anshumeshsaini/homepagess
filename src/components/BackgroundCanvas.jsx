import { useEffect, useState } from 'react';

const BackgroundCanvas = () => {
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    // ...existing canvas code from HeroSection...
  }, [particleCount]);

  return <canvas id="connection-canvas" className="absolute inset-0 z-0"></canvas>;
};

export default BackgroundCanvas;
