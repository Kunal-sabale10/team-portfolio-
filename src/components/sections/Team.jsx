import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Sparkles, Quote, Terminal, ArrowUpRight } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/portfolioData';

export const Team = ({ soundEffects }) => {
  const [activeMember, setActiveMember] = useState(null);
  const { playHover, playClick } = soundEffects;

  return (
    <section
      id="team"
      className="relative py-28 sm:py-36 px-4 sm:px-6 md:px-10 border-t border-editorial-border bg-editorial-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-editorial-accent uppercase mb-3">
              <Terminal size={16} />
              <span>02 // THE OPERATIVES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-editorial-text uppercase">
              MEET THE <span className="font-serif italic font-normal text-editorial-accent">Architects</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base font-sans text-editorial-text-muted max-w-md">
            Four specialized disciplines united by obsessive precision. Hover cards to inspect core capabilities and transmissions.
          </p>
        </div>

        {/* Interactive Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TEAM_MEMBERS.map((member, index) => {
            const isHovered = activeMember === member.id;

            return (
              <motion.div
                key={member.id}
                onMouseEnter={() => {
                  setActiveMember(member.id);
                  playHover();
                }}
                onMouseLeave={() => setActiveMember(null)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl border border-editorial-border bg-editorial-surface overflow-hidden flex flex-col justify-between transition-colors duration-300 hover:border-editorial-accent shadow-sm"
                data-cursor="MEMBER"
              >
                {/* Top Avatar Area with Image Filter & Hover Zoom */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-editorial-surface-elevated">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-editorial-surface via-transparent to-transparent opacity-90" />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
                    <span className="px-2.5 py-1 rounded-full bg-editorial-bg/80 backdrop-blur-md border border-editorial-border text-editorial-accent font-bold">
                      {member.badge}
                    </span>
                    <span className="text-white/80 drop-shadow">0{index + 1}</span>
                  </div>

                  {/* Quote Hover Drawer */}
                  <div
                    className={`absolute inset-x-4 bottom-4 p-3.5 rounded-xl bg-editorial-bg/95 backdrop-blur-md border border-editorial-border transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                  >
                    <div className="flex items-start gap-1.5 text-xs font-serif italic text-editorial-text">
                      <Quote size={12} className="text-editorial-accent shrink-0 mt-0.5" />
                      <p className="line-clamp-2">"{member.quote}"</p>
                    </div>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 pt-2 flex flex-col justify-between flex-grow space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight text-editorial-text group-hover:text-editorial-accent transition-colors">
                      {member.name}
                    </h3>

                    <p className="text-xs font-mono text-editorial-accent mt-1 tracking-wide">
                      {member.role}
                    </p>

                    <p className="text-xs font-sans text-editorial-text-muted mt-3 line-clamp-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  {/* Specialties Pills */}
                  <div className="pt-2 border-t border-editorial-border/60">
                    <div className="text-[10px] font-mono text-editorial-text-muted uppercase tracking-wider mb-2">
                      CORE ARSENAL
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {member.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-0.5 rounded text-[10px] font-mono border border-editorial-border bg-editorial-surface-elevated text-editorial-text"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Transmissions */}
                  <div className="flex items-center gap-3 pt-2 text-editorial-text-muted">
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={playClick}
                        className="p-2 rounded-full border border-editorial-border hover:text-editorial-accent hover:border-editorial-accent transition-colors"
                        aria-label={`${member.name} GitHub`}
                        data-cursor="GITHUB"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        onClick={playClick}
                        className="p-2 rounded-full border border-editorial-border hover:text-editorial-accent hover:border-editorial-accent transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                        data-cursor="LINKEDIN"
                      >
                        <Linkedin size={14} />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        onClick={playClick}
                        className="p-2 rounded-full border border-editorial-border hover:text-editorial-accent hover:border-editorial-accent transition-colors"
                        aria-label={`${member.name} Twitter`}
                        data-cursor="TWITTER"
                      >
                        <Twitter size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
