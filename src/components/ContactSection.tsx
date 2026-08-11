import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Send, Copy, Check, Sparkles, MapPin, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const subject = encodeURIComponent(formData.subject || `Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;

    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-slate-950/80 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Initiate Transmission</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Let's Build <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400">High-Impact Systems</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Have a project requiring offline AI agents, custom canvas visualizers, or high-performance systems engineering? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Copy Email Card */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-['Outfit']">Direct Email</h3>
                  <p className="text-xs text-slate-400">Preferred for project inquiries</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5 font-mono text-xs text-cyan-300">
                <span className="truncate">{PERSONAL_INFO.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors shrink-0"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location & Institution Card */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <strong className="text-white block font-['Outfit'] font-bold">Base Location</strong>
                  <span className="text-slate-400 text-xs">Mumbai, Maharashtra, India (IST / UTC+5:30)</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-4">
              <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Social Links & Profiles</h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 flex items-center gap-2.5 transition-all text-xs font-mono"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>@Aryan4132</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 flex items-center gap-2.5 transition-all text-xs font-mono"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>aryanshukla4132</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <span>Send Direct Message</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in your details below and Aryan will receive your message directly.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-center space-y-2 animate-in fade-in">
                  <Sparkles className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="font-bold text-lg text-white font-['Outfit']">Transmission Dispatched!</h4>
                  <p className="text-xs text-slate-300">
                    Thank you for reaching out. Your message has been logged and sent to <span className="text-cyan-300 font-mono">{PERSONAL_INFO.email}</span>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Software Engineering Inquiry"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project goals or systems requirements..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Aryan</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
