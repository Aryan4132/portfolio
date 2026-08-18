import React from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowLeft, ShieldAlert, Code2, Globe, Scale } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface TermsPageProps {
  onNavigateHome: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-8 relative">
      <div className="max-w-4xl mx-auto space-y-8 pt-8 pb-16">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-mono transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>

          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs">
            <FileText className="w-4 h-4" />
            <span>Terms &amp; Conditions</span>
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-sm font-mono">
            Last Updated: August 18, 2026 • Effective Date: Immediate
          </p>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 sm:p-10 backdrop-blur-xl space-y-8 text-slate-300 text-sm leading-relaxed"
        >
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span>1. Acceptance of Terms</span>
            </h2>
            <p>
              By accessing and browsing this portfolio website (<code className="text-cyan-300 font-mono">portfolio-aryan.pages.dev</code>), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of this site.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <span>2. Intellectual Property & Code Demos</span>
            </h2>
            <p>
              All original code, interactive canvas implementations, portfolio content, project documentation, and custom UI components presented on this site are the intellectual property of Aryan Shukla, unless explicitly stated otherwise or governed by open-source repositories linked on GitHub (<code className="text-cyan-300 font-mono">github.com/Aryan4132</code>).
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>3. Disclaimer of Warranties</span>
            </h2>
            <p>
              The code samples, interactive simulations, and technical demos provided on this site are for demonstration and portfolio showcase purposes. All content is provided &quot;as is&quot; without warranties of any kind, express or implied.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              <span>4. Governing Law & Inquiries</span>
            </h2>
            <p>
              These terms are governed by the laws of India. For any legal inquiries or permission requests regarding portfolio contents, reach out to Aryan Shukla at <code className="text-cyan-300 font-mono">{PERSONAL_INFO.email}</code>.
            </p>
          </section>

        </motion.div>

      </div>
    </div>
  );
};
