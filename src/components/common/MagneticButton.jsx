import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const MagneticButton = ({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  strength = 0.35,
  cursorText = '',
  ...props
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = (clientX - centerX) * strength;
    const distanceY = (clientY - centerY) * strength;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.span
      className="relative z-10 flex items-center justify-center gap-2 pointer-events-none"
      animate={{ x: position.x * 0.4, y: position.y * 0.4 }}
      transition={{ type: "spring", damping: 15, stiffness: 200 }}
    >
      {children}
    </motion.span>
  );

  const motionProps = {
    ref: buttonRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: { type: "spring", damping: 15, stiffness: 180, mass: 0.1 },
    'data-cursor': cursorText,
    className: `relative inline-flex items-center justify-center transition-all duration-300 ${className}`,
    ...props
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
};
