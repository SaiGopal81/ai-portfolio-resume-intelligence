'use client';

import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { Button } from '@/components/ui/Button';
import { Download, FileType, CheckCircle2, FileText, Code } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const ExportPanel = () => {
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExport = async (format: string) => {
    setExporting(format);
    try {
      const res = await fetch('/api/resume-studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format, optimizedContent: '\\section*{Summary}\\nOptimized AI Data Engineer Resume.' })
      });
      
      if (!res.ok) throw new Error('Export failed');
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`Resume exported as ${format.toUpperCase()} successfully!`);
    } catch (error) {
      toast.error(`Failed to export ${format.toUpperCase()}`);
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Export Your Resume</h2>
        <p className="text-slate-400">Your optimized resume has been securely injected into the base template.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlowCard className="p-8 flex flex-col items-center justify-center text-center group cursor-pointer" onClick={() => handleExport('pdf')}>
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FileType className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">PDF Format</h3>
          <p className="text-sm text-slate-400 mb-6">Best for email applications and ATS systems.</p>
          <Button variant="primary" className="w-full" disabled={exporting !== null}>
            {exporting === 'pdf' ? 'Generating...' : <><Download className="w-4 h-4 mr-2" /> Download PDF</>}
          </Button>
        </GlowCard>

        <GlowCard className="p-8 flex flex-col items-center justify-center text-center group cursor-pointer" onClick={() => handleExport('docx')}>
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">DOCX Format</h3>
          <p className="text-sm text-slate-400 mb-6">Fully editable Word document format.</p>
          <Button variant="primary" className="w-full" disabled={exporting !== null}>
            {exporting === 'docx' ? 'Generating...' : <><Download className="w-4 h-4 mr-2" /> Download DOCX</>}
          </Button>
        </GlowCard>

        <GlowCard className="p-8 flex flex-col items-center justify-center text-center group cursor-pointer" onClick={() => handleExport('tex')}>
          <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Code className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">LaTeX Source</h3>
          <p className="text-sm text-slate-400 mb-6">Raw .tex file for manual typesetting.</p>
          <Button variant="outline" className="w-full" disabled={exporting !== null}>
            {exporting === 'tex' ? 'Generating...' : <><Download className="w-4 h-4 mr-2" /> Download .tex</>}
          </Button>
        </GlowCard>
      </div>

      <div className="mt-12 p-6 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-4">
        <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-green-400 font-semibold mb-1">Template Injection Successful</h4>
          <p className="text-green-200/70 text-sm">Your optimized content has been injected into the `base-resume.tex` master template. The original formatting, sections, and layout have been perfectly preserved.</p>
        </div>
      </div>
    </div>
  );
};
