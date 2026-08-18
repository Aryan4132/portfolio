import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Home, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ThankYouPageProps {
  onNavigateHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-8 backdrop-blur-xl shadow-2xl space-y-6 relative z-10 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TRANSMISSION_ACKNOWLEDGED</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white tracking-tight">
            Thank You for Reaching Out!
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Your message has been dispatched successfully. Aryan will review your inquiry and get back to you shortly.
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-slate-950 border border-white/10 rounded-xl p-4 text-left space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 font-mono text-cyan-400">
            <Mail className="w-4 h-4" />
            <span>Recipient: {PERSONAL_INFO.email}</span>
          </div>
          <p className="text-slate-400">
            Expected response timeframe: <strong className="text-white">Within 24 hours</strong> (IST / UTC+5:30).
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 hover:opacity-95 transition-all inline-flex items-center justify-center gap-2 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Back to Main Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
