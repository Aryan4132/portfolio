import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Copy, Check, MapPin, ExternalLink, MessageSquare, Send, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-slate-950/80 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct Communication Channel</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Let&apos;s Build <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400">High-Impact Systems</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Have a project requiring offline AI agents, custom canvas visualizers, or high-performance systems engineering? Reach out directly via email or social channels.
          </p>
        </div>

        {/* 3 Grid Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: Direct Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/30 backdrop-blur-md space-y-6 shadow-2xl flex flex-col justify-between hover:border-cyan-400/50 transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  Primary
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-['Outfit']">Direct Email</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fastest response for project inquiries &amp; engineering opportunities.
                </p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-cyan-300">
                <span className="truncate">{PERSONAL_INFO.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors shrink-0"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 mt-4"
            >
              <Send className="w-4 h-4" />
              <span>Launch Mail App</span>
            </a>
          </motion.div>

          {/* Card 2: GitHub & Repos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/10 backdrop-blur-md space-y-6 shadow-2xl flex flex-col justify-between hover:border-white/20 transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-white group-hover:scale-110 transition-transform">
                  <Github className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-full border border-white/10">
                  Open Source
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-['Outfit']">GitHub Profile</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Explore open source repositories, AST parsers, and system tools.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-slate-300 flex items-center gap-2">
                <span className="text-slate-500">@</span>
                <span className="text-white font-bold">Aryan4132</span>
              </div>
            </div>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 mt-4"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>View Repositories</span>
            </a>
          </motion.div>

          {/* Card 3: LinkedIn Network */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-indigo-500/30 backdrop-blur-md space-y-6 shadow-2xl flex flex-col justify-between hover:border-indigo-400/50 transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 group-hover:scale-110 transition-transform">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                  Network
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-['Outfit']">LinkedIn Network</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Connect for professional networking and engineering discussions.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-indigo-300 truncate">
                in/aryanshukla4132
              </div>
            </div>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-slate-900 border border-indigo-500/30 hover:bg-slate-800 text-indigo-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 mt-4"
            >
              <ExternalLink className="w-4 h-4 text-indigo-400" />
              <span>Connect on LinkedIn</span>
            </a>
          </motion.div>

        </div>

        {/* Location Footer Bar */}
        <div className="mt-12 max-w-5xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{PERSONAL_INFO.address}</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Timezone: IST (UTC+5:30)</span>
          </div>
        </div>

      </div>
    </section>
  );
};
