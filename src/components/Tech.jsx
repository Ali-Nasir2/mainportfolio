import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import BallCanvas from "./canvas/Ball";
import Tooltip from "./common/Tooltip";
import { styles } from "../styles";

const Tech = () => {
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

    const mediaQuery = window.matchMedia("(max-width: 650px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    const mediaQuery1 = window.matchMedia("(min-width: 651px) and (max-width: 900px)");
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

  const cols = isMobile ? 3 : isMobile1 ? 4 : isMobile2 ? 5 : 8;
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
    width: isMobile ? '100%' : isMobile1 ? '110%' : isMobile2 ? '100%' : '110%' ,
    height: isMobile ? '1500px' : isMobile1 ?  '1600px' : isMobile2 ?  '1200px' : '900px',
  };

  return (
    <div ref={techRef} className="flex flex-col items-center" onMouseMove={handleMouseMove}>
      <p className={`${styles.sectionHeadText}  marginLeft: '50px' text-center`}>
        Technologies I've worked with
      </p>
      <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
        {/* Add your heading text here */}
      </h2>

      <div style={{ ...canvasStyle, marginLeft: '0px' }} className="flex flex-row flex-wrap justify-center gap-0 items-center">
  <Canvas
    frameloop="always"
    dpr={window.devicePixelRatio}
    gl={{ preserveDrawingBuffer: true, antialias: false,  powerPreference: "high-performance" }}
    camera={isMobile ? { position: [5.3, -7, 50], fov: 32, rotation: [0, Math.PI / 30, 0] } : isMobile1 ? { position: [5.3, -3, 50], fov: 22, rotation: [0, Math.PI / 30, 0] } : isMobile2 ? { position: [5.3, -1, 50], fov: 18, rotation: [0, Math.PI / 30, 0] } : { position: [3, 2, 20], fov: 33, rotation: [0, Math.PI / 30, 0] }}
  >
    {technologies.map((technology, index) => (
      <Suspense key={technology.name} fallback={null}>
        <BallCanvas
          key={technology.name}
          icon={technology.icon}
          index={index}
          rows={rows}
          cols={cols}
          title={technology.name}
          onPointerOver={() => setHoveredTitle(technology.name)}
          onPointerOut={() => setHoveredTitle(null)}
          onTouchStart={(title, event) => handlePointerDown(title, event)}
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
