import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Layout, Cpu, Server, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const TechArsenalSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.title)];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-amber-400" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredCategories =
    activeCategory === 'All'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.title === activeCategory);

  return (
    <section id="tech" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tech Arsenal & Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Core <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400">Technical Stack</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Technologies and frameworks used across desktop application development, custom canvas physics, AST parsing, and backend caching.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat === 'All' && <Filter className="w-3.5 h-3.5" />}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl bg-slate-900/70 border border-white/10 p-6 sm:p-8 backdrop-blur-md glass-panel-hover"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-6">
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                  {getIcon(cat.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-['Outfit']">{cat.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">{cat.skills.length} Core Competencies</p>
                </div>
              </div>

              {/* Skills List */}
              <div className="grid grid-cols-1 gap-3">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/30 transition-all group flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 pl-6">{skill.description}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono shrink-0">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
