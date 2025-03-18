import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import GlitchText from './GlitchText.jsx';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Home', 'About', 'Upcoming', 'Events'];

  return (
      <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
              isScrolled ? 'py-2 bg-black/80 backdrop-blur-md border-b border-cyan-900/30' : 'py-4'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative">
                <div className="w-14 h-14 rounded-full border-2 border-cyan-400 flex items-center justify-center overflow-hidden logo-container">
                  <div className="absolute inset-0 logo-glow"></div>
                  <div className="relative z-10 w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 text-cyan-400">
                      {/* Hooded figure logo */}
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M12 6C9.79 6 8 7.79 8 10V13C8 13.55 8.45 14 9 14H15C15.55 14 16 13.55 16 13V10C16 7.79 14.21 6 12 6Z" fill="currentColor" />
                        <path d="M12 17C10.9 17 10 16.1 10 15H14C14 16.1 13.1 17 12 17Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-2">
                <div className="font-bold text-xl text-cyan-400 cyber-glow">CYBERONITES</div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex">
              <div className="cyber-nav-container">
                {menuItems.map((item) => (
                    <button
                        key={item}
                        className={`px-4 py-2 mx-1 relative overflow-hidden nav-item ${
                            activeItem === item ? 'text-cyan-400 active-nav-item' : 'text-gray-300 hover:text-white'
                        }`}
                        onClick={() => setActiveItem(item)}
                    >
                  <span className="relative z-10">
                    {activeItem === item ? <GlitchText text={item} /> : item}
                  </span>
                      {activeItem === item && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 glow-line"></span>
                      )}
                    </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
            className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-cyan-900/30 transition-all duration-300 ${
                mobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0 overflow-hidden'
            }`}
        >
          <div className="container mx-auto px-4">
            {menuItems.map((item) => (
                <button
                    key={item}
                    className={`block w-full text-left px-4 py-3 ${
                        activeItem === item ? 'text-cyan-400' : 'text-gray-300'
                    }`}
                    onClick={() => {
                      setActiveItem(item);
                      setMobileMenuOpen(false);
                    }}
                >
                  {item}
                </button>
            ))}
          </div>
        </div>
      </nav>
  );
};

export default NavBar;