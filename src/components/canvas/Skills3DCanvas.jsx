import React, { useRef, useState, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

const SKILL_ITEMS = [
  { name: 'THREE.JS', level: 'ADVANCED' },
  { name: 'REACT 19', level: 'CORE' },
  { name: 'GLSL SHADERS', level: 'GPU' },
  { name: 'WEBGL 2.0', level: 'HARDWARE' },
  { name: 'TAILWIND CSS', level: 'DESIGN' },
  { name: 'FRAMER MOTION', level: 'PHYSICS' },
  { name: 'LENIS SCROLL', level: 'MOMENTUM' },
  { name: 'WEB AUDIO', level: 'SYNTHESIS' },
  { name: 'VITE BUNDLER', level: 'RUNTIME' },
  { name: 'TYPESCRIPT', level: 'ENGINEERING' },
  { name: 'BLENDER 3D', level: 'SPATIAL' },
  { name: 'AWWWARDS CRAFT', level: 'SOTD' },
];

const OrbitingBadge = ({ text, subtext, position, isDark }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const primaryColor = isDark ? '#d4ff00' : '#ff3800';
  const bgColor = isDark ? '#14141c' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#0e0e11';

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.25 : 1.0}
    >
      {/* 3D Glass Badge Plate */}
      <mesh>
        <boxGeometry args={[1.6, 0.65, 0.08]} />
        <meshStandardMaterial
          color={hovered ? primaryColor : bgColor}
          roughness={0.2}
          metalness={0.7}
          transparent={true}
          opacity={hovered ? 0.95 : 0.8}
        />
      </mesh>

      {/* Wireframe Outline */}
      <mesh>
        <boxGeometry args={[1.62, 0.67, 0.09]} />
        <meshBasicMaterial
          color={hovered ? textColor : primaryColor}
          wireframe={true}
          transparent={true}
          opacity={hovered ? 1.0 : 0.4}
        />
      </mesh>

      {/* Tech Skill 3D Text (uses default built-in font for instantaneous zero-latency render) */}
      <Text
        position={[0, 0.08, 0.06]}
        fontSize={0.14}
        color={hovered ? '#000000' : textColor}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>

      {/* Subtext tag */}
      <Text
        position={[0, -0.14, 0.06]}
        fontSize={0.08}
        color={hovered ? '#1a1a1a' : primaryColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        [{subtext}]
      </Text>
    </group>
  );
};

const OrbitingCluster = ({ isDark }) => {
  const groupRef = useRef();

  const badges = useMemo(() => {
    const radius = 3.4;
    const total = SKILL_ITEMS.length;

    return SKILL_ITEMS.map((skill, i) => {
      const angle = (i / total) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2) * 0.8;
      return {
        ...skill,
        position: [x, y, z],
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x = Math.sin(groupRef.current.rotation.y * 0.5) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central 3D Energy Core */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <mesh>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color={isDark ? '#d4ff00' : '#ff3800'}
            wireframe={true}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>

      {/* Orbiting Tech Badges */}
      {badges.map((b) => (
        <OrbitingBadge
          key={b.name}
          text={b.name}
          subtext={b.level}
          position={b.position}
          isDark={isDark}
        />
      ))}
    </group>
  );
};

const OrbitClusterControl = () => {
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      rotateSpeed={0.6}
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 1.7}
      minPolarAngle={Math.PI / 3}
    />
  );
};

export const Skills3DCanvas = () => {
  const { isDark } = useTheme();
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) return null;

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] rounded-2xl overflow-hidden border border-editorial-border bg-editorial-surface/40 backdrop-blur-md">
      {/* Overlay Instructions Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full border border-editorial-border bg-editorial-bg/80 text-[10px] font-mono tracking-widest text-editorial-accent uppercase pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent animate-pulse" />
        <span>INTERACTIVE 3D ORBIT // DRAG TO ROTATE SCENE</span>
      </div>

      <Canvas
        camera={{ position: [0, 1.2, 5.8], fov: 50 }}
        dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={isDark ? 0.7 : 0.9} />
          <pointLight position={[5, 6, 5]} intensity={2.5} color={isDark ? '#d4ff00' : '#ff3800'} />
          <pointLight position={[-5, -4, -3]} intensity={1.5} color={isDark ? '#8b5cf6' : '#2563eb'} />

          <OrbitClusterControl />
          <OrbitingCluster isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
};