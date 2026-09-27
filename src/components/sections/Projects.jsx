import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers, Eye, Zap } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { ProjectModal } from '../common/ProjectModal';
import { MagneticButton } from '../common/MagneticButton';
import { Tilt3DCard } from '../common/Tilt3DCard';

export const Projects = ({ soundEffects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { playClick, playHover } = soundEffects;

  const openProject = (project) => {
    playClick();
    setSelectedProject(project);
  };

  return (
    <section
      id="projects"
      className="relative py-28 sm:py-36 px-4 sm:px-6 md:px-10 border-t border-editorial-border bg-editorial-bg/60 backdrop-blur-sm overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-editorial-accent uppercase mb-3">
              <Layers size={16} />
              <span>03 // ARCHIVE OF WORK</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tight text-editorial-text uppercase">
              SELECTED <span className="font-serif italic font-normal text-editorial-accent">Creations</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base font-sans text-editorial-text-muted max-w-md">
            Interactive spatial prototypes rendered in 3D floating panels with layered depth. Click any artifact to inspect case study.
          </p>
        </div>

        {/* Scroll-Driven Editorial Showcase with 3D Floating Panels */}
        <div className="space-y-28 sm:space-y-40">
          {PROJECTS_DATA.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* 3D Floating Panel Preview */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'order-1' : 'order-1 lg:order-2'
                  }`}
                >
                  <Tilt3DCard
                    maxTilt={14}
                    className="border border-editorial-border bg-editorial-surface rounded-2xl overflow-hidden shadow-2xl cursor-pointer hover:border-editorial-accent"
                    onClick={() => openProject(project)}
                    data-cursor="EXPLORE"
                  >
                    {/* Layer 0: Base Image */}
                    <div
                      className="relative aspect-[16/10] w-full overflow-hidden"
                      style={{ transform: 'translateZ(0px)' }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                      />

                      {/* Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                    </div>

                    {/* Layer 1: Floating Glass Badges */}
                    <div
                      className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none"
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] tracking-widest uppercase">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-editorial-accent text-black font-mono font-bold text-[10px] tracking-wider uppercase">
                        3D ENGINE
                      </span>
                    </div>

                    {/* Layer 2: Floating Bottom Telemetry */}
                    <div
                      className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white text-xs font-mono pointer-events-none"
                      style={{ transform: 'translateZ(45px)' }}
                    >
                      <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>RENDER: {project.metrics.fps || "60 FPS"}</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-editorial-accent font-bold bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                        <Eye size={14} /> VIEW CASE STUDY
                      </span>
                    </div>
                  </Tilt3DCard>
                </div>

                {/* Typography & Specs Column with 3D Depth */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? 'order-2' : 'order-2 lg:order-1'
                  }`}
                >
                  <div className="flex items-baseline justify-between font-mono text-xs text-editorial-text-muted border-b border-editorial-border pb-3">
                    <span className="text-3xl font-display font-black text-editorial-accent">
                      0{index + 1}
                    </span>
                    <span>{project.year} // {project.role}</span>
                  </div>

                  <h3
                    onClick={() => openProject(project)}
                    className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-editorial-text hover:text-editorial-accent transition-colors cursor-pointer"
                    data-cursor="VIEW"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-mono text-editorial-accent uppercase tracking-wider">
                    {project.subtitle}
                  </p>

                  <p className="text-sm sm:text-base font-sans text-editorial-text-muted leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Arsenal Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-mono border border-editorial-border bg-editorial-surface text-editorial-text"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-4 flex items-center gap-4">
                    <MagneticButton
                      onClick={() => openProject(project)}
                      cursorText="SPEC"
                      className="px-6 py-3 rounded-full bg-editorial-accent text-black font-display font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
                    >
                      <span>INSPECT CASE STUDY</span>
                      <ArrowUpRight size={16} />
                    </MagneticButton>

                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={playClick}
                      className="p-3 rounded-full border border-editorial-border hover:border-editorial-text text-editorial-text transition-colors"
                      data-cursor="LAUNCH"
                      title="Launch Demo"
                    >
                      <Zap size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};