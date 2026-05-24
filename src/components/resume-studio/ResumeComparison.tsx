'use client';

import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { Button } from '@/components/ui/Button';
import { Download, ArrowRight, Save, LayoutTemplate } from 'lucide-react';
import { ChangeItem, ResumeVersion } from '@/types';
import { ChangesMade } from './ChangesMade';
import { Badge } from '@/components/ui/Badge';
import { toast } from 'react-hot-toast';

interface ResumeComparisonProps {
  originalText: string;
  optimizedText: string;
  changes: ChangeItem[];
  onSaveVersion: (version: Partial<ResumeVersion>) => void;
  onExport: () => void;
}

export const ResumeComparison = ({ originalText, optimizedText, changes, onSaveVersion, onExport }: ResumeComparisonProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onSaveVersion({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        optimizedContent: optimizedText,
      });
      toast.success('Version saved to history!');
      setIsSaving(false);
    }, 600);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h3 className="text-2xl font-bold text-white">Compare Versions</h3>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" /> Save to History
          </Button>
          <Button variant="primary" onClick={onExport}>
            Continue to Export <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlowCard className="p-0 overflow-hidden flex flex-col h-[600px]">
          <div className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0">
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span> Original Resume
            </h4>
          </div>
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap text-sm">
              {originalText}
            </div>
          </div>
        </GlowCard>

        <GlowCard className="p-0 overflow-hidden flex flex-col h-[600px]">
          <div className="bg-blue-900/20 border-b border-blue-900/50 p-4 sticky top-0 flex justify-between items-center">
            <h4 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Optimized Resume
            </h4>
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">AI Generated</Badge>
          </div>
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            <div className="prose prose-invert max-w-none text-slate-200 whitespace-pre-wrap text-sm">
              {optimizedText.split('\n').map((line, i) => {
                const isAdded = changes.some(c => c.type === 'added' && line.includes(c.description.split(' ')[0]));
                const isModified = changes.some(c => c.type === 'modified' && line.includes(c.description.split(' ')[0]));
                
                if (isAdded) return <span key={i} className="bg-green-500/20 text-green-200 block px-2 -mx-2 rounded">{line}</span>;
                if (isModified) return <span key={i} className="bg-yellow-500/20 text-yellow-200 block px-2 -mx-2 rounded">{line}</span>;
                
                return <span key={i} className="block min-h-[1.25rem]">{line}</span>;
              })}
            </div>
          </div>
        </GlowCard>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-6">AI Optimization Summary</h3>
        <ChangesMade changes={changes} />
      </div>
    </div>
  );
};
