import React from 'react';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/data/projects';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ExternalLink, GitBranch, Layout, Server, Target, CheckCircle2, Lightbulb, Brain, Trophy, AlertTriangle, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { BackButton } from '@/components/ui/BackButton';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Derive a category based on the project
  const isAI = project.techStack.includes('LangGraph') || project.techStack.includes('NLP') || project.techStack.includes('AI/ML');
  const category = isAI ? 'AI' : 'Data Engineering';

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#0a0f1c] text-slate-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation */}
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-900/90 p-8 md:p-12 mb-8 group">
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0 opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-30 transition-all duration-700 mix-blend-overlay" 
            style={{ backgroundImage: `url(${project.assets.banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          {/* Subtle Glows */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-950/80 via-transparent to-transparent pointer-events-none z-0" />
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700" />
          
          {/* Watermark Icon */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            {isAI ? <Brain className="w-64 h-64" /> : <Server className="w-64 h-64" />}
          </div>

          <div className="relative z-10">
            <Badge className="bg-slate-800/80 text-slate-300 border-slate-700 mb-6 px-3 py-1">
              {category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight max-w-3xl">
              {project.title}
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {project.techStack.map(tech => (
                <Badge key={tech} className="bg-blue-500/10 border-blue-500/20 text-blue-300 px-4 py-1.5 text-sm font-medium rounded-full">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {project.github !== '#' && (
                <Link href={project.github} target="_blank">
                  <Button variant="primary" className="px-6 h-11 bg-blue-600 hover:bg-blue-700 rounded-lg">
                    <FaGithub className="w-5 h-5 mr-2" /> View on GitHub
                  </Button>
                </Link>
              )}
              {project.liveDemo !== '#' && (
                <Link href={project.liveDemo} target="_blank">
                  <Button variant="outline" className="px-6 h-11 border-slate-700 hover:bg-slate-800 rounded-lg">
                    <ExternalLink className="w-5 h-5 mr-2" /> Live Demo
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Middle Section - Overview & At a Glance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 rounded-2xl border border-slate-800/60 bg-slate-900/30 p-8">
            <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
            <p className="text-slate-400 leading-relaxed text-[15px]">
              {project.overview}
            </p>
          </div>
          
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-8">
            <h2 className="text-xl font-bold text-white mb-4">At a glance</h2>
            <div className="space-y-4 text-[15px]">
              <div className="flex justify-between border-b border-slate-800/50 pb-3">
                <span className="text-slate-500">Category:</span>
                <span className="font-medium text-white">{category}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/50 pb-3">
                <span className="text-slate-500">Tech:</span>
                <span className="font-medium text-white">{project.techStack.length} technologies</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-500">Owner:</span>
                <span className="font-medium text-white">Sai Gopal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-8 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Problem statement</h2>
          <p className="text-slate-400 leading-relaxed text-[15px]">
            {project.problemStatement}
          </p>
        </div>

        {/* Architecture */}
        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-8 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Architecture</h2>
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 font-mono text-sm text-slate-300 overflow-x-auto whitespace-nowrap">
            {project.flowDiagram}
          </div>
          <p className="text-slate-400 mt-5 leading-relaxed text-[15px]">
            {project.architecture}
          </p>
        </div>

        {/* Bottom Grid - Features, Challenges, Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Features */}
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-8 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Features</h2>
            </div>
            <ul className="space-y-4 flex-1">
              {project.features.slice(0, 6).map((feature, i) => (
                <li key={i} className="flex items-start text-[14px] text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mr-3 shrink-0 mt-0.5" />
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-8 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Challenges</h2>
            </div>
            <ul className="space-y-4 flex-1">
              {project.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start text-[14px] text-slate-400">
                  <AlertTriangle className="w-4 h-4 text-purple-500 mr-3 shrink-0 mt-0.5" />
                  <span className="leading-snug">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Results */}
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-8 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Results</h2>
            </div>
            <ul className="space-y-4 flex-1">
              {project.results.map((result, i) => (
                <li key={i} className="flex items-start text-[14px] text-slate-400">
                  <Trophy className="w-4 h-4 text-cyan-500 mr-3 shrink-0 mt-0.5" />
                  <span className="leading-snug">{result}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
