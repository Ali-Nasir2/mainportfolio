import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import BallCanvas from "./canvas/Ball";
import Tooltip from "./common/Tooltip";
import { styles } from "../styles";
import { useLanguage } from "../context/LanguageContext";

const LoadingFallback = () => (
  <Html center>
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  </Html>
);

const Tech = () => {
  const { t, currentLanguage } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobile1, setIsMobile1] = useState(false);
  const [isMobile2, setIsMobile2] = useState(false);
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [touchedTitle, setTouchedTitle] = useState(null);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const techRef = useRef(null);

  useEffect(() => {
    const updateViewportWidth = () => {
    };

    // Print the initial viewport width
    updateViewportWidth();

    // Set up an interval to print the viewport width every 2 seconds
    const intervalId = setInterval(updateViewportWidth, 2000);

    const mediaQuery = window.matchMedia("(max-width: 499px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    const mediaQuery1 = window.matchMedia("(min-width: 500px) and (max-width: 900px)");
    setIsMobile1(mediaQuery1.matches);

    const handleMediaQueryChange1 = (event) => {
      setIsMobile1(event.matches);
    };

    mediaQuery1.addEventListener("change", handleMediaQueryChange1);

    const mediaQuery2 = window.matchMedia("(min-width: 901px) and (max-width: 1300px)");
    setIsMobile2(mediaQuery2.matches);

    const handleMediaQueryChange2 = (event) => {
      setIsMobile2(event.matches);
    };

    mediaQuery2.addEventListener("change", handleMediaQueryChange2);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      mediaQuery1.removeEventListener("change", handleMediaQueryChange1);
      mediaQuery2.removeEventListener("change", handleMediaQueryChange2);
    };
  }, [isMobile, isMobile1, isMobile2]);

  const cols = isMobile ? 4 : isMobile1 ? 5 : isMobile2 ? 7 : 8;
  const rows = 6;
  const fox = isMobile ? 25 : 30;

  const handleMouseMove = (event) => {
    if (techRef.current) {
      const rect = techRef.current.getBoundingClientRect();
      const relativePosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      setMousePosition(relativePosition);
    }
  };

  const handlePointerDown = (title, event) => {
    setTouchedTitle(title);

    if (techRef.current) {
      const rect = techRef.current.getBoundingClientRect();
      const relativePosition = {
        x: (event.touches[0].clientX - rect.left) / rect.width,
        y: (event.touches[0].clientY - rect.top) / rect.height,
      };
      setTouchPosition(relativePosition);
      setShowTooltip(true);

      const tooltipVisibilityDuration = 2000;
      clearTimeout(timeoutId);

      const timeoutId = setTimeout(() => {
        setTouchedTitle(null);
        setShowTooltip(false);
      }, tooltipVisibilityDuration);
    }
  };

  const canvasStyle = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
  };

  const getTranslatedTitle = (title) => {
    return t(`techNames.${title}`) || title;
  };

  return (
    <div ref={techRef} className="flex flex-col items-center w-full" onMouseMove={handleMouseMove}>
      <p className={`${styles.sectionHeadText} text-center`}>
        {t('technologiesWorkedWith')}
      </p>
      <div style={{ ...canvasStyle }} className="relative">
        <Canvas
          style={{ width: '100%', height: '100%' }}
          frameloop={isMobile ? "demand" : "always"}
          dpr={[1, isMobile ? 1 : 1.5]}
          gl={{ 
            powerPreference: "high-performance",
            antialias: false,
            alpha: false,
            stencil: false,
            depth: true,
            precision: "lowp"
          }}
          camera={isMobile ? 
            { position: [5.3, -6.2, 50], fov: 40, rotation: [0, Math.PI / 30, 0] } : 
            isMobile1 ? 
              { position: [5.3, -5, 50], fov: 31, rotation: [0, Math.PI / 30, 0] } : 
            isMobile2 ? 
              { position: [5.3, -2.6, 50], fov: 29, rotation: [0, Math.PI / 30, 0] } : 
              { position: [3, -0.5, 20], fov: 47, rotation: [0, Math.PI / 30, 0] }
          }
          performance={{ min: 0.5 }}
        >
          {technologies.map((technology, index) => (
            <Suspense 
              key={technology.name} 
              fallback={<LoadingFallback />}
            >
              <BallCanvas
                key={technology.name}
                icon={technology.icon}
                index={index}
                rows={rows}
                cols={cols}
                title={getTranslatedTitle(technology.name)}
                onPointerOver={() => setHoveredTitle(getTranslatedTitle(technology.name))}
                onPointerOut={() => setHoveredTitle(null)}
                onTouchStart={(title, event) => handlePointerDown(getTranslatedTitle(title), event)}
              />
            </Suspense>
          ))}
        </Canvas>
      </div>
      {showTooltip && touchedTitle && <Tooltip title={touchedTitle} position={touchPosition} />}
      {hoveredTitle && <Tooltip title={hoveredTitle} position={mousePosition} />}
    </div>
  );
};

export default SectionWrapper(Tech, "");
