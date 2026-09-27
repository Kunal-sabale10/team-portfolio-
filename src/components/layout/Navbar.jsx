import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { MagneticButton } from '../common/MagneticButton';
import { TEAM_INFO } from '../../data/portfolioData';

export const Navbar = ({ soundEffects, lenisRef }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { soundEnabled, toggleSound, playClick, playToggle } = soundEffects;

  const navItems = [
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'TEAM', href: '#team', id: 'team' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  // Track active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'team', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    playClick();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(element, { offset: -60, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 sm:py-4 bg-editorial-bg/80 backdrop-blur-xl border-b border-editorial-border shadow-sm'
            : 'py-5 sm:py-7 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="group flex items-center gap-2 font-display text-lg sm:text-xl font-black tracking-tighter text-editorial-text"
            data-cursor="TOP"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-editorial-accent group-hover:scale-125 transition-transform duration-300" />
            <span>{TEAM_INFO.name}</span>
            <span className="text-xs font-mono font-normal tracking-widest text-editorial-text-muted hidden sm:inline">
              // 03
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full border border-editorial-border bg-editorial-surface/70 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  data-cursor={item.label}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? 'text-black font-bold'
                      : 'text-editorial-text-muted hover:text-editorial-text'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-editorial-accent z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Controls: Audio Toggle + Theme Switch + Quick CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                toggleSound();
                playToggle();
              }}
              className="p-2.5 rounded-full border border-editorial-border bg-editorial-surface/80 hover:border-editorial-accent transition-colors duration-300 text-editorial-text"
              aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              data-cursor={soundEnabled ? 'MUTE' : 'AUDIO'}
              title={soundEnabled ? 'Sound Enabled' : 'Sound Muted'}
            >
              {soundEnabled ? (
                <Volume2 size={17} className="text-editorial-accent animate-pulse" />
              ) : (
                <VolumeX size={17} className="text-editorial-text-muted" />
              )}
            </button>

            {/* Theme Palette Switch */}
            <ThemeToggle onToggleSound={playToggle} />

            {/* Quick Contact CTA (Desktop) */}
            <div className="hidden lg:block">
              <MagneticButton
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                cursorText="TALK"
                className="px-4 py-2 rounded-full bg-editorial-text text-editorial-bg text-xs font-mono font-bold tracking-wider hover:opacity-90 transition-opacity"
              >
                <span>TRANSMIT</span>
                <ArrowUpRight size={14} className="text-editorial-accent" />
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2.5 rounded-full border border-editorial-border bg-editorial-surface text-editorial-text"
              aria-label="Toggle Navigation Menu"
              data-cursor="MENU"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden bg-editorial-bg flex flex-col justify-between p-8 pt-28"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <span className="text-xs font-mono tracking-widest text-editorial-accent uppercase">
                // INDEX PROTOCOL
              </span>
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-3xl font-display font-extrabold tracking-tight text-editorial-text hover:text-editorial-accent flex items-center justify-between py-2 border-b border-editorial-border"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono text-editorial-text-muted">0{index + 1}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-editorial-border space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-editorial-text-muted">
                <span>{TEAM_INFO.fullName}</span>
                <span>{TEAM_INFO.availabilityStatus}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
