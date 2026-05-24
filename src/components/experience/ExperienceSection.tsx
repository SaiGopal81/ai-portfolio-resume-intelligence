'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ChevronDown, ChevronUp, Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experiences } from '@/data/experience';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading 
            title="Experience" 
            subtitle="Building enterprise data solutions in production."
          />
        </ScrollReveal>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ experience }: { experience: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ScrollReveal>
      <GlowCard className="p-0 overflow-hidden bg-slate-900/80">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{experience.role}</h3>
              <div className="flex flex-wrap gap-4 text-slate-400 text-sm font-medium">
                <span className="flex items-center gap-1"><Building2 className="w-4 h-4 text-blue-400" /> {experience.company}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-purple-400" /> {experience.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-cyan-400" /> {experience.period}</span>
              </div>
            </div>
            <Badge className="w-fit bg-blue-500/20 text-blue-400 border-blue-500/30">{experience.type}</Badge>
          </div>

          <p className="text-slate-300 mb-6 leading-relaxed">
            {experience.description}
          </p>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full border border-slate-700/50 hover:bg-slate-800"
          >
            {isExpanded ? (
              <><ChevronUp className="w-4 h-4 mr-2" /> Show Less</>
            ) : (
              <><ChevronDown className="w-4 h-4 mr-2" /> View Details & Achievements</>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-slate-950/50 border-t border-slate-800"
            >
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-3">
                    {experience.responsibilities.map((resp: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-2 shrink-0" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                    Achievements
                  </h4>
                  <ul className="space-y-3">
                    {experience.achievements.map((ach: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech: string, i: number) => (
                      <Badge key={i} className="bg-slate-800 border-slate-700 text-slate-300">{tech}</Badge>
                    ))}
                  </div>
                </div>

                {experience.linkedProjects && experience.linkedProjects.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                      Related Projects
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {experience.linkedProjects.map((proj: string, i: number) => (
                        <Link key={i} href={`/projects/${proj}`}>
                          <Badge className="bg-slate-800 hover:bg-slate-700 hover:text-blue-400 border-slate-700 text-slate-300 cursor-pointer transition-colors">
                            {proj.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlowCard>
    </ScrollReveal>
  );
};
