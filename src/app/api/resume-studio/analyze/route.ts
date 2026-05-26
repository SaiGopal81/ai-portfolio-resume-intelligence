import { NextResponse } from 'next/server';
import { runHybridAnalysis } from '@/lib/hybrid-analysis';
import { jobAnalysisRequestSchema } from '@/lib/validations';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = jobAnalysisRequestSchema.parse(body);

    const { resumeData, jd } = validatedData;
    
    if (!process.env.GROQ_API_KEY) {
      console.warn("GROQ_API_KEY is not set. The analysis will fail.");
    }

    const analysis = await runHybridAnalysis(resumeData.rawText, jd);
    
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error in analyze route:", error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
