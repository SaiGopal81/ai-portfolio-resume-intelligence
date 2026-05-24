'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { GlowCard } from '@/components/ui/GlowCard';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { ResumeData, JobAnalysis } from '@/types';
import { toast } from 'react-hot-toast';

interface JobDescriptionProps {
  onBack: () => void;
  onAnalyze: (analysis: JobAnalysis) => void;
  resumeData: ResumeData;
}

export const JobDescription = ({ onBack, onAnalyze, resumeData }: JobDescriptionProps) => {
  const [jd, setJd] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!jd.trim() || jd.length < 50) {
      toast.error('Please enter a longer job description for accurate analysis.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/resume-studio/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData, jd })
      });
      
      if (!res.ok) throw new Error('Failed to analyze');
      
      const analysis: JobAnalysis = await res.json();
      onAnalyze(analysis);
      toast.success('Analysis complete!');
    } catch (err) {
      toast.error('Error analyzing job description. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-slate-400">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="text-sm text-slate-500">
          {jd.length} / 10000 characters
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Paste Job Description</h2>
        <p className="text-slate-400">Paste the target job description to analyze your fit and get an optimized resume.</p>
      </div>

      <GlowCard className="p-1">
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value.slice(0, 10000))}
          placeholder="Paste the target job description here..."
          className="w-full h-96 bg-slate-900/50 border-0 rounded-xl p-6 text-white focus:ring-0 resize-none custom-scrollbar"
        />
      </GlowCard>

      <div className="flex justify-center pt-4">
        <Button 
          variant="primary" 
          size="lg" 
          onClick={handleAnalyze} 
          disabled={!jd.trim() || isAnalyzing}
          className="w-full md:w-auto px-12"
        >
          {isAnalyzing ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing with AI...</>
          ) : (
            <><Sparkles className="w-5 h-5 mr-2" /> Analyze & Optimize Resume</>
          )}
        </Button>
      </div>
    </div>
  );
};
