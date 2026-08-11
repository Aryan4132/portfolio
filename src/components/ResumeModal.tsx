import React from 'react';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Actions Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="font-mono text-xs text-white font-bold">
              ARYAN_SHUKLA_RESUME.pdf (Systems & AI Developer)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono hover:text-white hover:bg-slate-700 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Container */}
        <div className="p-8 sm:p-12 max-h-[75vh] overflow-y-auto bg-slate-950/90 text-slate-200 font-sans space-y-8 text-xs sm:text-sm">
          
          {/* Header */}
          <div className="text-center space-y-2 pb-6 border-b border-white/10">
            <h1 className="text-3xl font-extrabold text-white tracking-wider font-['Outfit']">ARYAN SHUKLA</h1>
            <p className="font-mono text-cyan-400 font-bold uppercase tracking-widest text-xs">
              COMPUTER ENGINEERING STUDENT • SYSTEMS & AI DEVELOPER
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span>Mumbai, MH, India</span>
              <span>•</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-300 hover:underline">{PERSONAL_INFO.email}</a>
              <span>•</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">linkedin.com/in/aryanshukla4132</a>
              <span>•</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">github.com/Aryan4132</a>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider pb-1 border-b border-white/10">SUMMARY</h2>
            <p className="text-slate-300 leading-relaxed">
              Computer engineering student focused on systems and AI development, building offline-first desktop and web applications that integrate local LLMs, custom data-visualization engines, and full-stack architectures. Comfortable working across the stack, from Python backend services to React frontends, with an emphasis on writing tools that work reliably without cloud dependencies.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider pb-1 border-b border-white/10">EDUCATION</h2>
            <div className="flex items-start justify-between">
              <div>
                <strong className="text-white text-base">Don Bosco Institute of Technology (DBIT)</strong>
                <p className="text-slate-300">Bachelor of Engineering in Computer Engineering</p>
                <p className="text-xs text-slate-400 pt-1">Relevant Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks</p>
              </div>
              <span className="font-mono text-xs text-cyan-300">Expected May 2028 | Kurla, Mumbai</span>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider pb-1 border-b border-white/10">TECHNICAL SKILLS</h2>
            <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
              <div><span className="text-slate-400 font-bold">SYSTEMS & BACKEND:</span> <span className="text-slate-200">Python, C++, Rust, Node.js, Express.js, FastAPI, SQL (SQLite, PostgreSQL), MongoDB</span></div>
              <div><span className="text-slate-400 font-bold">FRONTEND & UI:</span> <span className="text-slate-200">TypeScript, JavaScript, React 19, HTML5 Canvas, Three.js, Tailwind CSS, Zustand, Motion, Tauri</span></div>
              <div><span className="text-slate-400 font-bold">AI & LOCAL INFERENCE:</span> <span className="text-slate-200">Ollama, Vector RAG, TF-IDF Search, ReAct Agent Loops, Model Context Protocol (MCP)</span></div>
              <div><span className="text-slate-400 font-bold">DEVOPS & TOOLS:</span> <span className="text-slate-200">GitHub Actions (CI/CD), Docker, Git, RESTful APIs, Linux</span></div>
            </div>
          </div>

          {/* Flagship Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider pb-1 border-b border-white/10">PROJECTS</h2>
            
            {/* Project 1 */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-white font-bold text-sm">Meridian-X — Offline Desktop AI Assistant</strong>
                <span className="font-mono text-xs text-cyan-400">Tauri, React, FastAPI, Ollama, SQLite</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs">
                <li>Built an offline-first desktop assistant running a local ReAct agent loop against Ollama models, initializing Python/FastAPI sidecar services in ~1.5s with zero cloud API dependencies.</li>
                <li>Engineered a runtime signature validator using Python inspect.signature to dynamically inspect tool functions and repair hallucinated arguments, eliminating LLM tool-call crashes.</li>
                <li>Architected asynchronous execution paths separating read-only and write actions, enabling concurrent background scans without file-system locks or unsafe writes.</li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-white font-bold text-sm">AI Knowledge Graph — Local Workspace Visualizer & MCP Server</strong>
                <span className="font-mono text-xs text-cyan-400">Node.js, Express, SQLite, React, Chokidar</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs">
                <li>Built a local knowledge graph server watching workspace directories in real time to render files, notes, and schemas as an interactive 2D graph.</li>
                <li>Engineered a custom force-directed graph engine in TypeScript directly on HTML5 Canvas—without D3 dependencies—maintaining 60 FPS rendering across 50+ workspace nodes without UI latency.</li>
                <li>Engineered a 200ms debounced event pipeline in Chokidar to eliminate UI node flashing caused by OS-level atomic file system churn on Windows.</li>
                <li>Exposed live graph structures to external AI tools by implementing a native Model Context Protocol (MCP) server over stdio and SSE transport streams.</li>
              </ul>
            </div>

            {/* Project 3 */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-white font-bold text-sm">InvestIQ — Full-Stack Portfolio Tracker & AI Advisor</strong>
                <span className="font-mono text-xs text-cyan-400">React 19, Express.js, MongoDB, Zustand, Ollama</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs">
                <li>Built a full-stack portfolio tracker featuring live Yahoo Finance equity feeds, transaction history logging, and a locally-hosted streaming AI advisor for portfolio allocation.</li>
                <li>Implemented a resilient backend caching layer in Express to mitigate third-party API rate limits, reducing stock quote latency by 93% (from ~800ms to &lt;50ms) and serving last-known quotes on fetch failures.</li>
                <li>Implemented JWT-based authentication with bcrypt password hashing and secure HTTP-only cookies.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">Verified Resume Document • Don Bosco Institute of Technology</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
