'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { skills, getSkillsByCategory } from '@/data/skills';
import { Skill } from '@/types';
import { X, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const SkillsGalaxy = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const categories = getSkillsByCategory();
  const categoryNames = Object.keys(categories);

  const categoryColors: Record<string, string> = {
    'Data Engineering': 'from-blue-500/20 to-blue-500/5',
    'AI & ML': 'from-purple-500/20 to-purple-500/5',
    'Cloud & Orchestration': 'from-cyan-500/20 to-cyan-500/5',
    'Databases': 'from-green-500/20 to-green-500/5',
    'Programming Languages': 'from-orange-500/20 to-orange-500/5',
  };

  const nodeColors: Record<string, string> = {
    'Data Engineering': 'bg-blue-500 border-blue-400 shadow-blue-500/50',
    'AI & ML': 'bg-purple-500 border-purple-400 shadow-purple-500/50',
    'Cloud & Orchestration': 'bg-cyan-500 border-cyan-400 shadow-cyan-500/50',
    'Databases': 'bg-green-500 border-green-400 shadow-green-500/50',
    'Programming Languages': 'bg-orange-500 border-orange-400 shadow-orange-500/50',
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading 
            title="Skills & Technologies" 
            subtitle="The tools I use to build intelligent data systems."
          />
        </ScrollReveal>

        <div className="relative flex flex-col lg:flex-row gap-8 min-h-[600px]">
          
          <div className={`flex-1 transition-all duration-500 ${selectedSkill ? 'lg:w-2/3' : 'w-full'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {categoryNames.map((category) => (
                <ScrollReveal key={category} className={`p-6 rounded-2xl bg-gradient-to-br ${categoryColors[category]} border border-slate-800/50 backdrop-blur-sm relative overflow-hidden group`}>
                  <h3 className="text-xl font-bold text-white mb-6 tracking-wide">{category}</h3>
                  <div className="flex flex-wrap gap-4 relative z-10">
                    {categories[category].map((skill) => (
                      <motion.button
                        key={skill.name}
                        onClick={() => setSelectedSkill(skill)}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300
                          ${selectedSkill?.name === skill.name 
                            ? `${nodeColors[category]} text-white shadow-lg` 
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-white/20 hover:text-white hover:bg-slate-800'
                          }`}
                      >
                        {skill.name}
                      </motion.button>
                    ))}
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500" />
                </ScrollReveal>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {selectedSkill && (
              <motion.div
                initial={{ opacity: 0, x: 50, width: 0 }}
                animate={{ opacity: 1, x: 0, width: '100%' }}
                exit={{ opacity: 0, x: 50, width: 0 }}
                className="lg:w-1/3 lg:max-w-sm shrink-0"
              >
                <div className="sticky top-24 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl h-fit">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">{selectedSkill.name}</h4>
                      <Badge category={selectedSkill.category}>{selectedSkill.category}</Badge>
                    </div>
                    <button 
                      onClick={() => setSelectedSkill(null)}
                      className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</h5>
                      <p className="text-slate-300 text-sm leading-relaxed">{selectedSkill.description}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Used For</h5>
                      <ul className="space-y-2">
                        {selectedSkill.usedFor.map((use, i) => (
                          <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedSkill.relatedProjects.length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Related Projects</h5>
                        <div className="space-y-2">
                          {selectedSkill.relatedProjects.map((project, i) => {
                            const slug = project.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                            return (
                              <Link 
                                key={i} 
                                href={`/projects/${slug}`}
                                className="group flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-colors"
                              >
                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors truncate pr-4">
                                  {project}
                                </span>
                                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};
