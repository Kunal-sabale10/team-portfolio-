import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor for precision pointer devices (desktop)
    const isTouchDevice = !window.matchMedia('(pointer: fine)').matches;
    if (isTouchDevice) return;

    document.body.classList.add('custom-cursor-active');

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor], a, button, input, textarea, [role="button"]');
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Follower Ring / Pill */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center border border-editorial-accent bg-editorial-accent/10 backdrop-blur-[2px] transition-colors duration-200"
        animate={{
          x: mousePosition.x - (cursorText ? 44 : isHovered ? 28 : 16),
          y: mousePosition.y - (cursorText ? 44 : isHovered ? 28 : 16),
          width: cursorText ? 88 : isHovered ? 56 : 32,
          height: cursorText ? 88 : isHovered ? 56 : 32,
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{
          type: "spring",
          damping: 24,
          stiffness: 280,
          mass: 0.5,
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-editorial-text select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-editorial-accent"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 400,
        }}
      />
    </div>
  );
};
