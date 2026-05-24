import { NextResponse } from 'next/server';
import { ResumeData } from '@/types';

export async function POST() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const mockData: ResumeData = {
    name: 'Sai Gopal',
    role: 'AI Data Engineer',
    summary: 'Data engineer with a focus on AI',
    skills: ['PySpark', 'Airflow', 'Python', 'SQL', 'Docker', 'Kubernetes'],
    experience: ['Data Engineering Intern at Sigmoid'],
    projects: [],
    education: [],
    rawText: 'Mock raw text',
  };

  return NextResponse.json(mockData);
}
