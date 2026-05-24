'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, Legend } from 'recharts';
import { JobAnalysis } from '@/types';

interface ResumeChartsProps {
  type: 'donut' | 'radar';
  data: JobAnalysis;
}

export const ResumeCharts = ({ type, data }: ResumeChartsProps) => {
  if (type === 'donut') {
    const pieData = [
      { name: 'Matched', value: data.matchedSkills.length, color: '#22c55e' },
      { name: 'Missing', value: data.missingSkills.length, color: '#ef4444' }
    ];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(255,255,255,0.1)" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '0.5rem' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#94a3b8' }} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'radar') {
    const radarData = [
      { subject: 'Data Eng', A: 90, B: 100, fullMark: 100 },
      { subject: 'Cloud', A: 85, B: 90, fullMark: 100 },
      { subject: 'AI/ML', A: 70, B: 60, fullMark: 100 },
      { subject: 'Databases', A: 95, B: 100, fullMark: 100 },
      { subject: 'Programming', A: 100, B: 100, fullMark: 100 },
    ];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <Radar name="Resume" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
          <Radar name="Job Req" dataKey="B" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '0.5rem' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Legend wrapperStyle={{ color: '#94a3b8' }} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }

  return null;
};
