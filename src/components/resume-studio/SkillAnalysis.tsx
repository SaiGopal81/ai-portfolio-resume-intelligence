'use client';

import React from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Badge } from '@/components/ui/Badge';
import { JobAnalysis } from '@/types';
import { ResumeCharts } from './ResumeCharts';
import { Target, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const SkillAnalysis = ({ analysis }: { analysis: JobAnalysis }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlowCard className="p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-4xl font-bold text-white mb-2">
            <AnimatedCounter end={analysis.matchPercentage} suffix="%" />
          </h3>
          <p className="text-slate-400 uppercase tracking-wider text-sm font-semibold">Match Score</p>
        </GlowCard>

        <GlowCard className="p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-4xl font-bold text-white mb-2">
            <AnimatedCounter end={analysis.matchedSkills.length} />
          </h3>
          <p className="text-slate-400 uppercase tracking-wider text-sm font-semibold">Matched Skills</p>
        </GlowCard>

        <GlowCard className="p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-4xl font-bold text-white mb-2">
            <AnimatedCounter end={analysis.missingSkills.length} />
          </h3>
          <p className="text-slate-400 uppercase tracking-wider text-sm font-semibold">Missing Skills</p>
        </GlowCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlowCard className="p-6 h-[400px]">
          <h4 className="text-lg font-semibold text-white mb-6">Skill Match Breakdown</h4>
          <ResumeCharts type="donut" data={analysis} />
        </GlowCard>
        
        <GlowCard className="p-6 h-[400px]">
          <h4 className="text-lg font-semibold text-white mb-6">Category Coverage</h4>
          <ResumeCharts type="radar" data={analysis} />
        </GlowCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">Matched Requirements</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.matchedSkills.map((skill, i) => (
              <Badge key={i} className="bg-green-500/10 text-green-400 border-green-500/20">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">Missing Requirements</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.missingSkills.map((skill, i) => (
              <Badge key={i} className="bg-red-500/10 text-red-400 border-red-500/20">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
