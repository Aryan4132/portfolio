import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Network, TrendingUp, Code2, ExternalLink, Github, Sparkles, Layers, ShieldCheck, Zap, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface FlagshipProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const FlagshipProjectsSection: React.FC<FlagshipProjectsProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'Offline AI' },
    { id: 'systems', label: 'Systems & Visualizers' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'tool', label: 'Compilers & Tools' },
  ];

  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-6 h-6 text-cyan-400" />;
      case 'Network':
        return <Network className="w-6 h-6 text-indigo-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-emerald-400" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-amber-400" />;
      default:
        return <Layers className="w-6 h-6 text-cyan-400" />;
    }
  };

  const filteredProjects =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 relative z-10 bg-slate-950/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Featured Innovations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Flagship <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400">Systems & AI Projects</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Real software built to run reliably with offline ReAct agent loops, custom Canvas physics engines, and sub-50ms caching architectures.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                filter === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden backdrop-blur-md glass-panel-hover flex flex-col justify-between"
            >
              {/* Card Top Section */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 shadow-inner group-hover:scale-105 transition-transform">
                      {getProjectIcon(project.icon)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white font-['Outfit'] group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400/90">{project.subtitle}</p>
                    </div>
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-950 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all shrink-0"
                    title="View Source on GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 space-y-0.5">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{m.label}</div>
                      <div className="text-sm font-bold text-cyan-300 font-mono">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Key Technical Highlights */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Key Engineering Highlights:</div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-slate-950 border border-white/10 text-slate-300 text-[11px] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Footer / Action */}
              <div className="p-4 sm:px-8 sm:py-4 bg-slate-950/60 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => onSelectProject(project)}
                  className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 group/btn"
                >
                  <span>Explore Technical Specs & Architecture</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
