import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Network, Zap, ShieldCheck, Server, ArrowRight, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [typedText, setTypedText] = useState('');
  const phrases = [
    'Full-Stack Web Applications',
    'Custom 60 FPS Canvas Physics Engines',
    'Offline Desktop Tools with Tauri & Python',
    'High-Performance Express Caching Systems',
  ];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIdx];
    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setTypedText(currentPhrase.substring(0, typedText.length + 1));
          if (typedText.length + 1 === currentPhrase.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setTypedText(currentPhrase.substring(0, typedText.length - 1));
          if (typedText.length - 1 === 0) {
            setIsDeleting(false);
            setPhraseIdx((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIdx]);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Hero Details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono backdrop-blur-md shadow-lg"
            >
              <span>Computer Engineering @ DBIT Mumbai</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-semibold">Systems & Software</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] font-['Outfit']">
                Building <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400">
                  Software Systems
                </span>{' '}
                & Interactive Tools
              </h1>

              {/* Typing Effect Subtitle */}
              <div className="h-8 flex items-center font-mono text-sky-400/90 text-sm sm:text-lg">
                <span className="text-slate-500 mr-2">&gt;</span>
                <span>{typedText}</span>
                <span className="w-2 h-5 bg-sky-400 ml-1 animate-pulse" />
              </div>
            </motion.div>

            {/* Summary paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal"
            >
              Hi, I’m <strong className="text-white font-semibold">Aryan Shukla</strong>. Computer engineering student at DBIT Mumbai building local-first software, custom data visualizers, AST parsers, and full-stack backend caching systems.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#projects"
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/20 hover:from-cyan-400 hover:to-indigo-500 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenResume}
                className="px-5 py-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
              >
                View Resume Sheet
              </button>
            </motion.div>

            {/* Social Links & Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 flex items-center gap-4 text-slate-400 text-sm"
            >
              <span className="text-xs uppercase tracking-wider font-mono text-slate-500">Connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                title="GitHub @Aryan4132"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                title="LinkedIn @aryanshukla4132"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                title="Email aryanshukla4132@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Key Focus Areas & Architecture Summary */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold">
                    Core Technical Focus
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">DBIT Mumbai 2024-2028</span>
              </div>

              {/* 4 Grid Focus Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 space-y-1 hover:border-cyan-400/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Architecture</span>
                  </div>
                  <div className="text-lg font-bold font-['Outfit'] text-white">Local-First</div>
                  <div className="text-[11px] text-slate-400">Tauri & Python sidecars</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20 space-y-1 hover:border-indigo-400/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <Zap className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Optimization</span>
                  </div>
                  <div className="text-lg font-bold font-['Outfit'] text-white">93% Faster</div>
                  <div className="text-[11px] text-slate-400">Express memory cache</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 space-y-1 hover:border-cyan-400/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <Network className="w-4 h-4 text-cyan-400" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Graphics</span>
                  </div>
                  <div className="text-lg font-bold font-['Outfit'] text-white">60 FPS</div>
                  <div className="text-[11px] text-slate-400">Canvas & Three.js</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20 space-y-1 hover:border-emerald-400/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Compilers</span>
                  </div>
                  <div className="text-lg font-bold font-['Outfit'] text-white">Zero Libs</div>
                  <div className="text-[11px] text-slate-400">Custom AST parsers</div>
                </div>
              </div>

              {/* Bottom Highlights */}
              <div className="pt-2 flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 text-xs font-mono">
                <Bot className="w-5 h-5 text-sky-400 shrink-0" />
                <span>
                  <strong>Key Project:</strong> Meridian-X offline desktop tool with automated AST signature repair
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
