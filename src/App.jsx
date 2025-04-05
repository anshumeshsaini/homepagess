import React, { useEffect, useState, useRef } from 'react';
import { Shield, Monitor, Users, ChevronDown, ExternalLink, Cpu, Lock, Code, Zap } from 'lucide-react';
import NavBar from './components/NavBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import GlitchText from './components/GlitchText.jsx';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [bootSequence, setBootSequence] = useState(0);
  const bootMessages = [
    "INITIALIZING SYSTEM...",
    "ESTABLISHING SECURE CONNECTION...",
    "LOADING CYBERONITES PROTOCOL...",
    "DECRYPTING INTERFACE...",
    "ACCESS GRANTED"
  ];

  useEffect(() => {
    // Boot sequence animation
    const bootInterval = setInterval(() => {
      setBootSequence(prev => {
        if (prev >= bootMessages.length - 1) {
          clearInterval(bootInterval);
          setTimeout(() => setLoaded(true), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(bootInterval);
  }, []);


  const ScrollElement = (item) => {
    document.getElementById(item).scrollIntoView({ behavior: "smooth" });
    return;
  };
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Initial loading animation with SMALLER font size for all devices */}
      <div className={`fixed inset-0 bg-black z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="text-cyan-400 text-[10px] xs:text-[12px] sm:text-sm md:text-base lg:text-lg font-mono mb-8 w-5/6 sm:w-auto text-center">
          <GlitchText text={bootMessages[bootSequence]} intensity="high" />
        </div>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
            style={{
              width: `${(bootSequence + 1) / bootMessages.length * 100}%`,
              transition: 'width 0.5s ease-out'
            }}
          ></div>
        </div>
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-70"></div>
      <div className="fixed inset-0 bg-grid-pattern opacity-10"></div>

      {/* Animated grid lines */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="cyber-grid"></div>
      </div>

      {/* Digital noise effect */}
      <div className="digital-noise"></div>

      {/* Scanlines effect */}
      <div className="scanlines"></div>

      {/* Data stream effect */}
      <div className="data-stream"></div>

      {/* Matrix rain effect */}

      {/* Main content - fix container centering on all views */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar scrollToComponent={ScrollElement} />
        
        <main className="flex-1 flex justify-center items-center">
          <div className="container mx-auto px-4">
            <HeroSection />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;