import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear realistic loading jump
      const step = Math.floor(Math.random() * 8) + 3;
      current = Math.min(100, current + step);
      setPercent(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
        }, 300);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-14 bg-editorial-bg select-none"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center text-xs font-mono tracking-widest text-editorial-text-muted">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-editorial-accent animate-pulse" />
              SYSTEM PROTOCOL 2026.4
            </span>
            <span>KINETIX // 03</span>
          </div>

          {/* Center Brand typography */}
          <div className="my-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-editorial-accent mb-3">
                [ INITIALIZING CREATIVE RUNTIME ]
              </p>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold tracking-tight">
                KINETIX<span className="text-editorial-accent">.</span>
              </h1>
            </motion.div>
          </div>

          {/* Bottom Progress Bar & Counter */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline font-mono">
              <div className="text-xs tracking-wider text-editorial-text-muted flex gap-4">
                <span>[SHADERS: COMPILED]</span>
                <span className="hidden sm:inline">[WEBGL: ONLINE]</span>
              </div>
              <div className="text-4xl sm:text-6xl font-display font-bold text-editorial-text">
                {percent.toString().padStart(3, '0')}%
              </div>
            </div>

            <div className="w-full h-[2px] bg-editorial-border overflow-hidden">
              <motion.div
                className="h-full bg-editorial-accent"
                style={{ width: `${percent}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
