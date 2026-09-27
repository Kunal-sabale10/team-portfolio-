import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const Tilt3DCard = ({
  children,
  className = '',
  maxTilt = 18,
  glare = true,
  ...props
}) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shadowX: 0, shadowY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalX = (x / rect.width) * 2 - 1; // -1 to 1
    const normalY = (y / rect.height) * 2 - 1; // -1 to 1

    setTilt({
      rotateX: -normalY * maxTilt,
      rotateY: normalX * maxTilt,
      shadowX: -normalX * 24,
      shadowY: normalY * 24,
    });

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.18,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, shadowX: 0, shadowY: 0 });
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: '1100px' }}
      className="w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: isHovered ? 1.03 : 1.0,
        }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 260,
          mass: 0.4,
        }}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `${tilt.shadowX}px ${tilt.shadowY + 16}px 40px rgba(0, 0, 0, 0.45)`
            : '0px 8px 24px rgba(0, 0, 0, 0.15)',
        }}
        className={`relative transition-colors duration-300 rounded-2xl ${className}`}
        {...props}
      >
        {/* Dynamic Specular Glare layer */}
        {glare && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-20 transition-opacity duration-300 overflow-hidden"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.8) 0%, transparent 65%)`,
            }}
          />
        )}

        {children}
      </motion.div>
    </div>
  );
};