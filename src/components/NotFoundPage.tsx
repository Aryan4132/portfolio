import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Home, Terminal, RefreshCw } from 'lucide-react';

interface NotFoundPageProps {
  onNavigateHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl w-full bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-xl shadow-2xl space-y-6 relative z-10 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>ERROR_CODE: 404_ROUTE_NOT_FOUND</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-['Outfit'] text-white tracking-tight">
            Signal Disrupted
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            The target route you requested does not exist in the current grid. It may have been relocated or purged during a system update.
          </p>
        </div>

        {/* Terminal Log Box */}
        <div className="bg-slate-950 border border-white/10 rounded-xl p-4 text-left font-mono text-xs text-slate-400 space-y-1">
          <div className="text-slate-500">$ router --check-path {window.location.pathname}</div>
          <div className="text-rose-400">&gt; Status: 404 Not Found</div>
          <div className="text-cyan-400">&gt; Action: Fallback to home requested</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-950 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-medium transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Route</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
