'use client';

import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { Button } from '@/components/ui/Button';
import { Bot, Copy, CheckCircle2, Sparkles } from 'lucide-react';
import { JobAnalysis, ResumeData } from '@/types';
import { toast } from 'react-hot-toast';

interface ChatGPTIntegrationProps {
  analysis: JobAnalysis;
  resumeData: ResumeData;
}

export const ChatGPTIntegration = ({ analysis, resumeData }: ChatGPTIntegrationProps) => {
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const prompt = `Act as an Expert Technical Recruiter and Resume Writer. I need you to optimize my resume based on a Skill Gap Analysis.

### MY CURRENT SKILLS (Matched with JD)
${analysis.matchedSkills?.join(', ') || 'None identified'}

### TARGET JOB REQUIRED SKILLS
${analysis.requiredSkills?.join(', ') || 'None identified'}

### MY MISSING TECHNICAL SKILLS
${analysis.missingSkills?.join(', ') || 'None'}

### MISSING TECHNICAL ATS KEYWORDS
${analysis.missingTechnicalATS?.join(', ') || 'None'}

### MISSING DOMAIN ATS KEYWORDS
${analysis.missingDomainATS?.join(', ') || 'None'}

### DOMAIN EXPOSURE OPPORTUNITIES
${analysis.domainExposureOpportunities?.map(d => d.skill).join(', ') || 'None'}

### MY CURRENT RESUME CONTENT
${resumeData.rawText}

### OPTIMIZATION INSTRUCTIONS:
1. Revise my resume bullet points to naturally incorporate as many of the "Target Job Required Skills" and "Missing Technical ATS Keywords" as possible, assuming I have foundational knowledge in them.
2. If I am missing critical skills like ${analysis.missingSkills?.slice(0, 3).join(', ') || 'N/A'}, suggest 2-3 new bullet points I could add if I complete a quick project in them.
3. Add domain-relevant language for: ${analysis.missingDomainATS?.join(', ') || 'N/A'}. Frame existing experience using industry terminology.
4. Quantify my achievements using the XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]).
5. Output the final optimized resume in Markdown format.

Please provide the optimized resume now.`;

    return prompt;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatePrompt());
    setCopied(true);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <GlowCard className="p-8 mt-12 bg-slate-900/50 border-blue-500/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Bot className="w-64 h-64" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Generate ChatGPT Prompt</h3>
          </div>
          
          <p className="text-slate-400 mb-6 leading-relaxed">
            Instead of generating a generic resume, we've packaged your entire Skill Gap Analysis into a highly-optimized prompt. 
            Copy this prompt and paste it directly into ChatGPT or Claude to get a perfectly tailored resume rewrite that addresses your specific skill gaps and missing ATS keywords.
          </p>

          <Button 
            variant="primary" 
            size="lg" 
            onClick={handleCopy}
            className="w-full sm:w-auto"
          >
            {copied ? (
              <><CheckCircle2 className="w-5 h-5 mr-2" /> Copied to Clipboard!</>
            ) : (
              <><Copy className="w-5 h-5 mr-2" /> Copy Optimization Prompt</>
            )}
          </Button>
        </div>

        <div className="flex-1 w-full bg-slate-950 rounded-xl border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-2 border-b border-slate-800 pb-2">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Prompt Preview</span>
          </div>
          <div className="h-48 overflow-y-auto custom-scrollbar pr-2">
            <pre className="text-sm font-mono text-slate-300 whitespace-pre-wrap">
              {generatePrompt()}
            </pre>
          </div>
        </div>
      </div>
    </GlowCard>
  );
};
