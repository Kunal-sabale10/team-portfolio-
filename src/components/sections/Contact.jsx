import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Copy, Check, ArrowUpRight, Radio, Sparkles, MessageSquare, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CONTACT_DATA, TEAM_INFO } from '../../data/portfolioData';
import { MagneticButton } from '../common/MagneticButton';

export const Contact = ({ soundEffects }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projectType: CONTACT_DATA.projectTypes[0],
    budget: CONTACT_DATA.budgetOptions[1],
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { playClick, playSuccess } = soundEffects;

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(CONTACT_DATA.directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playSuccess();

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#d4ff00', '#ff3800', '#a855f7', '#ffffff']
        });
      } catch {}

      // Reset form after short delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: '',
          projectType: CONTACT_DATA.projectTypes[0],
          budget: CONTACT_DATA.budgetOptions[1],
        });
        setSubmitted(false);
      }, 5000);
    }, 900);
  };

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 px-4 sm:px-6 md:px-10 border-t border-editorial-border bg-editorial-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-editorial-accent uppercase mb-3">
          <MessageSquare size={16} />
          <span>{CONTACT_DATA.sectionTag}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Inquiries & Transmissions */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-editorial-text uppercase">
              INITIATE <span className="font-serif italic font-normal text-editorial-accent">Signal</span>
            </h2>

            <p className="text-base sm:text-lg font-sans text-editorial-text-muted leading-relaxed">
              {CONTACT_DATA.subtext}
            </p>

            {/* Direct Email Card with Interactive Copy */}
            <div className="p-6 rounded-2xl border border-editorial-border bg-editorial-surface space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-editorial-text-muted">
                <span>DIRECT PROTOCOL</span>
                <span className="text-editorial-accent">HIGH PRIORITY</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-sm sm:text-base font-bold text-editorial-text truncate">
                  {CONTACT_DATA.directEmail}
                </span>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 rounded-lg border border-editorial-border bg-editorial-surface-elevated hover:border-editorial-accent text-editorial-text text-xs font-mono flex items-center gap-1.5 transition-colors shrink-0"
                  data-cursor="COPY"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-500" />
                      <span className="text-emerald-500 font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Transmissions & Dispatch Info */}
            <div className="space-y-4 pt-4 border-t border-editorial-border font-mono text-xs text-editorial-text-muted">
              <div className="flex items-center justify-between">
                <span>BASE COORDINATES:</span>
                <span className="font-bold text-editorial-text">{CONTACT_DATA.studioLocation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>HOURS & SYNC:</span>
                <span className="font-bold text-editorial-text">{CONTACT_DATA.workingHours}</span>
              </div>
            </div>

            {/* Social Links List */}
            <div className="pt-4">
              <div className="text-xs font-mono uppercase tracking-widest text-editorial-text-muted mb-3">
                // EXTERNAL FREQUENCIES
              </div>
              <div className="flex flex-wrap gap-2">
                {CONTACT_DATA.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClick}
                    className="px-4 py-2 rounded-full border border-editorial-border bg-editorial-surface hover:border-editorial-accent hover:text-editorial-accent text-editorial-text text-xs font-mono tracking-wider transition-colors inline-flex items-center gap-1.5"
                    data-cursor="LINK"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Stylized Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl border border-editorial-border bg-editorial-surface shadow-xl relative">
              <div className="text-xs font-mono uppercase tracking-widest text-editorial-accent mb-6 flex items-center justify-between">
                <span>// TRANSMISSION CONSOLE</span>
                <span>STATUS: READY</span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-editorial-accent/20 border border-editorial-accent flex items-center justify-center mx-auto text-editorial-accent">
                    <Sparkles size={28} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-editorial-text uppercase">
                    TRANSMISSION RECEIVED
                  </h3>
                  <p className="text-sm font-sans text-editorial-text-muted max-w-md mx-auto">
                    Your briefing has entered our active sprint queue. An operative will reply within 24 standard hours.
                  </p>
                  <div className="pt-4">
                    <span className="text-xs font-mono text-editorial-accent tracking-widest">
                      [ PACKET_DELIVERED // ACK_OK ]
                    </span>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Project Type Chips */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider text-editorial-text-muted uppercase mb-3">
                      01 // WHAT ARE WE BUILDING?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CONTACT_DATA.projectTypes.map((type) => {
                        const isSelected = formData.projectType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              playClick();
                              setFormData({ ...formData, projectType: type });
                            }}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                              isSelected
                                ? 'bg-editorial-accent text-black font-bold'
                                : 'border border-editorial-border bg-editorial-surface-elevated text-editorial-text hover:border-editorial-accent/50'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider text-editorial-text-muted uppercase mb-3">
                      02 // ESTIMATED BUDGET SCALE
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CONTACT_DATA.budgetOptions.map((budget) => {
                        const isSelected = formData.budget === budget;
                        return (
                          <button
                            key={budget}
                            type="button"
                            onClick={() => {
                              playClick();
                              setFormData({ ...formData, budget });
                            }}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                              isSelected
                                ? 'border border-editorial-accent text-editorial-accent font-bold bg-editorial-accent/10'
                                : 'border border-editorial-border bg-editorial-surface-elevated text-editorial-text-muted hover:text-editorial-text'
                            }`}
                          >
                            {budget}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider text-editorial-text-muted uppercase mb-2">
                      03 // OPERATIVE IDENTIFIER (NAME) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-editorial-border bg-editorial-surface-elevated text-editorial-text text-sm font-sans focus:outline-none focus:border-editorial-accent transition-colors placeholder:text-editorial-text-muted/50"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider text-editorial-text-muted uppercase mb-2">
                      04 // RETURN FREQUENCY (EMAIL) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@studio.design"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-editorial-border bg-editorial-surface-elevated text-editorial-text text-sm font-sans focus:outline-none focus:border-editorial-accent transition-colors placeholder:text-editorial-text-muted/50"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-mono tracking-wider text-editorial-text-muted uppercase mb-2">
                      05 // PROJECT BRIEF / AMBITIONS *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your technical goals, timeline, and any creative references..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-editorial-border bg-editorial-surface-elevated text-editorial-text text-sm font-sans focus:outline-none focus:border-editorial-accent transition-colors placeholder:text-editorial-text-muted/50 resize-none"
                    />
                  </div>

                  {/* Magnetic Submit Button */}
                  <div className="pt-2">
                    <MagneticButton
                      type="submit"
                      cursorText="SEND"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-editorial-accent text-black font-display font-black text-sm uppercase tracking-wider hover:opacity-95 transition-opacity disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                          TRANSMITTING PACKET...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span>DISPATCH TRANSMISSION</span>
                          <Send size={16} />
                        </span>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
