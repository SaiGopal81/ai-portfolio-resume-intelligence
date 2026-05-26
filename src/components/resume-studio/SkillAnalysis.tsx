'use client';

import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Badge } from '@/components/ui/Badge';
import { JobAnalysis, ResumeData, SkillGapItem } from '@/types';
import { ResumeCharts } from './ResumeCharts';
import {
  CheckCircle2, BookOpen, FileWarning, Briefcase,
  Wrench, Brain, Sparkles, Shield, Target, TrendingUp, Lightbulb,
  GraduationCap, ChevronDown, ChevronUp, Clock, ArrowRight, BarChart3
} from 'lucide-react';
import { ChatGPTIntegration } from './ChatGPTIntegration';

export const SkillAnalysis = ({ analysis, resumeData, onBack }: { analysis: JobAnalysis, resumeData: ResumeData, onBack?: () => void }) => {

  const technicalGaps = (analysis.skillGapItems?.filter(i => i.type === 'technical') || [])
    .sort((a, b) => (a.learningOrder || 99) - (b.learningOrder || 99));
  const domainOpps = (analysis.domainExposureOpportunities || [])
    .sort((a, b) => (a.learningOrder || 99) - (b.learningOrder || 99));
  const rs = analysis.recruiterSummary;
  const cb = analysis.coverageBreakdown;

  const priorityColors: Record<string, { badge: string; border: string; dot: string }> = {
    'Critical': { badge: 'bg-red-500/10 text-red-400 border-red-500/20', border: 'border-l-red-500', dot: 'bg-red-500' },
    'High': { badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20', border: 'border-l-orange-500', dot: 'bg-orange-500' },
    'Medium': { badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', border: 'border-l-yellow-500', dot: 'bg-yellow-500' },
    'Low': { badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20', border: 'border-l-blue-500', dot: 'bg-blue-500' },
  };

  const readinessColors: Record<string, string> = {
    'Beginner Exposure': 'text-red-300 bg-red-500/10',
    'Working Knowledge': 'text-yellow-300 bg-yellow-500/10',
    'Interview Ready': 'text-green-300 bg-green-500/10',
  };

  return (
    <div className="space-y-10">

      {/* ─── Quick Summary Bar ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlowCard className="p-5 flex flex-col items-center text-center bg-green-500/5 border-green-500/20">
          <h3 className="text-3xl font-bold text-green-400 mb-1">
            <AnimatedCounter end={analysis.matchedSkills?.length || 0} />
          </h3>
          <p className="text-green-500/70 text-xs font-semibold uppercase">Matched</p>
        </GlowCard>
        <GlowCard className="p-5 flex flex-col items-center text-center bg-red-500/5 border-red-500/20">
          <h3 className="text-3xl font-bold text-red-400 mb-1">
            <AnimatedCounter end={analysis.missingSkills?.length || 0} />
          </h3>
          <p className="text-red-500/70 text-xs font-semibold uppercase">Missing</p>
        </GlowCard>
        <GlowCard className="p-5 flex flex-col items-center text-center bg-blue-500/5 border-blue-500/20">
          <h3 className="text-3xl font-bold text-blue-400 mb-1">
            <AnimatedCounter end={analysis.matchPercentage} suffix="%" />
          </h3>
          <p className="text-blue-500/70 text-xs font-semibold uppercase">Exact Match</p>
        </GlowCard>
        <GlowCard className="p-5 flex flex-col items-center text-center bg-purple-500/5 border-purple-500/20">
          <h3 className="text-3xl font-bold text-purple-400 mb-1">
            <AnimatedCounter end={analysis.atsRelevanceScore || 0} suffix="%" />
          </h3>
          <p className="text-purple-500/70 text-xs font-semibold uppercase">ATS Relevance</p>
        </GlowCard>
      </div>

      {/* ─── Recruiter Summary ─── */}
      {rs && (rs.strengths?.length > 0 || rs.topGaps?.length > 0) && (
        <GlowCard className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/30 border-indigo-500/20 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 opacity-5">
            <Shield className="w-48 h-48" />
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Your Strengths
              </h4>
              <div className="flex flex-wrap gap-2">
                {rs.strengths?.map((s, i) => (
                  <Badge key={i} className="bg-green-500/10 text-green-400 border-green-500/20 text-sm px-3 py-1">{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" /> Top Gaps to Address
              </h4>
              <div className="flex flex-wrap gap-2">
                {rs.topGaps?.map((s, i) => (
                  <Badge key={i} className="bg-red-500/10 text-red-400 border-red-500/20 text-sm px-3 py-1">{s}</Badge>
                ))}
              </div>
            </div>
          </div>
        </GlowCard>
      )}

      {/* ═══════════════════════════════════════════════════════════
          LEARNING ROADMAP VIEW (Default)
          ═══════════════════════════════════════════════════════════ */}

      {/* ─── Technical Skills Roadmap ─── */}
      {technicalGaps.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <Wrench className="w-6 h-6 text-purple-400" /> Technical Skill Roadmap
          </h2>
          <p className="text-slate-400 text-sm mb-6">Learn these in the recommended order to maximize your JD match.</p>

          <div className="space-y-4">
            {technicalGaps.map((item, idx) => {
              const pc = priorityColors[item.priority] || priorityColors['Low'];
              const rc = readinessColors[item.readinessLevel] || readinessColors['Beginner Exposure'];
              return (
                <div key={idx} className={`bg-slate-900/50 border border-slate-800 border-l-4 ${pc.border} rounded-xl p-5 hover:bg-slate-800/30 transition-colors`}>
                  <div className="flex flex-col md:flex-row md:items-start gap-4">

                    {/* Order Number */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg font-bold text-white">
                      {item.learningOrder || idx + 1}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">{item.skill}</h4>
                        <Badge className={pc.badge}>{item.priority}</Badge>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${rc}`}>
                          <GraduationCap className="w-3 h-3" /> {item.readinessLevel}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mb-3">{item.reason}</p>

                      {item.learningPath && item.learningPath.length > 0 && (
                        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/50 inline-block">
                          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
                            <BookOpen className="w-3.5 h-3.5" /> Next Step
                          </div>
                          <p className="text-xs text-slate-300">{item.learningPath[0].description}</p>
                        </div>
                      )}
                    </div>

                    {/* Hours */}
                    <div className="flex-shrink-0 text-right">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-semibold">{item.estimatedLearningHours || 'TBD'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow connector to next */}
                  {idx < technicalGaps.length - 1 && (
                    <div className="flex justify-center mt-4 -mb-2 text-slate-700">
                      <ArrowRight className="w-5 h-5 rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Domain Exposure Opportunities ─── */}
      {domainOpps.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <Brain className="w-6 h-6 text-cyan-400" /> Domain Exposure Opportunities
          </h2>
          <p className="text-slate-400 text-sm mb-6">Industry knowledge to explore — these won't block your application but will strengthen it.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {domainOpps.map((item, idx) => {
              const rc = readinessColors[item.readinessLevel] || readinessColors['Beginner Exposure'];
              return (
                <div key={idx} className="bg-slate-900/50 border border-cyan-500/10 rounded-xl p-5 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/10 flex items-center justify-center text-sm font-bold text-cyan-400">
                        {item.learningOrder || idx + 1}
                      </div>
                      <h5 className="text-base font-bold text-white">{item.skill}</h5>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <Clock className="w-3.5 h-3.5" /> {item.estimatedLearningHours || 'TBD'}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{item.reason}</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${rc}`}>
                    <GraduationCap className="w-3 h-3" /> {item.readinessLevel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── ChatGPT Prompt ─── */}
      <ChatGPTIntegration analysis={analysis} resumeData={resumeData} />

      {/* ─── Back Button ─── */}
      {onBack && (
        <div className="pt-8 border-t border-slate-800 flex justify-center">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            Upload Different File
          </button>
        </div>
      )}
    </div>
  );
};
