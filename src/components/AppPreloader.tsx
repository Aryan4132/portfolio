import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Terminal } from 'lucide-react';

export const AppPreloader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center p-4"
    >
      <div className="relative flex items-center justify-center mb-6">
        {/* Pulse Glow Rings */}
        <div className="w-24 h-24 rounded-full bg-cyan-500/20 animate-ping absolute" />
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-2xl relative z-10">
          <Cpu className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
      </div>

      <div className="text-center space-y-2 max-w-xs">
        <h3 className="text-lg font-bold font-['Outfit'] text-white">Aryan Shukla</h3>
        <p className="text-xs font-mono text-cyan-400 flex items-center justify-center gap-1.5">
          <Terminal className="w-3.5 h-3.5" />
          <span>BOOTING_CANVAS_SYSTEMS...</span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/10 mt-6">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
        />
      </div>
    </motion.div>
  );
};
