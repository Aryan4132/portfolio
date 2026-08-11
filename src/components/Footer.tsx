import React from 'react';
import { Cpu, ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#09090b] border-t border-zinc-800/80 text-zinc-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="font-['Outfit'] font-bold text-lg text-white block">
                Aryan Shukla
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Systems & Software Developer • DBIT Mumbai
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <a href="#hero" className="hover:text-white transition-colors">About</a>
            <a href="#tech" className="hover:text-white transition-colors">Tech Stack</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#graph" className="hover:text-white transition-colors">Knowledge Graph</a>
            <a href="#education" className="hover:text-white transition-colors">Education</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Social icons & Scroll top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-all ml-2"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Aryan Shukla. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with Three.js, Canvas & React 19 in Mumbai, India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
