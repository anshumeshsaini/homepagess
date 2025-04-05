import { useCallback, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { LavalampMenu } from "react-llamp-menu";
import logo from "../img/ps-final1.png";
import "../styles/nav.css";

// Interactive navbar with scroll-reactive behavior, animated SVG rings and responsive positioning
const Navbar = ({ scrollToComponent }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const controls = useAnimation();

  // Calculate and set SVG circle stroke dash properties for visual animation
  const setProgress = useCallback(() => {
    const circles = document.querySelectorAll("circle");
    circles.forEach((ele) => {
      const radius = ele.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      ele.style.strokeDasharray = `${circumference} ${circumference}`;
      ele.style.strokeDashoffset = `${circumference}`;
      const offset =
        circumference -
        ((Math.floor(Math.random() * 60) + 10) / 100) * circumference;
      ele.style.strokeDashoffset = offset;
    });
  }, []);

  useEffect(() => {
    setProgress();
    const svgs = document.querySelectorAll(".rings");
    svgs.forEach((svg) => {
      const duration = Math.random() * 6 + 2;
      svg.style.animation = `spin ${duration}s linear infinite ${Math.random() < 0.5 ? "reverse" : ""
        }`;
    });
  }, [setProgress]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);

    window.addEventListener("scroll", debouncedHandleScroll);
    window.addEventListener("resize", handleResize);

    if (screenWidth > 770) {
      if (lastScrollY < 100) {
        controls.start({ y: isScrollingUp ? 0 : "-100%" });
      } else {
        controls.start({ y: isScrollingUp ? "-100%" : "-250%" });
      }
    } else {
      controls.start({ y: isScrollingUp ? "50%" : "250%" });
    }

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isScrollingUp, controls, lastScrollY, screenWidth]);

  return (
    <nav>
      <div
        className="fixed lg:top-0 bottom-0 h-6 w-screen z-30"
        onMouseOver={() =>
          controls.start({
            y: screenWidth > 770 ? (lastScrollY < 100 ? 0 : "-100%") : "50%",
          })
        }
      ></div>

      <div className="relative w-20 h-20 lg:w-28 lg:h-28 translate-x-4 translate-y-4">
        {[40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53].map((e) => (
          <svg
            key={e}
            className="rings lg:w-36 lg:h-36 absolute stroke-cyan-300 drop-shadow-[0_0_.75rem_var(--cyan-300)] animate-spin will-change-transform"
            viewBox="0 0 110 110"
          >
            <circle
              strokeWidth={Math.random() * 1.75 + 1}
              fill="transparent"
              r={e}
              cx="55"
              cy="55"
            />
          </svg>
        ))}
        <img
          className="logo w-16 h-16 lg:w-28 lg:h-28 translate-x-2 translate-y-2 lg:translate-x-4 lg:translate-y-5 drop-shadow-[0_0_.5rem_var(--cyan-300)]"
          src={logo}
        />
      </div>

      <motion.nav
        initial={{ y: 0 }}
        animate={controls}
        className="fixed w-screen h-10 bottom-8 lg:top-14 z-50"
      >
        <div className="flex justify-center">
          <LavalampMenu
            className="toggleOptions overflow-hidden font-['Rubik_Glitch',_system-ui] border-x-2
              bg-black/30 border-cyan-300
              shadow-[0_0_15px_rgba(0,255,255,0.3)]
              backdrop-blur-md bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
              text-cyan-300 rounded-full"
          >
            <ul className="flex items-center">
              {["Home", "About", "Upcoming", "Events"].map((e) => (
                <li key={e}>
                  <button
                    className="h-10 px-2 lg:px-10 mx-[2px] hover:text-cyan-500
                        rounded-full transition-all duration-300 ease-in-out"
                    onClick={() => scrollToComponent(e)}
                  >
                    {e}
                  </button>
                </li>
              ))}
            </ul>
          </LavalampMenu>
        </div>
      </motion.nav>
    </nav>
  );
}

// Limits the rate at which a function can fire to improve performance
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default Navbar;
