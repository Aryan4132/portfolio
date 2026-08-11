import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, MapPin, Calendar, Award, FileText, CheckCircle2, Shield, Cpu, Code2 } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

interface ExperienceEducationProps {
  onOpenResume: () => void;
}

export const ExperienceEducationSection: React.FC<ExperienceEducationProps> = ({ onOpenResume }) => {
  const edu = EDUCATION_DATA[0];

  return (
    <section id="education" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Academic & Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Education & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400">Core Coursework</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Grounded in core computer engineering fundamentals with practical experience in desktop tools, rendering engines, AST parsers, and full-stack web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-2xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md space-y-6"
          >
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono inline-block">
                  {edu.status}
                </span>
                <h3 className="text-2xl font-bold text-white font-['Outfit']">{edu.institution}</h3>
                <p className="text-base text-cyan-300 font-medium">{edu.degree}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 shrink-0">
                <GraduationCap className="w-6 h-6 text-indigo-400" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{edu.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{edu.timeline}</span>
              </div>
            </div>

            {/* Coursework list */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 tracking-wider">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Relevant Engineering Coursework:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {edu.coursework.map((course) => (
                  <div key={course} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume button */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Official Curriculum & Verification</span>
              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-indigo-500 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>View Full CV / Resume</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Engineering Philosophy & Principles */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 rounded-2xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md space-y-6"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white font-['Outfit']">Core Systems Principles</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <div className="text-cyan-300 font-bold font-mono">1. Zero Cloud Dependency</div>
                <p className="text-slate-400 text-xs">
                  AI tools should function completely offline without leaking user data or crashing when internet connectivity drops.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <div className="text-indigo-300 font-bold font-mono">2. Self-Healing Agent Loops</div>
                <p className="text-slate-400 text-xs">
                  Inspect functions with AST signature validators (<code className="text-amber-300">inspect.signature</code>) to auto-correct LLM tool arguments in real-time.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <div className="text-emerald-300 font-bold font-mono">3. Custom Engines Over Bloat</div>
                <p className="text-slate-400 text-xs">
                  Write tailored 60 FPS HTML5 Canvas physics in TypeScript rather than bringing heavy 3rd-party visualization dependencies.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
