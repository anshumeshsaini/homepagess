import React, { useRef } from 'react';
import { activities } from '../data/activities.js';
import GlitchText from './GlitchText.jsx';
import CyberButton from './CyberButton.jsx';
import TypewriterEffect from './TypewriterEffect.jsx';
import TechIcon from './TechIcon.jsx';
import StatCounter from './StatCounter.jsx';
import BackgroundCanvas from './BackgroundCanvas.jsx';
import TechIconCarousel from './TechIconCarousel';
import "./hero.css";

const HeroSection = () => {
  const sectionRef = useRef(null);

  return (
    <div ref={sectionRef} className="min-h-screen relative transition-opacity duration-1000 flex items-center justify-center py-20 px-4">
      <BackgroundCanvas />

      <div className="w-full max-w-7xl mx-auto relative z-20">
        {/* Main grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
              <div className="text-white mb-4">Welcome to</div>
              <div className="text-cyan-400 cyber-glow inline-block">
                <GlitchText text="CYBERONITES" intensity="high" />
              </div>
            </h1>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="text-white block mb-2">Empowering Students,</span>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-cyan-400">Protecting</span>
                  <TypewriterEffect text="Cyberspace." />
                </div>
              </h2>
              
              <div className="cyber-divider w-1/2 mx-auto lg:mx-0"></div>
              
              <p className="text-gray-300 text-pretty max-w-xl mx-auto lg:mx-0 text-lg">
                The next generation of cyber defenders starts here. Join our elite community of hackers, security experts, and digital guardians.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <CyberButton primary>Join Us</CyberButton>
              <CyberButton>Sponsor</CyberButton>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative flex flex-col gap-12 mt-8 lg:mt-0 h-[500px]">
            <div className="h-[45%]"> {/* Changed from h-2/5 to h-[45%] */}
              <TechIconCarousel items={activities} />
            </div>

            {/* Cyber Text Container */}
            <div className="h-[55%] mt-8"> {/* Changed from h-3/5 and added mt-8 */}
              <div className="cyber-text-container h-full p-8">
                <h3 className="text-2xl font-bold mb-6 text-cyan-300 leading-tight">
                  Building the next generation of{" "}
                  <span className="text-cyan-400">cyber experts</span>
                </h3>
                <p className="text-gray-300 leading-relaxed">
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

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
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
