'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { ResumeUpload } from '@/components/resume-studio/ResumeUpload';
import { JobDescription } from '@/components/resume-studio/JobDescription';
import { SkillAnalysis } from '@/components/resume-studio/SkillAnalysis';
import { ResumeData, JobAnalysis } from '@/types';

const STEPS = ['Upload', 'Job Description', 'Skill Gap Analysis'];

export default function ResumeStudioPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);

  const handleUploadComplete = (data: ResumeData) => {
    setResumeData(data);
    setCurrentStep(1);
  };

  const handleAnalysisComplete = (newAnalysis: JobAnalysis) => {
    setAnalysis(newAnalysis);
    setCurrentStep(2);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <StepIndicator steps={STEPS} currentStep={currentStep} />
        </div>

        <div className="min-h-[60vh]">
          {currentStep === 0 && (
            <ResumeUpload onComplete={handleUploadComplete} />
          )}

          {currentStep === 1 && resumeData && (
            <JobDescription 
              resumeData={resumeData} 
              onBack={() => setCurrentStep(0)} 
              onAnalyze={handleAnalysisComplete} 
            />
          )}

          {currentStep === 2 && analysis && (
            <div className="space-y-8 max-w-5xl mx-auto">
              <SkillAnalysis analysis={analysis} resumeData={resumeData!} onBack={() => setCurrentStep(0)} />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
