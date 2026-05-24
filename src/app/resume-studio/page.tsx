'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { ResumeUpload } from '@/components/resume-studio/ResumeUpload';
import { JobDescription } from '@/components/resume-studio/JobDescription';
import { SkillAnalysis } from '@/components/resume-studio/SkillAnalysis';
import { ResumeComparison } from '@/components/resume-studio/ResumeComparison';
import { ExportPanel } from '@/components/resume-studio/ExportPanel';
import { ResumeData, JobAnalysis, ChangeItem, ResumeVersion } from '@/types';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { saveVersion } from '@/lib/resume-versions';

const STEPS = ['Upload', 'Job Description', 'Analysis', 'Review', 'Export'];

export default function ResumeStudioPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [optimizedText, setOptimizedText] = useState<string>('');
  const [changes, setChanges] = useState<ChangeItem[]>([]);

  const originalText = `Sai Gopal\nAI Data Engineer\nExperience: Data Engineering Intern at Sigmoid\nBuilt data pipelines using PySpark and Airflow.`;

  const handleUploadComplete = (data: ResumeData) => {
    setResumeData(data);
    setCurrentStep(1);
  };

  const handleAnalysisComplete = (newAnalysis: JobAnalysis) => {
    setAnalysis(newAnalysis);
    
    setOptimizedText(`Sai Gopal\nAI Data Engineer\nExperience: Data Engineering Intern at Sigmoid\n- Architected scalable data pipelines using PySpark and Airflow\n- Optimized query performance by 40%`);
    
    setChanges([
      { type: 'enhanced', section: 'Experience', description: 'Rewrote bullet point to include action verbs and metrics' },
      { type: 'added', section: 'Skills', description: 'Added required skill: Kubernetes based on JD' }
    ]);
    
    setCurrentStep(2);
  };

  const handleSaveVersion = (version: Partial<ResumeVersion>) => {
    saveVersion(version as ResumeVersion);
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
              <SkillAnalysis analysis={analysis} />
              <div className="flex justify-end pt-8 border-t border-slate-800">
                <Button variant="primary" onClick={() => setCurrentStep(3)}>
                  Review AI Optimizations <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <ResumeComparison 
              originalText={originalText}
              optimizedText={optimizedText}
              changes={changes}
              onSaveVersion={handleSaveVersion}
              onExport={() => setCurrentStep(4)}
            />
          )}

          {currentStep === 4 && (
            <ExportPanel />
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
