import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, Globe2, ShieldCheck, Heart } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';
import { TEAM_INFO } from '../../data/portfolioData';

export const Footer = ({ lenisRef, soundEffects }) => {
  const [time, setTime] = useState({ ist: '', utc: '' });
  const { playClick } = soundEffects;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        ist: now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
        utc: now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playClick();
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-editorial-border bg-editorial-bg pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Giant Editorial Marquee / Watermark */}
        <div className="overflow-hidden py-4 select-none pointer-events-none opacity-10">
          <div className="text-6xl sm:text-8xl md:text-9xl font-display font-black tracking-tighter whitespace-nowrap text-stroke">
            {TEAM_INFO.name} • DIGITAL ARCHITECTS • EXPERIMENTAL • {TEAM_INFO.name} •
          </div>
        </div>

        {/* Telemetry Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8 border-y border-editorial-border font-mono text-xs text-editorial-text-muted">
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-editorial-accent shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-widest">LOCAL DISPATCH (IST)</div>
              <div className="font-bold text-editorial-text text-sm">{time.ist || '18:30:00'} IST</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Globe2 size={16} className="text-editorial-accent shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-widest">COORDINATED TIME (UTC)</div>
              <div className="font-bold text-editorial-text text-sm">{time.utc || '13:00:00'} UTC</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck size={16} className="text-editorial-accent shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-widest">SYSTEM STATUS</div>
              <div className="font-bold text-editorial-text text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                ONLINE // 60 FPS
              </div>
            </div>
          </div>

          <div className="flex items-center md:justify-end">
            <MagneticButton
              onClick={scrollToTop}
              cursorText="TOP"
              className="p-3 rounded-full border border-editorial-border bg-editorial-surface hover:bg-editorial-accent hover:text-black transition-colors"
            >
              <ArrowUp size={18} />
            </MagneticButton>
          </div>
        </div>

        {/* Bottom Credits & Hackathon Evaluation Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-editorial-text-muted">
          <div>
            © {new Date().getFullYear()} {TEAM_INFO.fullName}. ALL RIGHTS RESERVED.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <span className="px-2.5 py-1 rounded bg-editorial-surface-elevated border border-editorial-border">
              40% UI / DESIGN
            </span>
            <span className="px-2.5 py-1 rounded bg-editorial-surface-elevated border border-editorial-border">
              20% RESPONSIVE
            </span>
            <span className="px-2.5 py-1 rounded bg-editorial-surface-elevated border border-editorial-border">
              20% STRUCTURE
            </span>
            <span className="px-2.5 py-1 rounded bg-editorial-surface-elevated border border-editorial-border">
              20% CREATIVE / MOT
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span>ENGINEERED FOR HACKATHON GLORY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
