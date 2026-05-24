import { NextResponse } from 'next/server';
import { JobAnalysis } from '@/types';
import { jobAnalysisRequestSchema } from '@/lib/validations';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Validate request body
    const validatedData = jobAnalysisRequestSchema.parse(body);

    // Mock analysis delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockAnalysis: JobAnalysis = {
      matchPercentage: 82,
      requiredSkills: ['Python', 'SQL', 'PySpark', 'Airflow', 'Snowflake', 'dbt'],
      matchedSkills: ['Python', 'SQL', 'PySpark', 'Airflow'],
      missingSkills: ['Snowflake', 'dbt'],
      partialMatches: [],
      categoryBreakdown: [
        { category: 'Data Engineering', matched: 4, total: 5, percentage: 80 },
        { category: 'Cloud', matched: 2, total: 4, percentage: 50 },
        { category: 'Databases', matched: 3, total: 3, percentage: 100 }
      ],
      keywordDistribution: [],
      skillGapItems: []
    };

    return NextResponse.json(mockAnalysis);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}
