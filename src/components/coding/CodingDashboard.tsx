'use client';

import React, { useEffect, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Code2, AlertCircle, RefreshCw } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';

export const CodingDashboard = () => {
  const [githubStats, setGithubStats] = useState<any>(null);
  const [leetcodeStats, setLeetcodeStats] = useState<any>(null);
  const [loading, setLoading] = useState({ github: true, leetcode: true });
  const [error, setError] = useState({ github: false, leetcode: false });

  const fetchGithub = async () => {
    setLoading(prev => ({ ...prev, github: true }));
    setError(prev => ({ ...prev, github: false }));
    try {
      const res = await fetch('/api/github');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setGithubStats(data);
    } catch (e) {
      setError(prev => ({ ...prev, github: true }));
    } finally {
      setLoading(prev => ({ ...prev, github: false }));
    }
  };

  const fetchLeetcode = async () => {
    setLoading(prev => ({ ...prev, leetcode: true }));
    setError(prev => ({ ...prev, leetcode: false }));
    try {
      const res = await fetch('/api/leetcode');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLeetcodeStats(data);
    } catch (e) {
      setError(prev => ({ ...prev, leetcode: true }));
    } finally {
      setLoading(prev => ({ ...prev, leetcode: false }));
    }
  };

  useEffect(() => {
    fetchGithub();
    fetchLeetcode();
  }, []);

  return (
    <section id="coding" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading 
            title="Coding Profiles" 
            subtitle="Continuous learning and open-source contributions."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* GitHub Profile */}
          <ScrollReveal direction="right">
            <GlowCard className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-slate-800 rounded-lg">
                  <FaGithub className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">GitHub</h3>
              </div>

              {loading.github ? (
                <div className="animate-pulse space-y-4 flex-1">
                  <div className="h-20 bg-slate-800 rounded-xl w-full" />
                  <div className="h-32 bg-slate-800 rounded-xl w-full" />
                </div>
              ) : error.github ? (
                <div className="flex flex-col items-center justify-center flex-1 py-8 text-center">
                  <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
                  <p className="text-slate-400 mb-4">Unable to load GitHub stats</p>
                  <Button variant="outline" size="sm" onClick={fetchGithub}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Retry
                  </Button>
                </div>
              ) : githubStats ? (
                <div className="space-y-6 flex-1">
                  <div className="grid grid-cols-3 gap-4">
                    <StatCard label="Repos" value={githubStats.publicRepos} />
                    <StatCard label="Stars" value={githubStats.stars} />
                    <StatCard label="Contributions" value={githubStats.contributions} />
                  </div>
                  
                  <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto border border-slate-800">
                    <h4 className="text-sm font-semibold text-slate-400 mb-3">Contribution Activity</h4>
                    <div className="flex gap-1 w-max">
                      {githubStats.heatmap?.map((week: any, i: number) => (
                        <div key={i} className="flex flex-col gap-1">
                          {week.map((day: any, j: number) => (
                            <div 
                              key={j} 
                              className={`w-3 h-3 rounded-sm ${day.count === 0 ? 'bg-slate-800' : 'bg-blue-500'}`}
                              style={{ opacity: day.count > 0 ? Math.min(0.3 + (day.count * 0.1), 1) : 1 }}
                              title={`${day.count} contributions on ${day.date}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </GlowCard>
          </ScrollReveal>

          {/* LeetCode Profile */}
          <ScrollReveal direction="left">
            <GlowCard className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-slate-800 rounded-lg">
                  <Code2 className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white">LeetCode</h3>
              </div>

              {loading.leetcode ? (
                <div className="animate-pulse space-y-4 flex-1">
                  <div className="flex gap-6 items-center justify-center py-4">
                    <div className="w-32 h-32 rounded-full bg-slate-800" />
                    <div className="space-y-2">
                      <div className="h-10 w-20 bg-slate-800 rounded-lg" />
                      <div className="h-10 w-20 bg-slate-800 rounded-lg" />
                    </div>
                  </div>
                </div>
              ) : error.leetcode ? (
                <div className="flex flex-col items-center justify-center flex-1 py-8 text-center">
                  <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
                  <p className="text-slate-400 mb-4">Unable to load LeetCode stats</p>
                  <Button variant="outline" size="sm" onClick={fetchLeetcode}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Retry
                  </Button>
                </div>
              ) : leetcodeStats ? (
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 flex-1 py-4">
                  
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" className="stroke-slate-800" strokeWidth="8" fill="none" />
                      <circle 
                        cx="80" cy="80" r="70" 
                        className="stroke-yellow-500 transition-all duration-1000" 
                        strokeWidth="8" fill="none" 
                        strokeDasharray={440} 
                        strokeDashoffset={440 - (440 * (leetcodeStats.totalSolved / Math.max(leetcodeStats.totalSolved, 500)))} 
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-bold text-white">{leetcodeStats.totalSolved}</span>
                      <span className="text-xs text-slate-400 font-medium">Solved</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 w-full md:w-auto">
                    <DifficultyStat label="Easy" value={leetcodeStats.easySolved} color="text-green-400" bg="bg-green-400/20" />
                    <DifficultyStat label="Medium" value={leetcodeStats.mediumSolved} color="text-yellow-400" bg="bg-yellow-400/20" />
                    <DifficultyStat label="Hard" value={leetcodeStats.hardSolved} color="text-red-400" bg="bg-red-400/20" />
                  </div>
                </div>
              ) : null}
            </GlowCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-xs text-slate-400 uppercase tracking-wider">{label}</div>
  </div>
);

const DifficultyStat = ({ label, value, color, bg }: { label: string; value: number; color: string; bg: string }) => (
  <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-3 min-w-[150px]">
    <span className={`text-sm font-medium ${color}`}>{label}</span>
    <span className="text-lg font-bold text-white">{value}</span>
  </div>
);
