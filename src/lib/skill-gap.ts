import { JobAnalysis, SkillGapItem } from '@/types';

export function analyzeSkillGap(resumeSkills: string[], jdSkills: string[]): JobAnalysis {
  const matchedSkills = jdSkills.filter(s => resumeSkills.some(rs => rs.toLowerCase().includes(s.toLowerCase())));
  const missingSkills = jdSkills.filter(s => !matchedSkills.includes(s));
  
  const matchPercentage = jdSkills.length > 0 ? Math.round((matchedSkills.length / jdSkills.length) * 100) : 0;
  
  const skillGapItems: SkillGapItem[] = missingSkills.map(skill => ({
    skill,
    priority: 'High',
    estimatedLearningTime: '1 Week',
    reason: 'Frequently requested in Job Descriptions',
    learningPath: [
      { level: 'Beginner', description: `Learn basics of ${skill}` },
      { level: 'Intermediate', description: `Understand advanced concepts of ${skill}` },
      { level: 'Project', description: `Build a project using ${skill}` }
    ]
  }));

  return {
    requiredSkills: jdSkills,
    matchedSkills,
    missingSkills,
    partialMatches: [],
    matchPercentage,
    categoryBreakdown: [{ category: 'General', matched: matchedSkills.length, total: jdSkills.length, percentage: matchPercentage }],
    keywordDistribution: jdSkills.map(s => ({ keyword: s, jdCount: 1, resumeCount: matchedSkills.includes(s) ? 1 : 0 })),
    skillGapItems,
  };
}
