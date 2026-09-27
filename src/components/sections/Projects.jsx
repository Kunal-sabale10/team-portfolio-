import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers, Eye, Zap, Github } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { ProjectModal } from '../common/ProjectModal';
import { MagneticButton } from '../common/MagneticButton';

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
      className="relative py-28 sm:py-36 px-4 sm:px-6 md:px-10 border-t border-editorial-border bg-editorial-bg overflow-hidden"
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
            Interactive spatial prototypes, WebGL shaders, and high-performance applications designed to provoke. Click any artifact to inspect case study.
          </p>
        </div>

        {/* Scroll-Driven Editorial Showcase List */}
        <div className="space-y-24 sm:space-y-36">
          {PROJECTS_DATA.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Visual Media Column */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'order-1' : 'order-1 lg:order-2'
                  }`}
                >
                  <div
                    onClick={() => openProject(project)}
                    onMouseEnter={playHover}
                    className="group relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-editorial-border bg-editorial-surface cursor-pointer shadow-lg hover:border-editorial-accent transition-all duration-500"
                    data-cursor="EXPLORE"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Quick Floating Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] tracking-widest uppercase">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                      <span>FPS: {project.metrics.fps || "60"}</span>
                      <span className="flex items-center gap-1 text-editorial-accent">
                        <Eye size={14} /> VIEW SPECIFICATIONS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Typography & Specs Column */}
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
