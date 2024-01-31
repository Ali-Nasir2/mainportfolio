import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const Computers = () => {
    const computer = useGLTF("./desktop_pc/scene.gltf");

    return (
      <mesh>
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={{ width: 256, height: 256 }}
          shadow-bias={0.00001}
          shadow-radius={2}
        />
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.42 : 0.75}
          position={isMobile ? [0, -3.4, -1] : [0, -3.6, -1.5]}
          rotation={[-0.01, -0.2, -0.1]}
        />
        <hemisphereLight intensity={1.3} groundColor="black" />
      </mesh>
    );
  };

  return (
    <Canvas
      frameloop="always"
      camera={isMobile ? { position: [20, 20, 9], fov: 20 } : { position: [20, 3, 5], fov: 34 }}
      dpr={window.devicePixelRatio}
      gl={{ preserveDrawingBuffer: true, antialias: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={isMobile ? 0.2 : 0.5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 100}
        />
        <Computers />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
