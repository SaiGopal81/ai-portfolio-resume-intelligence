import { NextResponse } from 'next/server';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import { ResumeData } from '@/types';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let rawText = '';

    // Handle DOCX files
    if (file.name.toLowerCase().endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value;
    } 
    // Handle Text/LaTeX files
    else if (file.name.toLowerCase().endsWith('.tex') || file.name.toLowerCase().endsWith('.txt') || file.type.startsWith('text/')) {
      rawText = buffer.toString('utf8');
    }
    // Handle PDF files
    else {
      // Using pdf-parse v2 API
      const parser = new PDFParse({ data: buffer });
      const parsed = await parser.getText();
      rawText = parsed.text;
      await parser.destroy();
    }

    let parsedData: ResumeData = {
      name: file.name.split('.')[0], 
      role: 'Candidate',
      summary: '',
      skills: [],
      experience: [],
      projects: [],
      education: [],
      rawText: rawText
    };

    if (process.env.GROQ_API_KEY) {
      try {
        const Groq = (await import('groq-sdk')).default;
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: `You are an expert ATS resume parser. Extract the following from the resume text and return ONLY valid JSON:
{
  "name": "Candidate's full name (if found, else file name)",
  "role": "Candidate's current or target job title",
  "summary": "Brief summary",
  "skills": ["skill1", "skill2"], // Up to 35 skills max
  "experience": ["Job 1", "Job 2"], // Array of job titles or company names (one per distinct role/company)
  "projects": ["Project 1"], // Array of distinct projects
  "education": ["Degree 1"] // Array of distinct degrees/universities
}
Respond with ONLY the JSON object, no markdown, no explanation.`
            },
            {
              role: 'user',
              content: rawText.substring(0, 8000) // limit tokens
            }
          ],
          model: 'llama-3.1-8b-instant',
          temperature: 0,
          response_format: { type: 'json_object' }
        });

        const content = completion.choices[0]?.message?.content;
        if (content) {
          const aiData = JSON.parse(content);
          parsedData = {
            ...parsedData,
            name: aiData.name || parsedData.name,
            role: aiData.role || parsedData.role,
            summary: aiData.summary || parsedData.summary,
            skills: Array.isArray(aiData.skills) ? aiData.skills : [],
            experience: Array.isArray(aiData.experience) ? aiData.experience : [],
            projects: Array.isArray(aiData.projects) ? aiData.projects : [],
            education: Array.isArray(aiData.education) ? aiData.education : [],
          };
        }
      } catch (aiErr) {
        console.error("Groq extraction failed, returning fallback data:", aiErr);
      }
    }

    // Fallback if Groq failed or didn't return data
    if (parsedData.skills.length === 0 && parsedData.experience.length === 0) {
      const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
      let currentSection = 'summary';
      const sections: Record<string, string[]> = { skills: [], experience: [], education: [], projects: [], summary: [] };

      for (const line of lines) {
        const lowerLine = line.toLowerCase();
        if (line.length < 50) {
          if (/^(?:technical skills|core competencies|skills|technologies|expertise|it skills)$/i.test(lowerLine)) { currentSection = 'skills'; continue; }
          else if (/^(?:professional experience|work experience|experience|employment history|work history|career|professional background)$/i.test(lowerLine)) { currentSection = 'experience'; continue; }
          else if (/^(?:education|academic background|degrees|academic profile|academics)$/i.test(lowerLine)) { currentSection = 'education'; continue; }
          else if (/^(?:projects|personal projects|portfolio|academic projects|key projects)$/i.test(lowerLine)) { currentSection = 'projects'; continue; }
        }
        if (sections[currentSection]) sections[currentSection].push(line);
      }

      let extractedSkills: string[] = [];
      if (sections.skills.length > 0) {
        extractedSkills = sections.skills.join(' ').split(/[,|•]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 35);
      } else {
        const fallbackSkills = rawText.match(/(Python|Java|SQL|React|Node|AWS|Azure|GCP|Docker|Kubernetes|Spark|Databricks|Snowflake|Hadoop|Kafka|ETL|Machine Learning|Scala|Airflow|Redshift|BigQuery)/gi);
        if (fallbackSkills) extractedSkills = Array.from(new Set(fallbackSkills));
      }

      const experienceCount = sections.experience.filter(l => /^(?:•|-|\*)/.test(l) || /(?:20\d{2}|19\d{2})/.test(l)).length || (sections.experience.length > 0 ? 1 : 0);
      const projectsCount = sections.projects.filter(l => /^(?:•|-|\*)/.test(l) || /(?:20\d{2})/.test(l)).length || (sections.projects.length > 0 ? 1 : 0);
      const educationCount = sections.education.filter(l => /(?:university|college|institute|bachelor|master|phd|b\.s|m\.s|degree|20\d{2})/i.test(l)).length || (sections.education.length > 0 ? 1 : 0);

      parsedData = {
        ...parsedData,
        summary: sections.summary.join(' '),
        skills: Array.from(new Set(extractedSkills)).slice(0, 35),
        experience: new Array(experienceCount).fill('Experience'),
        projects: new Array(projectsCount).fill('Project'),
        education: new Array(educationCount).fill('Education'),
      };
    }

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error('File parsing error:', error);
    return NextResponse.json({ 
      error: 'Failed to parse file', 
      details: error?.message || error?.toString() || 'Unknown error' 
    }, { status: 500 });
  }
}
