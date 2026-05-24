'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';

export const HeroSection = () => {
  const orbitSkills = ['PySpark', 'LangGraph', 'Airflow', 'Databricks', 'Azure'];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ParticleBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-2">
              <motion.h1 
                className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Sai Gopal
              </motion.h1>
              <motion.h2 
                className="text-2xl md:text-3xl text-blue-400 font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                AI Data Engineer
              </motion.h2>
            </div>
            
            <motion.p 
              className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Building Autonomous Data Platforms, Intelligent Data Pipelines, and AI-Powered Systems.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="#projects">
                <Button variant="primary" size="lg">
                  View Projects <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/resume/resume.pdf" target="_blank">
                <Button variant="outline" size="lg">
                  Download Resume <Download className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:flex justify-center items-center h-[500px]"
          >
            <div className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
            <div className="absolute w-32 h-32 bg-purple-500/20 rounded-full blur-[50px]" />
            
            <div className="relative w-40 h-40 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.3)] z-10">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 text-center leading-tight">
                AI Data<br/>Engineer
              </span>
            </div>

            {orbitSkills.map((skill, i) => {
              const radius = 180;
              const angle = i * (360 / orbitSkills.length);
              return (
                <motion.div
                  key={skill}
                  className="absolute"
                  animate={{ rotate: [angle, angle + 360] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  style={{ width: radius * 2, height: radius * 2 }}
                >
                  <motion.div 
                    className="absolute top-0 left-1/2"
                    style={{ x: "-50%", y: "-50%" }}
                    animate={{ rotate: [-angle, -(angle + 360)] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  >
                    <Badge className="shadow-lg shadow-blue-500/20 px-4 py-2 text-sm whitespace-nowrap bg-slate-900 border-blue-500/30">
                      {skill}
                    </Badge>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-20 pb-10"
        >
          <MetricCard title="Internship" end={1} />
          <MetricCard title="Projects" end={5} suffix="+" />
          <MetricCard title="Technologies" end={15} suffix="+" />
          <MetricCard title="Records Processed" end={100} suffix="K+" />
          <MetricCard title="CGPA" end={8.02} isDecimal />
        </motion.div>
      </div>
    </section>
  );
};

const MetricCard = ({ title, end, suffix = '', isDecimal = false }: { title: string; end: number; suffix?: string; isDecimal?: boolean }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/5">
    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
      {isDecimal ? end : <AnimatedCounter end={end} suffix={suffix} />}
      {isDecimal && suffix}
    </div>
    <div className="text-xs md:text-sm text-slate-400 text-center font-medium uppercase tracking-wider">{title}</div>
  </div>
);
