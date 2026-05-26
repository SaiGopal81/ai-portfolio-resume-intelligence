import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { GlowCard } from '@/components/ui/GlowCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Download, Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap } from 'lucide-react';
import { SITE_CONFIG, CONTACT_INFO } from '@/constants';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Recruiter Dashboard | Sai Gopal',
  description: 'Quick technical overview of Sai Gopal\'s engineering profile tailored for recruiters.',
};

export default function RecruiterPage() {
  const topSkills = ['PySpark', 'Apache Airflow', 'Next.js 15', 'Python', 'PostgreSQL', 'Docker', 'Kubernetes', 'Delta Lake'];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Recruiter Snapshot</h1>
            <p className="text-slate-400 text-lg">Quick technical overview tailored for talent acquisition teams.</p>
          </div>
          <Link href="/resume/resume.pdf" target="_blank">
            <Button variant="primary">
              <Download className="w-4 h-4 mr-2" /> Download Full Resume
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Core Info */}
          <div className="lg:col-span-1 space-y-6">
            <GlowCard className="p-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                SG
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{SITE_CONFIG.name}</h2>
              <p className="text-blue-400 font-medium mb-4">{SITE_CONFIG.role}</p>
              
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-blue-400 transition-colors">{CONTACT_INFO.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{CONTACT_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{CONTACT_INFO.location}</span>
                </div>
              </div>
            </GlowCard>

            <GlowCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Core Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {topSkills.map((skill, idx) => (
                  <Badge key={idx} className="bg-slate-800 text-slate-300 border-slate-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </GlowCard>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            <GlowCard className="p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                <Briefcase className="w-5 h-5 text-blue-400" /> Current Experience
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-semibold text-slate-200">Data Engineering Intern</h4>
                  <span className="text-sm text-slate-400">2023 - Present</span>
                </div>
                <p className="text-blue-400 font-medium">Sigmoid</p>
                <ul className="list-disc list-inside text-sm text-slate-300 mt-4 space-y-2 ml-1">
                  <li>Architected scalable data pipelines utilizing PySpark, Airflow, and Delta Lake.</li>
                  <li>Improved ETL query performance by 40% through partitioning and Z-ordering strategies.</li>
                  <li>Deployed robust cloud infrastructures on AWS and Azure platforms.</li>
                </ul>
              </div>
            </GlowCard>

            <GlowCard className="p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                <GraduationCap className="w-5 h-5 text-purple-400" /> Education
              </h3>
              
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-semibold text-slate-200">B.Tech Computer Science Engineering</h4>
                  <span className="text-sm font-bold text-green-400">CGPA: 8.02</span>
                </div>
                <p className="text-purple-400 font-medium">IIIT Bhubaneswar</p>
              </div>
            </GlowCard>

            <GlowCard className="p-6">
              <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white">Top Technical Projects</h3>
                <Link href="/#projects" className="text-sm text-blue-400 hover:text-blue-300 flex items-center">
                  View All <ExternalLink className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-200 mb-2">Autonomous Data Platform</h4>
                  <p className="text-sm text-slate-400 mb-3">End-to-end data platform orchestrating multi-cloud workloads with zero-downtime deployments.</p>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Data Engineering</Badge>
                    <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Cloud</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-200 mb-2">AI-Powered Resume Studio</h4>
                  <p className="text-sm text-slate-400 mb-3">Enterprise application utilizing RAG and LLMs to optimize resumes against target job descriptions.</p>
                  <div className="flex gap-2">
                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">AI & ML</Badge>
                    <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">Full Stack</Badge>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
