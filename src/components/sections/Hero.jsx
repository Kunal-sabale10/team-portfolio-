import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles, Terminal, Activity } from 'lucide-react';
import { HeroCanvas } from '../canvas/HeroCanvas';
import { MagneticButton } from '../common/MagneticButton';
import { HERO_DATA, TEAM_INFO } from '../../data/portfolioData';

export const Hero = ({ lenisRef, soundEffects }) => {
  const { playClick } = soundEffects;

  const scrollTo = (targetId) => {
    playClick();
    const element = document.getElementById(targetId);
    if (element) {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(element, { offset: -50, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 md:px-10 overflow-hidden"
    >
      {/* 3D WebGL Accent Canvas */}
      <HeroCanvas />

      {/* Ambient Radial Gradient Mesh */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-editorial-accent/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-editorial-accent-secondary/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Meta Tag / Status Pill */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-editorial-border bg-editorial-surface/80 backdrop-blur-md text-[11px] font-mono tracking-widest text-editorial-text uppercase mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{TEAM_INFO.availabilityStatus}</span>
        </motion.div>
      </div>

      {/* Main Kinetic Editorial Typography */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-1 sm:space-y-3"
        >
          <div className="flex flex-wrap items-baseline gap-4">
            <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter text-editorial-text uppercase">
              {HERO_DATA.headlinePrefix}
            </span>
            <span className="text-xs sm:text-sm font-mono tracking-widest text-editorial-accent uppercase px-2 py-0.5 border border-editorial-accent/30 rounded">
              // NO TEMPLATES
            </span>
          </div>

          <div className="text-5xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display font-black tracking-tighter leading-none text-editorial-text uppercase">
            {HERO_DATA.headlineMain}
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic font-normal text-editorial-accent tracking-tight">
              {HERO_DATA.headlineItalic}
            </span>
            <span className="w-12 sm:w-24 h-[2px] bg-editorial-accent hidden sm:inline-block" />
          </div>

          <div className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-editorial-text uppercase flex items-center gap-3">
            <span>{HERO_DATA.headlineSuffix}</span>
            <span className="text-editorial-accent">.</span>
          </div>
        </motion.div>

        {/* Subtext and Action Hub */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          {/* Confident Tagline */}
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg md:text-xl font-sans text-editorial-text-muted max-w-2xl leading-relaxed">
              {HERO_DATA.subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8">
              <MagneticButton
                onClick={() => scrollTo('projects')}
                cursorText="WORK"
                className="px-7 sm:px-9 py-4 rounded-full bg-editorial-accent text-black font-display font-black text-sm tracking-wider uppercase hover:opacity-90 transition-opacity shadow-lg shadow-editorial-accent/20"
              >
                <span>{HERO_DATA.primaryCtaText}</span>
                <ArrowDownRight size={18} />
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollTo('contact')}
                cursorText="START"
                className="px-7 sm:px-9 py-4 rounded-full border border-editorial-border bg-editorial-surface/80 hover:border-editorial-text text-editorial-text font-mono text-xs tracking-widest uppercase transition-colors"
              >
                <span>{HERO_DATA.secondaryCtaText}</span>
              </MagneticButton>
            </div>
          </div>

          {/* Quick Realtime Telemetry Grid */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3 font-mono text-xs">
            {HERO_DATA.quickMetrics.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-editorial-border bg-editorial-surface/60 backdrop-blur-md"
              >
                <div className="text-[10px] text-editorial-text-muted uppercase tracking-wider">
                  {item.label}
                </div>
                <div className="text-base sm:text-lg font-bold text-editorial-accent mt-0.5">
                  {item.value}
                </div>
                <div className="text-[9px] text-editorial-text-muted mt-0.5 truncate">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex items-center justify-between text-xs font-mono text-editorial-text-muted border-t border-editorial-border/60">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-editorial-accent" />
          <span>PORTFOLIO_CORE // REPO_STABLE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent animate-ping" />
          <span>SCROLL TO DESCEND</span>
        </div>
      </div>
    </section>
  );
};
