'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Database, Brain, Cloud, ShieldCheck, Code2 } from 'lucide-react';
import { JourneyTimeline } from './JourneyTimeline';

export const AboutSection = () => {
  const expertise = [
    { icon: <Database className="w-6 h-6 text-blue-400" />, title: 'Data Engineering', desc: 'Building scalable ETL pipelines and data lakes using PySpark and Delta Lake.' },
    { icon: <Brain className="w-6 h-6 text-purple-400" />, title: 'AI Agents', desc: 'Developing multi-agent autonomous platforms using LangGraph and LLMs.' },
    { icon: <Cloud className="w-6 h-6 text-cyan-400" />, title: 'Cloud & Orchestration', desc: 'Architecting Azure-native solutions and orchestrating workflows with Airflow.' },
    { icon: <ShieldCheck className="w-6 h-6 text-green-400" />, title: 'Data Quality', desc: 'Implementing robust validation frameworks using Great Expectations.' },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading 
            title="About Me" 
            subtitle="Bridging the gap between raw data and intelligent systems."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          <ScrollReveal direction="right">
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <div className="relative pl-8 border-l-2 border-blue-500">
                <div className="absolute -left-[11px] top-1.5 p-1 bg-slate-900 rounded-full">
                  <div className="w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                </div>
                <p className="text-xl text-slate-200 font-light leading-relaxed">
                  As a Data Engineering Intern at Sigmoid, I am passionate about building <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">autonomous data platforms</span> that scale. I specialize in designing intelligent pipelines that can self-monitor, self-heal, and optimize without human intervention.
                </p>
              </div>
              <div className="relative pl-8 border-l-2 border-purple-500/30">
                <div className="absolute -left-[9px] top-2 p-1 bg-slate-900 rounded-full">
                  <div className="w-2 h-2 bg-purple-400/80 rounded-full" />
                </div>
                <p className="leading-relaxed">
                  My approach combines traditional data engineering best practices—like Medallion architectures and robust ETL patterns—with <span className="font-medium text-white">modern AI agentic frameworks</span>. I believe the future of data engineering lies in systems that not only move data, but <span className="text-purple-300 font-medium">understand and manage it autonomously</span>.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.2}>
            <GlowCard className="bg-slate-900/80 border-slate-700">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Professional Snapshot</h3>
              <div className="space-y-4">
                <SnapshotItem label="Current Role" value="Data Engineering Intern @ Sigmoid" />
                <SnapshotItem label="Education" value="B.Tech CSE, IIIT Bhubaneswar" />
                <SnapshotItem label="CGPA" value="8.02" />
                <SnapshotItem label="Focus Areas" value="Data Engineering, AI Systems, Cloud Platforms" />
              </div>
            </GlowCard>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Core Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <GlowCard key={item.title} className="flex flex-col items-center text-center p-6 bg-slate-900/50">
                <div className="p-3 bg-slate-800 rounded-lg mb-4 shadow-inner">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </GlowCard>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-32">
          <JourneyTimeline />
        </div>
      </div>
    </section>
  );
};

const SnapshotItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-800/50 last:border-0 gap-1">
    <span className="text-slate-400 font-medium">{label}</span>
    <span className="text-white font-semibold text-right">{value}</span>
  </div>
);
