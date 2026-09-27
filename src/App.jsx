import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useSoundEffects } from './hooks/useSoundEffects';
import { CustomCursor } from './components/common/CustomCursor';
import { Preloader } from './components/common/Preloader';
import { ScrollProgress } from './components/common/ScrollProgress';
import { GrainOverlay } from './components/common/GrainOverlay';
import { SceneExperience } from './components/canvas/SceneExperience';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// The 6 Mandatory Sections in exact sequence:
import { Hero } from './components/sections/Hero';         // 1. Hero
import { About } from './components/sections/About';       // 2. About
import { Team } from './components/sections/Team';         // 3. Team
import { Projects } from './components/sections/Projects'; // 4. Projects
import { Skills } from './components/sections/Skills';     // 5. Skills
import { Contact } from './components/sections/Contact';   // 6. Contact

export function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const lenisRef = useRef(null);
  const soundEffects = useSoundEffects();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-editorial-bg text-editorial-text selection:bg-editorial-accent selection:text-black">
      {/* 1. Cinematic Preloader with Counter */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* 2. PERSISTENT CONTINUOUS 3D R3F WORLD (Across all sections) */}
      <SceneExperience />

      {/* 3. Tactile Film Grain & Noise Overlay */}
      <GrainOverlay />

      {/* 4. Smooth Top Reading Progress Bar */}
      <ScrollProgress />

      {/* 5. Custom Trailing Fluid Magnetic Cursor */}
      <CustomCursor />

      {/* 6. Sticky Navigation Bar */}
      <Navbar soundEffects={soundEffects} lenisRef={lenisRef} />

      {/* 7. Main Content Area (Mandatory Sections 1 to 6 in exact order) */}
      <main className="relative z-10">
        {/* SECTION 1: HERO (Centric 3D mesh distortion + cursor parallax) */}
        <Hero lenisRef={lenisRef} soundEffects={soundEffects} />

        {/* SECTION 2: ABOUT (3D camera orbits to left lateral view) */}
        <About />

        {/* SECTION 3: TEAM (3D tilt cards with perspective & dynamic lighting) */}
        <Team soundEffects={soundEffects} />

        {/* SECTION 4: PROJECTS (3D floating panels with layered depth) */}
        <Projects soundEffects={soundEffects} />

        {/* SECTION 5: SKILLS (Interactive 3D Orbital Canvas Cluster) */}
        <Skills soundEffects={soundEffects} />

        {/* SECTION 6: CONTACT (3D camera tilts upward into transmission stream) */}
        <Contact soundEffects={soundEffects} />
      </main>

      {/* 8. Editorial Closing Footer */}
      <Footer lenisRef={lenisRef} soundEffects={soundEffects} />
    </div>
  );
}