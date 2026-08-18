import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Check, Shield } from 'lucide-react';

interface CookieBannerProps {
  onNavigatePrivacy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigatePrivacy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent_accepted');
    if (!consent) {
      // Show banner after 1s delay for smooth entrance
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent_accepted', 'true');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent_accepted', 'false');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl bg-slate-900/95 border border-cyan-500/30 text-slate-100 shadow-2xl backdrop-blur-xl space-y-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Cookie className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-['Outfit'] text-white">Privacy &amp; Cookie Notice</h4>
            </div>

            <button
              onClick={handleDecline}
              className="text-slate-400 hover:text-white transition-colors p-1"
              title="Close banner"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            We use zero third-party tracking cookies. We only store essential local storage items for theme preferences and cookie consent status.{' '}
            <button
              onClick={onNavigatePrivacy}
              className="text-cyan-400 underline hover:text-cyan-300 transition-colors font-mono"
            >
              Read Privacy Policy
            </button>.
          </p>

          <div className="flex items-center gap-2.5 pt-1">
            <button
              onClick={handleAccept}
              className="flex-1 py-2 px-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept Essential Only</span>
            </button>

            <button
              onClick={handleDecline}
              className="py-2 px-3 rounded-xl bg-slate-950 border border-white/10 hover:bg-slate-800 text-slate-400 hover:text-white font-mono text-xs transition-all"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
