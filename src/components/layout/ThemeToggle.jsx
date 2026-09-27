import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ onToggleSound }) => {
  const { isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    if (onToggleSound) onToggleSound();
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className="relative p-2.5 rounded-full border border-editorial-border bg-editorial-surface/80 hover:border-editorial-accent transition-colors duration-300 text-editorial-text overflow-hidden"
      aria-label="Toggle visual palette"
      data-cursor="THEME"
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -90, scale: 0, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {isDark ? (
          <Sun size={17} className="text-editorial-accent" />
        ) : (
          <Moon size={17} className="text-editorial-accent" />
        )}
      </motion.div>
    </button>
  );
};
