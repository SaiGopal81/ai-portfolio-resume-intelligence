import React from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { GlowCard } from '@/components/ui/GlowCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function AllProjectsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#0a0f1c] relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0f1c] to-[#0a0f1c] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-8">
          <Link href="/#projects" className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to portfolio
          </Link>
        </div>

        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">All Projects</h1>
          <p className="text-xl text-slate-400">A comprehensive list of my architectures, pipelines, and applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <GlowCard key={project.slug} className="p-0 overflow-hidden flex flex-col bg-slate-900 border-slate-800 group h-full">
              <div className="relative h-40 w-full overflow-hidden bg-slate-900 border-b border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                <img src={project.assets.banner} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-blue-600 border-blue-500 text-white shadow-lg">Featured</Badge>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.slice(0, 4).map(tech => (
                    <Badge key={tech} className="bg-slate-800 border-slate-700 text-slate-300 text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 4 && (
                    <Badge className="bg-slate-800 border-slate-700 text-slate-500 text-xs">
                      +{project.techStack.length - 4}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  <Link href={`/projects/${project.slug}`} className="flex-1">
                    <Button variant="primary" className="w-full h-10">
                      Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  {project.github !== '#' && (
                    <Link href={project.github} target="_blank">
                      <Button variant="outline" className="px-3 h-10" aria-label="GitHub Repository">
                        <FaGithub className="w-5 h-5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </GlowCard>
          ))}
        </div>

      </div>
    </div>
  );
}
