'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, GitBranch, Cloud, Brain, Building2, LucideIcon } from 'lucide-react';
import { journeyNodes } from '@/data/journey';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Database,
  GitBranch,
  Cloud,
  Brain,
  Building2,
};

export const JourneyTimeline = () => {
  return (
    <div className="relative py-12">
      <ScrollReveal>
        <h3 className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          My Journey
        </h3>
      </ScrollReveal>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent -translate-x-1/2 rounded-full" />
        
        {journeyNodes.map((node, index) => {
          const Icon = iconMap[node.icon] || Code2;
          const isEven = index % 2 === 0;

          return (
            <ScrollReveal 
              key={node.title} 
              direction={isEven ? 'right' : 'left'} 
              delay={0.1}
              className={`relative flex items-center w-full mb-12 last:mb-0 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              {/* Mobile Content / Desktop Content */}
              <div className={`w-[calc(100%-60px)] ml-[60px] md:ml-0 md:w-5/12 ${isEven ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                <h4 className="text-xl font-bold text-white mb-2">{node.title}</h4>
                <p className="text-slate-400 text-sm">{node.description}</p>
              </div>

              {/* Node Icon */}
              <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] z-10 shrink-0">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>

              <div className="hidden md:block w-5/12" />
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};
