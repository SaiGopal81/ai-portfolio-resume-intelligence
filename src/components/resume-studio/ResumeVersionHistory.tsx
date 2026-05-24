'use client';

import React from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { Button } from '@/components/ui/Button';
import { History, FileText, ArrowRight, Clock } from 'lucide-react';
import { ResumeVersion } from '@/types';

interface ResumeVersionHistoryProps {
  versions: ResumeVersion[];
  onSelectVersion: (version: ResumeVersion) => void;
}

export function ResumeVersionHistory({ versions, onSelectVersion }: ResumeVersionHistoryProps) {
  if (versions.length === 0) {
    return (
      <GlowCard className="p-8 text-center">
        <History className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Version History</h3>
        <p className="text-slate-400">Optimize a resume to generate your first version.</p>
      </GlowCard>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
        <History className="w-5 h-5 text-blue-400" /> Version History
      </h3>
      
      {versions.map((version, idx) => (
        <GlowCard key={version.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-200">
                {idx === versions.length - 1 ? 'Original Resume' : `Version ${versions.length - idx - 1}`}
              </h4>
              <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(version.createdAt).toLocaleString()}
                </span>
                {version.targetJobRole && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">
                    {version.targetJobRole}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => onSelectVersion(version)}>
            Compare <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </GlowCard>
      ))}
    </div>
  );
}
