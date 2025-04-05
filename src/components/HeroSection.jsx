import React, { useRef } from 'react';
import { activities } from '../data/activities.js';
import GlitchText from './GlitchText.jsx';
import CyberButton from './CyberButton.jsx';
import TypewriterEffect from './TypewriterEffect.jsx';
import TechIcon from './TechIcon.jsx';
import StatCounter from './StatCounter.jsx';
import BackgroundCanvas from './BackgroundCanvas.jsx';
import TechIconCarousel from './TechIconCarousel';
import "../styles/hero.css";

// Main landing section with cyberpunk visual theme, hero content and interactive elements
const HeroSection = () => {
  const sectionRef = useRef(null);

  return (
    <div ref={sectionRef} className="min-h-screen relative transition-opacity duration-1000 flex items-center justify-center py-20">
      <BackgroundCanvas />

      <div className="w-full max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mx-auto">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="font-bold leading-tight">
              <div className="flex flex-col md:block">
                <div className="block md:inline text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-white mb-1 md:mb-4">
                  Welcome 
                </div>
                
                <div className="block md:hidden text-3xl sm:text-4xl text-white mb-3">
                  to
                </div>
                <div className="hidden md:inline text-6xl xl:text-7xl text-white"> to </div>
                
                <div className="text-cyan-400 md:block">
                  <h2 className="glitch layers text-4xl sm:text-5xl md:text-6xl xl:text-7xl" data-text="CYBERONITES">
                    <span>CYBERONITES</span>
                  </h2>
                </div>
              </div>
            </h1>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="text-white block mb-2">Empowering Students,</span>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-cyan-400 font-['Orbitron']">Protecting</span>
                  <TypewriterEffect text="Cyberspace." />
                </div>
              </h2>
              
              <div className="cyber-divider w-full lg:w-48 mx-auto lg:mx-0"></div>
              
              <p className="text-gray-300 text-pretty max-w-xl mx-auto lg:mx-0 text-lg">
                The next generation of cyber defenders starts here. Join our elite community of hackers, security experts, and digital guardians.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <CyberButton primary>Join Us</CyberButton>
              <CyberButton>Sponsor</CyberButton>
            </div>
          </div>

          <div className="relative flex flex-col gap-6 sm:gap-8 lg:gap-10 mt-4 lg:mt-0 h-auto">
            <div className="h-[240px] sm:h-[280px] md:h-[300px] lg:h-[320px] w-full -mt-4">
              <TechIconCarousel items={activities} />
            </div>

            <div className="h-auto w-full mt-2 lg:mt-0">
              <div className="cyber-text-container p-4 sm:p-5 lg:p-6 rounded-md border border-cyan-500/30 hover:border-cyan-400/60">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-cyan-300 leading-tight">
                  Building the next generation of{" "}
                  <span className="text-cyan-400">cyber experts</span>
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  through education and{" "}
                  <span className="text-cyan-400">hands-on training</span>. Our{" "}
                  <span className="text-cyan-400">university-based club</span>{" "}
                  offers workshops, seminars, equipping students with the skills 
                  and knowledge to tackle the{" "}
                  <span className="text-cyan-400">challenges of the digital world</span>{" "}
                  and <span className="text-cyan-400">secure our future</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 mx-auto">
          <StatCounter value="500+" label="Active Members" />
          <StatCounter value="50+" label="Workshops" />
          <StatCounter value="20+" label="Events" />
          <StatCounter value="100%" label="Success Rate" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
