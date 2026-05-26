'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FileText, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '@/data/projects';

export const ProjectsSection = () => {
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <section id="projects" className="py-24 relative bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading 
            title="Featured Projects" 
            subtitle="Architecting data solutions from ingestion to insights."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {featuredProjects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.1}>
              <GlowCard className="p-0 overflow-hidden h-full flex flex-col bg-slate-900 border-slate-800 group">
                <div className="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                  <img src={project.assets.banner} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-6 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.slice(0, 5).map(tech => (
                      <Badge key={tech} className="bg-slate-800 border-slate-700 text-slate-300">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 5 && (
                      <Badge className="bg-slate-800 border-slate-700 text-slate-500">
                        +{project.techStack.length - 5}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    <Link href={`/projects/${project.slug}`} className="flex-1">
                      <Button variant="primary" className="w-full">
                        View Project <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href={project.github} target="_blank">
                      <Button variant="outline" className="px-3" aria-label="GitHub Repository">
                        <FaGithub className="w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/projects">
            <Button variant="outline" size="lg">
              View All Projects <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
