import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowLeft, Lock, Database, Mail, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigateHome }) => {
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

          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Verified</span>
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] text-white tracking-tight">
            Privacy Policy
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
              <Lock className="w-5 h-5 text-cyan-400" />
              <span>1. Overview & Commitments</span>
            </h2>
            <p>
              This Privacy Policy outlines how Aryan Shukla (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) handles information when you visit and interact with this website (<code className="text-cyan-300 font-mono">portfolio-aryan.pages.dev</code>). We prioritize data minimization, user privacy, and zero telemetry tracking.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-400" />
              <span>2. Data Collection & Processing</span>
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>
                <strong className="text-white">Contact Form Submissions:</strong> When you voluntarily submit a message via our contact form, we collect your name, email address, message subject, and message body. This information is processed solely to respond to your inquiry and is never shared with third parties.
              </li>
              <li>
                <strong className="text-white">Local Storage:</strong> We use browser <code className="text-cyan-300 font-mono">localStorage</code> strictly to remember your preferences (such as cookie consent choice). We do not store sensitive credentials or cross-site tracking tokens.
              </li>
              <li>
                <strong className="text-white">Privacy Analytics:</strong> We use lightweight, privacy-focused analytics to aggregate pageview counts. No personal identifiable information (PII), persistent IP tracking, or browser fingerprints are recorded or sold.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>3. Data Retention & Security</span>
            </h2>
            <p>
              Inquiries sent via email or contact forms are retained only for as long as necessary to address your project request or professional communication. We maintain reasonable technical safeguards to protect information against unauthorized access or disclosure.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span>4. Contact Information & Rights</span>
            </h2>
            <p>
              If you have questions regarding this Privacy Policy or wish to request data removal, contact us directly at:
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-white/10 space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-300">
                <Mail className="w-4 h-4" />
                <span>Email: {PERSONAL_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Address: {PERSONAL_INFO.address}</span>
              </div>
            </div>
          </section>

        </motion.div>

      </div>
    </div>
  );
};
