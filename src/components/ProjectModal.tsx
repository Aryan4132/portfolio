import React from 'react';
import { X, Github, ExternalLink, ShieldCheck, Zap, Layers, CheckCircle2, Cpu, Terminal } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0F172A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="px-6 sm:px-8 py-6 bg-slate-900 border-b border-white/10 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              Technical Specification Sheet
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">{project.title}</h2>
            <p className="text-sm font-mono text-cyan-400">{project.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto leading-relaxed text-slate-300 text-sm">
          
          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-wider">Project Overview</h3>
            <p className="text-slate-200 text-base leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">{m.label}</div>
                <div className="text-lg font-bold text-cyan-300 font-mono">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Key Engineering Accomplishments */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-wider">Key Engineering Innovations</h3>
            <div className="space-y-2">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Architecture Stack */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-wider">Architectural Pipeline Breakdown</h3>
            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs space-y-2 text-slate-300">
              {project.architecture.map((arch, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">&gt;</span>
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-wider">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-200 text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-4 bg-slate-900 border-t border-white/10 flex items-center justify-between">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-white font-medium text-xs hover:bg-slate-700 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>View Repository on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
          >
            Close Sheet
          </button>
        </div>

      </div>
    </div>
  );
};
