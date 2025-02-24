import React, { Suspense, useRef, useEffect, useState } from "react";
import { Float, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";
import IcosahedronComponent from "./Icosahedron";

const BallCanvas = ({ icon, index, rows, cols, title, onPointerOver, onPointerOut, onTouchStart }) => {
  const [decal] = useTexture([icon]);
  const ballRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const x = ((index % cols) * 2.3 - (cols * 2.3) / 2);
  const y = (Math.floor(index / cols) * 2.3 - (rows * 2.3) / 2);

  const floatConfig = {
    speed: isMobile ? 0.5 : 1.6,
    rotationIntensity: isMobile ? 0.05 : 0.5,
    floatIntensity: isMobile ? 0.5 : 1
  };

  const handleTouchStart = (event) => {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    if (isTouchWithinArea(touchX, touchY)) {
      onTouchStart(title, event);
    }
  };

  return (
    <>
      <Suspense fallback={<CanvasLoader />}>
        <Float {...floatConfig}>
          <ambientLight intensity={0.00001} />
          <directionalLight position={[1, 1, 5]} intensity={0.12} />
          <IcosahedronComponent
            ref={ballRef}
            decal={decal}
            position={[1.1 + x, -y, 0]}
            onPointerOver={() => onPointerOver({ title, position: { x: 1 + x, y: -y } })}
            onPointerOut={onPointerOut}
            onTouchStart={handleTouchStart}
            isMobile={isMobile}
          />
        </Float>
      </Suspense>
      <Preload all />
    </>
  );
};

export default BallCanvas;
