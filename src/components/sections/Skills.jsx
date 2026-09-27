import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, Orbit } from 'lucide-react';
import { SKILLS_DATA } from '../../data/portfolioData';
import { Skills3DCanvas } from '../canvas/Skills3DCanvas';

export const Skills = ({ soundEffects }) => {
  const [activeTab, setActiveTab] = useState(SKILLS_DATA.categories[0].id);
  const { playHover, playClick } = soundEffects;

  const currentCategory = SKILLS_DATA.categories.find(c => c.id === activeTab) || SKILLS_DATA.categories[0];

  return (
    <section
      id="skills"
      className="relative py-28 sm:py-36 border-t border-editorial-border bg-editorial-bg/60 backdrop-blur-sm overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mb-12">
        {/* Section Header */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-editorial-accent uppercase mb-3">
          <Cpu size={16} />
          <span>{SKILLS_DATA.sectionTag}</span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tight text-editorial-text uppercase">
          THE CRAFT <span className="font-serif italic font-normal text-editorial-accent">Arsenal</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base font-sans text-editorial-text-muted max-w-xl">
          {SKILLS_DATA.subtext} Rendered below in a continuous, real-time interactive 3D WebGL orbital cluster.
        </p>
      </div>

      {/* CORE 3D REQUIREMENT: Real-Time 3D Orbital Canvas Cluster */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mb-16">
        <Skills3DCanvas />
      </div>

      {/* Categorized Tech Breakdown & Proficiency Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Tab Switchers */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-editorial-border">
          {SKILLS_DATA.categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playClick();
                  setActiveTab(cat.id);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-editorial-text text-editorial-bg font-bold shadow-md'
                    : 'border border-editorial-border bg-editorial-surface/70 text-editorial-text-muted hover:text-editorial-text hover:border-editorial-accent'
                }`}
                data-cursor="TAB"
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Selected Category Details & Skill Proficiency Glow Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="text-xs font-mono text-editorial-accent uppercase tracking-widest">
            {currentCategory.description}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {currentCategory.items.map((skill, idx) => (
              <motion.div
                key={skill.name}
                whileHover={{ y: -3, borderColor: 'var(--color-accent)' }}
                className="p-6 rounded-2xl border border-editorial-border bg-editorial-surface transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-bold text-base sm:text-lg text-editorial-text">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs font-bold text-editorial-accent">
                    {skill.level}%
                  </span>
                </div>

                {/* Animated Level Bar */}
                <div className="w-full h-1.5 bg-editorial-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-editorial-accent-secondary to-editorial-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};