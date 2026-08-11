import React, { useState, useEffect } from 'react';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TechArsenalSection } from './components/TechArsenalSection';
import { FlagshipProjectsSection } from './components/FlagshipProjectsSection';
import { KnowledgeGraphSandbox } from './components/KnowledgeGraphSandbox';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { Project } from './types';
import { FileText, ArrowUp } from 'lucide-react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Three.js Interactive 3D Canvas Background */}
      <ThreeBackground currentSection="hero" scrollProgress={scrollProgress} />

      {/* Main UI Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Bar */}
        <Navbar
          scrollProgress={scrollProgress}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1 space-y-8">
          {/* Hero Section */}
          <HeroSection
            onOpenResume={() => setResumeOpen(true)}
          />

          {/* Tech Arsenal & Stack */}
          <TechArsenalSection />

          {/* Flagship Projects Showcase */}
          <FlagshipProjectsSection
            onSelectProject={(project) => setSelectedProject(project)}
          />

          {/* AI Knowledge Graph 60FPS Physics Sandbox */}
          <KnowledgeGraphSandbox />

          {/* Education & Systems Philosophy */}
          <ExperienceEducationSection
            onOpenResume={() => setResumeOpen(true)}
          />

          {/* Contact & Transmission */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

      </div>

      {/* Floating Quick Action Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        {scrollProgress > 0.1 && (
          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-2xl bg-slate-900/90 text-cyan-400 backdrop-blur-md shadow-2xl hover:scale-110 hover:bg-slate-800 transition-all flex items-center justify-center border border-cyan-500/20 active:scale-95"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={() => setResumeOpen(true)}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-2xl hover:scale-110 transition-all flex items-center justify-center border border-cyan-400/30 active:scale-95"
          title="View Resume Sheet"
          aria-label="View Resume Sheet"
        >
          <FileText className="w-5 h-5" />
        </button>
      </div>

      {/* Project Specs Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Printable Resume Viewer Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

    </div>
  );
}
