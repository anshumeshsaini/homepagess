import { useEffect, useState } from 'react';

// Canvas element for rendering particle/connection background effects
const BackgroundCanvas = () => {
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
  }, [particleCount]);

  return <canvas id="connection-canvas" className="absolute inset-0 z-0"></canvas>;
};

export default BackgroundCanvas;
