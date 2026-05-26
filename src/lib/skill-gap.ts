import { JobAnalysis, SkillGapItem } from '@/types';

export function analyzeSkillGap(resumeSkills: string[], jdSkills: string[]): JobAnalysis {
  const matchedSkills = jdSkills.filter(s => resumeSkills.some(rs => rs.toLowerCase().includes(s.toLowerCase())));
  const missingSkills = jdSkills.filter(s => !matchedSkills.includes(s));
  
  const matchPercentage = jdSkills.length > 0 ? Math.round((matchedSkills.length / jdSkills.length) * 100) : 0;
  
  const skillGapItems: SkillGapItem[] = missingSkills.map((skill, i) => ({
    skill,
    priority: 'High' as const,
    type: 'technical' as const,
    readinessLevel: 'Beginner Exposure' as const,
    estimatedLearningHours: '5-10 hours',
    learningOrder: i + 1,
    reason: 'Required in the Job Description',
    learningPath: [
      { level: 'Beginner' as const, description: `Learn basics of ${skill}` },
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
    skillMatchMatrix: jdSkills.map(s => ({
      skill: s,
      resumeEvidence: matchedSkills.includes(s) ? 'Found in resume' : 'None',
      jdEvidence: 'Found in JD',
      status: matchedSkills.includes(s) ? 'Matched' as const : 'Missing' as const
    })),
    coverageBreakdown: {
      matched: matchedSkills.length,
      partial: 0,
      jdSkills: jdSkills.length,
      formula: `((${matchedSkills.length} + (0.5 × 0)) / ${jdSkills.length}) × 100`,
      result: matchPercentage
    },
    atsRelevanceScore: matchPercentage,
    domainExposureOpportunities: [],
    missingTechnicalATS: missingSkills,
    missingDomainATS: [],
    recruiterSummary: {
      strengths: matchedSkills,
      topGaps: missingSkills.slice(0, 5)
    }
  };
}
