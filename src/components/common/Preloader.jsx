import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current += 15;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 150);
      }
      setPercent(Math.min(100, current));
    }, 35);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-14 bg-editorial-bg select-none"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Top Bar with Skip Button */}
          <div className="flex justify-between items-center text-xs font-mono tracking-widest text-editorial-text-muted">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-editorial-accent animate-pulse" />
              SYSTEM PROTOCOL 2026.4
            </span>
            <button
              type="button"
              onClick={() => {
                setPercent(100);
                setIsDone(true);
                if (onComplete) onComplete();
              }}
              className="px-2.5 py-1 rounded border border-editorial-border hover:border-editorial-accent hover:text-editorial-accent transition-colors"
            >
              SKIP &rarr;
            </button>
          </div>

          {/* Center Brand typography */}
          <div className="my-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-editorial-accent mb-3">
                [ INITIALIZING 3D RUNTIME ]
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
              <div
                className="h-full bg-editorial-accent transition-all duration-75 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};