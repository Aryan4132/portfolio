import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  scrollProgress: number;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollProgress, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section observer highlight
      const sections = ['hero', 'tech', 'projects', 'graph', 'education', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Tech Stack', href: '#tech' },
    { name: 'Projects', href: '#projects' },
    { name: 'Knowledge Graph', href: '#graph' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Scroll Indicator Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <header
        className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Name */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 transition-all">
              <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Outfit'] font-bold text-lg text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  Aryan Shukla
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
                Systems & Software Developer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-semibold hover:from-cyan-400 hover:to-indigo-500 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 mx-4 p-4 rounded-2xl bg-[#0F172A] border border-white/10 shadow-2xl flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-300"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
