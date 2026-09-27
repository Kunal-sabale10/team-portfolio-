import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

// Central Scroll-Reactive Morphing Mesh & Particle System
const MorphingExperience = ({ scrollProgress, mousePos, isDark, isMobile }) => {
  const meshRef = useRef();
  const wireRef = useRef();
  const particlesRef = useRef();
  const groupRef = useRef();

  // Particle constellation geometry
  const particleCount = isMobile ? 180 : 450;
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sca = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      sca[i] = Math.random() * 0.05 + 0.02;
    }
    return [pos, sca];
  }, [particleCount]);

  // Color selection based on theme
  const accentColor = useMemo(() => {
    return isDark ? new THREE.Color('#d4ff00') : new THREE.Color('#ff3800');
  }, [isDark]);

  const secondaryColor = useMemo(() => {
    return isDark ? new THREE.Color('#8b5cf6') : new THREE.Color('#2563eb');
  }, [isDark]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const p = scrollProgress.current; // 0 to 1
    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    // 1. Camera interpolation across the sections
    // Hero (0.0) -> About (0.2) -> Team (0.4) -> Projects (0.6) -> Skills (0.8) -> Contact (1.0)
    let targetCamX = 0;
    let targetCamY = 0;
    let targetCamZ = 5.2;

    if (p < 0.2) {
      // Hero section: centered with subtle mouse parallax
      const t = p / 0.2;
      targetCamX = THREE.MathUtils.lerp(0, -1.8, t);
      targetCamY = THREE.MathUtils.lerp(0, 0.4, t);
      targetCamZ = THREE.MathUtils.lerp(5.2, 5.8, t);
    } else if (p < 0.45) {
      // About section: shifts left so right-side text breathes
      const t = (p - 0.2) / 0.25;
      targetCamX = THREE.MathUtils.lerp(-1.8, 1.8, t);
      targetCamY = THREE.MathUtils.lerp(0.4, -0.4, t);
      targetCamZ = THREE.MathUtils.lerp(5.8, 6.2, t);
    } else if (p < 0.7) {
      // Team / Projects: wide panoramic angle
      const t = (p - 0.45) / 0.25;
      targetCamX = THREE.MathUtils.lerp(1.8, -1.2, t);
      targetCamY = THREE.MathUtils.lerp(-0.4, 0.6, t);
      targetCamZ = THREE.MathUtils.lerp(6.2, 5.6, t);
    } else if (p < 0.88) {
      // Skills section: pull back for orbital view
      const t = (p - 0.7) / 0.18;
      targetCamX = THREE.MathUtils.lerp(-1.2, 1.2, t);
      targetCamY = THREE.MathUtils.lerp(0.6, -0.3, t);
      targetCamZ = THREE.MathUtils.lerp(5.6, 6.0, t);
    } else {
      // Contact section: looking upward into the transmission
      const t = (p - 0.88) / 0.12;
      targetCamX = THREE.MathUtils.lerp(1.2, 0, t);
      targetCamY = THREE.MathUtils.lerp(-0.3, 1.6, t);
      targetCamZ = THREE.MathUtils.lerp(6.0, 5.0, t);
    }

    // Add gentle mouse tilt to camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX + mx * 0.6, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY + my * 0.6, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.05);
    state.camera.lookAt(0, 0, 0);

    // 2. Central Mesh Animations
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2 + p * Math.PI * 1.5;
      meshRef.current.rotation.y = time * 0.25 + mx * 0.5;
      
      // Scale dynamic breathing + scroll reaction
      const scale = (isMobile ? 1.0 : 1.3) + Math.sin(time * 1.2) * 0.06 - p * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
    }

    // 3. Surrounding wireframe geometry
    if (wireRef.current) {
      wireRef.current.rotation.x = -time * 0.15;
      wireRef.current.rotation.y = -time * 0.2 + p * Math.PI;
      const wireScale = (isMobile ? 1.4 : 1.8) + Math.cos(time * 0.9) * 0.08;
      wireRef.current.scale.set(wireScale, wireScale, wireScale);
    }

    // 4. Particle Constellation
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.04 + p * Math.PI * 0.8 + mx * 0.2;
      particlesRef.current.rotation.x = my * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Core Morphing Mesh with MeshDistortMaterial */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, isMobile ? 3 : 5]} />
          <MeshDistortMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={isDark ? 0.25 : 0.15}
            distort={0.42}
            speed={2.2}
            roughness={isDark ? 0.3 : 0.4}
            metalness={isDark ? 0.75 : 0.6}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* 2. Concentric Wireframe Cage */}
      <mesh ref={wireRef}>
        <dodecahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={secondaryColor}
          wireframe={true}
          transparent={true}
          opacity={isDark ? 0.35 : 0.45}
          roughness={0.5}
        />
      </mesh>

      {/* 3. Orbiting Particle Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.035 : 0.045}
          color={isDark ? '#ffffff' : '#0e0e11'}
          transparent={true}
          opacity={isDark ? 0.5 : 0.35}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
};

export const SceneExperience = () => {
  const { isDark } = useTheme();
  const scrollProgress = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Track normalized scroll progress
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress.current = Math.min(1, Math.max(0, scrollY / maxScroll));
      }
    };

    // Track mouse coordinates (-1 to 1)
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Physically Based Lighting System reacting to Theme */}
        <ambientLight
          intensity={isDark ? 0.6 : 0.8}
          color={isDark ? '#1a1a24' : '#f5f5f0'}
        />

        {/* Primary Key Directional Light */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={isDark ? 2.5 : 2.0}
          color={isDark ? '#d4ff00' : '#ff3800'}
        />

        {/* Rim Point Light for Specular Edges */}
        <pointLight
          position={[-6, -4, -2]}
          intensity={isDark ? 1.8 : 1.2}
          color={isDark ? '#8b5cf6' : '#2563eb'}
        />

        {/* Fill Point Light */}
        <pointLight
          position={[0, 4, 3]}
          intensity={0.5}
          color="#ffffff"
        />

        {/* 3D World Scene */}
        <MorphingExperience
          scrollProgress={scrollProgress}
          mousePos={mousePos}
          isDark={isDark}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
};