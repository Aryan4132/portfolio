import React from 'react';
import { Mail, FileText, ArrowRight } from 'lucide-react';

interface StickyMobileCTAProps {
  onOpenResume: () => void;
  onNavigateContact: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onOpenResume, onNavigateContact }) => {
  return (
    <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-slate-950/90 border-t border-cyan-500/20 backdrop-blur-lg shadow-2xl">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          onClick={onNavigateContact}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Mail className="w-4 h-4" />
          <span>Get in Touch</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onOpenResume}
          className="py-3 px-4 rounded-xl bg-slate-900 border border-white/10 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Resume</span>
        </button>
      </div>
    </div>
  );
};
