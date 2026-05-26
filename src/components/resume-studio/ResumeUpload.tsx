'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileType, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { GlowCard } from '@/components/ui/GlowCard';
import { Button } from '@/components/ui/Button';
import { ResumeData } from '@/types';
import { toast } from 'react-hot-toast';

interface ResumeUploadProps {
  onComplete: (data: ResumeData) => void;
}

export const ResumeUpload = ({ onComplete }: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<ResumeData | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (!selected) return;
    
    if (selected.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    setFile(selected);
    setIsParsing(true);

    const formData = new FormData();
    formData.append('file', selected);

    try {
      const res = await fetch('/api/resume-studio/parse', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.details || data.error || 'Failed to parse resume');
      }
      
      setParsedData(data);
      toast.success('Resume parsed successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error parsing resume. Please try again.');
      setFile(null);
    } finally {
      setIsParsing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/x-tex': ['.tex']
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Upload Your Resume</h2>
        <p className="text-slate-400">We'll extract your details to tailor it for specific job descriptions.</p>
      </div>

      {!parsedData ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
            isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
              {isParsing ? <Loader2 className="w-8 h-8 text-blue-500 animate-spin" /> : <Upload className="w-8 h-8 text-slate-400" />}
            </div>
            {isParsing ? (
              <p className="text-lg font-medium text-white">Extracting contents with AI...</p>
            ) : (
              <>
                <p className="text-lg font-medium text-white">
                  {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
                </p>
                <p className="text-sm text-slate-400">Supports PDF, DOCX, and LaTeX (.tex) up to 5MB</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <GlowCard className="p-8">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{parsedData.name || file?.name}</h3>
              <p className="text-slate-400">{parsedData.role || 'Ready for optimization'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-900 rounded-lg p-4 text-center border border-slate-800">
              <div className="text-2xl font-bold text-blue-400">{parsedData.skills?.length || 0}</div>
              <div className="text-xs text-slate-500 uppercase">Skills Found</div>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 text-center border border-slate-800">
              <div className="text-2xl font-bold text-purple-400">{parsedData.experience?.length || 0}</div>
              <div className="text-xs text-slate-500 uppercase">Experiences</div>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 text-center border border-slate-800">
              <div className="text-2xl font-bold text-cyan-400">{parsedData.projects?.length || 0}</div>
              <div className="text-xs text-slate-500 uppercase">Projects</div>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 text-center border border-slate-800">
              <div className="text-2xl font-bold text-green-400">{parsedData.education?.length || 0}</div>
              <div className="text-xs text-slate-500 uppercase">Education</div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="ghost" onClick={() => { setParsedData(null); setFile(null); }}>
              Upload Different File
            </Button>
            <Button variant="primary" onClick={() => onComplete(parsedData)}>
              Continue to Job Description
            </Button>
          </div>
        </GlowCard>
      )}
    </div>
  );
};
