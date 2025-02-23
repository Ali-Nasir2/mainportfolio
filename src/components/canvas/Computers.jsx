import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import * as THREE from 'three';

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene3.gltf", true, undefined, (loader) => {
    // Configure KTX2 loader with a temporary renderer
    const renderer = new THREE.WebGLRenderer();
    const ktx2Loader = new KTX2Loader()
      .setTranscoderPath('/basis/')
      .detectSupport(renderer);
    
    renderer.dispose(); // Clean up temporary renderer
    
    loader.setKTX2Loader(ktx2Loader);
    loader.setMeshoptDecoder(MeshoptDecoder);
  });

  // Add rotation state with useRef
  const computerRef = React.useRef();

  // Add rotation animation
  useFrame((state, delta) => {
    if (computerRef.current) {
      computerRef.current.rotation.y += delta * 0.2; // Adjust 0.2 to control rotation speed
    }
  });

  return (
    <mesh>
      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={1.5} />
      
      {/* Increased hemisphere light intensity */}
      <hemisphereLight intensity={0.5} groundColor="black" />
      
      {/* Adjusted spotlight */}
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={1024}
      />
      
      {/* Additional point lights for better coverage */}
      <pointLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1} />

      <primitive
        ref={computerRef}
        object={computer.scene}
        scale={isMobile ? 0.42 : 0.75}
        position={isMobile ? [0, -2.3, -1] : [0, -3.6, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop={isMobile ? "demand" : "always"}
      shadows={false}
      dpr={[1, isMobile ? 1.5 : 2]}
      camera={isMobile ? 
        { position: [20, 20, 9], fov: 20 } : 
        { position: [20, 3, 5], fov: 34 }}
      gl={{ 
        powerPreference: "high-performance",
        antialias: !isMobile,
        alpha: false,
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 0);
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1;
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
