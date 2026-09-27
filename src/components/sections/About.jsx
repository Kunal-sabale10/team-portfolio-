import React from 'react';
import { motion } from 'framer-motion';
import { Boxes, Activity, Award, Zap, Compass, Flame } from 'lucide-react';
import { ABOUT_DATA, TEAM_INFO } from '../../data/portfolioData';

const iconMap = {
  Boxes: Boxes,
  Activity: Activity,
  Award: Award,
  Zap: Zap,
};

export const About = () => {
  return (
    <section
      id="about"
      className="relative py-28 sm:py-36 px-4 sm:px-6 md:px-10 border-t border-editorial-border bg-editorial-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Monospace Tag */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-editorial-accent uppercase mb-8">
          <Flame size={16} />
          <span>{ABOUT_DATA.sectionTag}</span>
        </div>

        {/* Asymmetrical Editorial Manifesto Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bold Headline */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-tight text-editorial-text uppercase">
              {ABOUT_DATA.headline}
            </h2>

            <div className="mt-8 sm:mt-10 space-y-6 text-base sm:text-lg text-editorial-text-muted leading-relaxed font-sans">
              {ABOUT_DATA.manifesto.map((paragraph, idx) => (
                <p key={idx} className={idx === 0 ? "text-editorial-text font-medium" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quote Callout */}
            <div className="mt-10 p-6 rounded-2xl border-l-2 border-editorial-accent bg-editorial-surface/80 border-t border-r border-b border-editorial-border">
              <p className="font-serif italic text-lg sm:text-xl text-editorial-text">
                "Our north star is creative boldness. We don't ask 'What is the safe standard?' We ask 'What will make people stop and stare?'"
              </p>
              <div className="mt-3 text-xs font-mono text-editorial-accent uppercase tracking-wider">
                — {TEAM_INFO.name} STUDIO MANIFESTO
              </div>
            </div>
          </div>

          {/* Right Column: Live Telemetry & Vibe Stats */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-editorial-text-muted mb-2 flex items-center justify-between">
              <span>// SYSTEM TELEMETRY</span>
              <span className="text-editorial-accent">BENCHMARK 2026</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {ABOUT_DATA.telemetry.map((item, idx) => {
                const IconComponent = iconMap[item.icon] || Zap;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, borderColor: 'var(--color-accent)' }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-2xl border border-editorial-border bg-editorial-surface transition-colors"
                  >
                    <IconComponent size={20} className="text-editorial-accent mb-3" />
                    <div className="text-3xl sm:text-4xl font-display font-black text-editorial-text">
                      {item.metric}
                    </div>
                    <div className="text-[10px] font-mono tracking-wider text-editorial-text-muted uppercase mt-1">
                      {item.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mission Vibe Card */}
            <div className="p-6 rounded-2xl border border-editorial-border bg-editorial-surface-elevated/80 mt-6">
              <div className="flex items-center gap-2 text-xs font-mono text-editorial-accent uppercase mb-2">
                <Compass size={14} />
                <span>TEAM ATMOSPHERE</span>
              </div>
              <p className="text-xs sm:text-sm text-editorial-text-muted font-sans leading-relaxed">
                Zero bureaucracy, rapid iterative prototypes, obsessive attention to sub-pixel motion, and a collective hunger for hackathon victory.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Philosophy Pillars (Off-Grid Asymmetrical Cards) */}
        <div className="mt-20 sm:mt-28">
          <div className="text-xs font-mono uppercase tracking-widest text-editorial-text-muted mb-8">
            // CORE ANATOMY
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABOUT_DATA.pillars.map((pillar) => (
              <motion.div
                key={pillar.index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative p-8 rounded-2xl border border-editorial-border bg-editorial-surface hover:border-editorial-accent/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between font-mono text-xs text-editorial-text-muted mb-6">
                    <span className="text-2xl font-display font-black text-editorial-accent">
                      {pillar.index}
                    </span>
                    <span className="uppercase tracking-widest px-2 py-0.5 rounded border border-editorial-border group-hover:border-editorial-accent/30 transition-colors">
                      {pillar.accentWord}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-editorial-text group-hover:text-editorial-accent transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="mt-4 text-sm text-editorial-text-muted font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-editorial-border/60 flex items-center justify-between text-xs font-mono text-editorial-text-muted">
                  <span>STATUS: ACTIVE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent group-hover:scale-150 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
