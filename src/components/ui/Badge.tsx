import React from 'react';
import { cn } from '@/lib/utils';
import { SkillCategory } from '@/types';

interface BadgeProps {
  children: React.ReactNode;
  category?: SkillCategory | string;
  className?: string;
}

export const Badge = React.memo(({ children, category, className }: BadgeProps) => {
  const categoryColors: Record<string, string> = {
    'Data Engineering': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'AI & ML': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Cloud & Orchestration': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'Databases': 'bg-green-500/10 text-green-400 border-green-500/20',
    'Programming Languages': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  };

  const defaultColor = 'bg-slate-800 text-slate-300 border-slate-700';
  const colorClass = category && categoryColors[category] ? categoryColors[category] : defaultColor;

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', colorClass, className)}>
      {children}
    </span>
  );
});
Badge.displayName = 'Badge';
