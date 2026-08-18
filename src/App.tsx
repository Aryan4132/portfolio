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
import { NotFoundPage } from './components/NotFoundPage';
import { ThankYouPage } from './components/ThankYouPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsPage } from './components/TermsPage';
import { CookieBanner } from './components/CookieBanner';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { AppPreloader } from './components/AppPreloader';
import { Project } from './types';
import { FileText, ArrowUp } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Preloader timeout on initial mount
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Listen to popstate history changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update route path helper
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll progress listener
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

  // Dynamic Meta Title & Description per route
  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    
    switch (currentPath) {
      case '/thank-you':
        document.title = 'Thank You for Reaching Out | Aryan Shukla';
        if (metaDesc) metaDesc.setAttribute('content', 'Thank you for reaching out to Aryan Shukla. Your inquiry has been received.');
        break;
      case '/privacy':
        document.title = 'Privacy Policy | Aryan Shukla';
        if (metaDesc) metaDesc.setAttribute('content', 'Privacy Policy for Aryan Shukla portfolio site. Zero telemetry tracking, maximum data privacy.');
        break;
      case '/terms':
        document.title = 'Terms of Service | Aryan Shukla';
        if (metaDesc) metaDesc.setAttribute('content', 'Terms of Service and intellectual property notice for Aryan Shukla portfolio code and demos.');
        break;
      case '/':
      case '':
        document.title = 'Aryan Shukla — Systems & Software Developer Portfolio';
        if (metaDesc) metaDesc.setAttribute('content', 'Portfolio of Aryan Shukla: Systems, AI & Software Developer specializing in offline desktop tools, custom 60 FPS Canvas visualizers, and backend caching systems.');
        break;
      default:
        document.title = '404 - Page Not Found | Aryan Shukla';
        if (metaDesc) metaDesc.setAttribute('content', 'The requested page route could not be found.');
        break;
    }
  }, [currentPath]);

  if (loading) {
    return <AppPreloader />;
  }

  // Render full sub-pages if route matches
  if (currentPath === '/thank-you') {
    return <ThankYouPage onNavigateHome={() => navigateTo('/')} />;
  }

  if (currentPath === '/privacy') {
    return <PrivacyPolicyPage onNavigateHome={() => navigateTo('/')} />;
  }

  if (currentPath === '/terms') {
    return <TermsPage onNavigateHome={() => navigateTo('/')} />;
  }

  if (currentPath !== '/' && currentPath !== '') {
    return <NotFoundPage onNavigateHome={() => navigateTo('/')} />;
  }

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
        <main className="flex-1 space-y-8 pb-12 md:pb-0">
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
          <ContactSection
            onNavigateThankYou={() => navigateTo('/thank-you')}
          />
        </main>

        {/* Footer */}
        <Footer
          onNavigatePrivacy={() => navigateTo('/privacy')}
          onNavigateTerms={() => navigateTo('/terms')}
        />

      </div>

      {/* Desktop Floating Quick Action Widget */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-2">
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

      {/* Sticky Mobile CTA Bar */}
      <StickyMobileCTA
        onOpenResume={() => setResumeOpen(true)}
        onNavigateContact={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Cookie / Privacy Notice Banner */}
      <CookieBanner
        onNavigatePrivacy={() => navigateTo('/privacy')}
      />

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
