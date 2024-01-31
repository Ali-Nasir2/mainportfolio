import React, { forwardRef, useEffect, useState } from "react";
import { Box, Icosahedron, Decal } from "@react-three/drei";

const IcosahedronComponent = forwardRef(({ decal, position, onPointerOver, onPointerOut }, ref) => {
  const [args, setArgs] = useState([0.84, 2]);
  const [useCubeGeometry, setUseCubeGeometry] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check the current window width
      const maxWidth = window.innerWidth;

      // Update args based on the condition
      if (maxWidth <= 550) {
        setArgs([1.2, 1.2, 1.2]);
        setUseCubeGeometry(true);
      } else {
        setArgs([0.84, 2]);
        setUseCubeGeometry(false);
      }
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Call the handleResize function once to set initial values
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <mesh position={position} ref={ref} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {useCubeGeometry ? (
        <boxGeometry args={args} />
      ) : (
        <icosahedronGeometry args={args} />
      )}
      <meshStandardMaterial color="#2A353C" flatShading />
      <Decal position={[0, 0, 0.8]} rotation={[2 * Math.PI, 0, 6.25]} scale={1.1} map={decal} flatShading />
    </mesh>
  );
});

export default IcosahedronComponent;
