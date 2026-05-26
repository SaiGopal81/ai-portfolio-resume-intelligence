// ============================================================
// Portfolio Types
// ============================================================

export interface ProjectAssets {
  banner: string;
  architectureImages: string[];
  screenshots: string[];
  documentationFiles: { name: string; type: string; path: string }[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  problemStatement: string;
  overview: string;
  architecture: string;
  flowDiagram?: string;
  features: string[];
  challenges: string[];
  results: string[];
  whatILearned: string[];
  techStack: string[];
  github: string;
  docs: string;
  liveDemo: string;
  assets: ProjectAssets;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  description: string;
  usedFor: string[];
  relatedProjects: string[];
  icon?: string;
}

export type SkillCategory =
  | 'Data Engineering'
  | 'AI & ML'
  | 'Cloud & Orchestration'
  | 'Databases'
  | 'Programming Languages'
  | 'Web Development'
  | 'Tools & Others';

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  linkedProjects: string[];
}

export interface Achievement {
  title: string;
  institution: string;
  year: string;
  details: string;
  cgpa?: string;
}

export interface JourneyNode {
  title: string;
  description: string;
  icon: string;
  period: string;
}

// ============================================================
// Resume Studio Types
// ============================================================

export interface ResumeData {
  name: string;
  role: string;
  summary: string;
  experience: string[];
  projects: string[];
  skills: string[];
  education: string[];
  rawText: string;
}

export interface ResumeVersion {
  id: string;
  versionNumber: number;
  createdAt: string;
  targetJobRole: string;
  skillMatchPercent: number;
  originalContent: string;
  optimizedContent: string;
  changes: ChangeItem[];
  resumeData: ResumeData;
}

export interface ChangeItem {
  type: 'added' | 'modified' | 'reordered' | 'enhanced';
  description: string;
  section: string;
}

export interface LearningPathLevel {
  level: 'Beginner' | 'Intermediate' | 'Project';
  description: string;
  resources?: string[];
}

export interface SkillGapItem {
  skill: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  type: 'technical' | 'domain';
  readinessLevel: 'Beginner Exposure' | 'Working Knowledge' | 'Interview Ready';
  estimatedLearningHours: string;
  learningOrder: number;
  reason: string;
  learningPath: LearningPathLevel[];
}

export interface JobAnalysis {
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  partialMatches: string[];
  matchPercentage: number;
  categoryBreakdown: { category: string; matched: number; total: number; percentage: number }[];
  keywordDistribution: { keyword: string; jdCount: number; resumeCount: number }[];
  skillGapItems: SkillGapItem[];
  skillMatchMatrix: {
    skill: string;
    resumeEvidence: string;
    jdEvidence: string;
    status: 'Matched' | 'Partial Match' | 'Missing';
  }[];
  coverageBreakdown: {
    matched: number;
    partial: number;
    jdSkills: number;
    formula: string;
    result: number;
  };
  atsRelevanceScore: number;
  domainExposureOpportunities: {
    skill: string;
    reason: string;
    readinessLevel: 'Beginner Exposure' | 'Working Knowledge' | 'Interview Ready';
    estimatedLearningHours: string;
    learningOrder: number;
  }[];
  missingTechnicalATS: string[];
  missingDomainATS: string[];
  recruiterSummary: {
    strengths: string[];
    topGaps: string[];
  };
}

// ============================================================
// AI Chatbot Types
// ============================================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface RAGDocument {
  id: string;
  content: string;
  source: string;
  category: 'project' | 'skill' | 'experience' | 'about' | 'documentation';
  metadata: Record<string, string>;
}

// ============================================================
// Recruiter Types
// ============================================================

export interface RecruiterSnapshot {
  name: string;
  role: string;
  location: string;
  summary: string;
  experience: Experience[];
  topProjects: Project[];
  skills: Skill[];
  education: Achievement[];
  contact: ContactInfo;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

// ============================================================
// API Types
// ============================================================

export interface GitHubStats {
  repos: number;
  stars: number;
  totalContributions: number;
  contributionCalendar: { date: string; count: number }[];
}

export interface LeetCodeStats {
  easy: number;
  medium: number;
  hard: number;
  total: number;
  ranking?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  code?: string;
  status: number;
}
