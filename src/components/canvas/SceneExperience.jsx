import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
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

  const particleCount = isMobile ? 160 : 380;
  const [positions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return [pos];
  }, [particleCount]);

  const accentColor = useMemo(() => {
    return isDark ? new THREE.Color('#d4ff00') : new THREE.Color('#ff3800');
  }, [isDark]);

  const secondaryColor = useMemo(() => {
    return isDark ? new THREE.Color('#8b5cf6') : new THREE.Color('#2563eb');
  }, [isDark]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const p = scrollProgress.current;
    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    let targetCamX = 0;
    let targetCamY = 0;
    let targetCamZ = 5.2;

    if (p < 0.2) {
      const t = p / 0.2;
      targetCamX = THREE.MathUtils.lerp(0, -1.8, t);
      targetCamY = THREE.MathUtils.lerp(0, 0.4, t);
      targetCamZ = THREE.MathUtils.lerp(5.2, 5.8, t);
    } else if (p < 0.45) {
      const t = (p - 0.2) / 0.25;
      targetCamX = THREE.MathUtils.lerp(-1.8, 1.8, t);
      targetCamY = THREE.MathUtils.lerp(0.4, -0.4, t);
      targetCamZ = THREE.MathUtils.lerp(5.8, 6.2, t);
    } else if (p < 0.7) {
      const t = (p - 0.45) / 0.25;
      targetCamX = THREE.MathUtils.lerp(1.8, -1.2, t);
      targetCamY = THREE.MathUtils.lerp(-0.4, 0.6, t);
      targetCamZ = THREE.MathUtils.lerp(6.2, 5.6, t);
    } else if (p < 0.88) {
      const t = (p - 0.7) / 0.18;
      targetCamX = THREE.MathUtils.lerp(-1.2, 1.2, t);
      targetCamY = THREE.MathUtils.lerp(0.6, -0.3, t);
      targetCamZ = THREE.MathUtils.lerp(5.6, 6.0, t);
    } else {
      const t = (p - 0.88) / 0.12;
      targetCamX = THREE.MathUtils.lerp(1.2, 0, t);
      targetCamY = THREE.MathUtils.lerp(-0.3, 1.6, t);
      targetCamZ = THREE.MathUtils.lerp(6.0, 5.0, t);
    }

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX + mx * 0.6, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY + my * 0.6, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.05);
    state.camera.lookAt(0, 0, 0);

    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2 + p * Math.PI * 1.5;
      meshRef.current.rotation.y = time * 0.25 + mx * 0.5;
      const scale = (isMobile ? 0.95 : 1.25) + Math.sin(time * 1.2) * 0.05 - p * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
    }

    if (wireRef.current) {
      wireRef.current.rotation.x = -time * 0.15;
      wireRef.current.rotation.y = -time * 0.2 + p * Math.PI;
      const wireScale = (isMobile ? 1.3 : 1.7) + Math.cos(time * 0.9) * 0.07;
      wireRef.current.scale.set(wireScale, wireScale, wireScale);
    }

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
          <icosahedronGeometry args={[1, isMobile ? 3 : 4]} />
          <MeshDistortMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={isDark ? 0.25 : 0.15}
            distort={0.4}
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
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress.current = Math.min(1, Math.max(0, scrollY / maxScroll));
      }
    };

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

  if (!hasWebGL) return null;

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
        <Suspense fallback={null}>
          <ambientLight
            intensity={isDark ? 0.6 : 0.8}
            color={isDark ? '#1a1a24' : '#f5f5f0'}
          />

          <directionalLight
            position={[5, 8, 5]}
            intensity={isDark ? 2.5 : 2.0}
            color={isDark ? '#d4ff00' : '#ff3800'}
          />

          <pointLight
            position={[-6, -4, -2]}
            intensity={isDark ? 1.8 : 1.2}
            color={isDark ? '#8b5cf6' : '#2563eb'}
          />

          <pointLight
            position={[0, 4, 3]}
            intensity={0.5}
            color="#ffffff"
          />

          <MorphingExperience
            scrollProgress={scrollProgress}
            mousePos={mousePos}
            isDark={isDark}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};