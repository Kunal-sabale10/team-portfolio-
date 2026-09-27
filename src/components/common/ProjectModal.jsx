import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Zap, CheckCircle2 } from 'lucide-react';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-editorial-surface border border-editorial-border rounded-2xl p-6 sm:p-10 shadow-2xl z-10"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full border border-editorial-border hover:bg-editorial-border/30 text-editorial-text transition-colors"
              aria-label="Close modal"
              data-cursor="CLOSE"
            >
              <X size={20} />
            </button>

            {/* Header info */}
            <div className="space-y-2 mb-6 pr-10">
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-editorial-accent uppercase">
                <span>{project.category}</span>
                <span>•</span>
                <span>{project.year}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-editorial-text">
                {project.title}
              </h2>
              <p className="text-base text-editorial-text-muted font-sans">
                {project.subtitle}
              </p>
            </div>

            {/* Showcase Image */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-editorial-border mb-8 group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                <span>ROLE: {project.role}</span>
                <span className="bg-editorial-accent text-black font-bold px-2 py-0.5 rounded">60 FPS VERIFIED</span>
              </div>
            </div>

            {/* Deep Description */}
            <div className="space-y-6 text-editorial-text">
              <div>
                <h4 className="text-xs font-mono tracking-widest uppercase text-editorial-text-muted mb-2">
                  [ ARCHITECTURE & OVERVIEW ]
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-editorial-text/90">
                  {project.description}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-editorial-surface-elevated border border-editorial-border font-mono text-xs">
                {Object.entries(project.metrics).map(([key, val]) => (
                  <div key={key} className="space-y-1">
                    <span className="text-editorial-text-muted uppercase tracking-wider">{key}:</span>
                    <div className="font-bold text-sm text-editorial-accent">{val}</div>
                  </div>
                ))}
              </div>

              {/* Technical Innovations */}
              <div>
                <h4 className="text-xs font-mono tracking-widest uppercase text-editorial-text-muted mb-3">
                  [ CORE SPECIFICATIONS & SHADERS ]
                </h4>
                <ul className="space-y-2">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-editorial-text/80">
                      <CheckCircle2 size={16} className="text-editorial-accent shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-2">
                <h4 className="text-xs font-mono tracking-widest uppercase text-editorial-text-muted mb-3">
                  [ ARSENAL DEPLOYED ]
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono border border-editorial-border bg-editorial-surface-elevated text-editorial-text"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-editorial-border">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-editorial-accent text-black font-display font-bold text-sm hover:opacity-90 transition-opacity"
                  data-cursor="VISIT"
                >
                  <Zap size={16} />
                  LIVE DEMO EXPERIENCE
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-editorial-border hover:bg-editorial-border/30 text-editorial-text font-display font-bold text-sm transition-colors"
                  data-cursor="CODE"
                >
                  <Github size={16} />
                  INSPECT SOURCE
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
