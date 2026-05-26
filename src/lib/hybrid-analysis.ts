import Groq from 'groq-sdk';
import { JobAnalysis } from '@/types';

// Centralized Skill Taxonomy
const SKILL_TAXONOMY = [
  'Python', 'SQL', 'PySpark', 'Databricks', 'Snowflake', 'ADF', 'ADLS',
  'Delta Lake', 'AWS', 'S3', 'Airflow', 'Docker', 'Kubernetes', 'Kafka',
  'dbt', 'Azure', 'Spark', 'ETL', 'ELT', 'Data Modeling', 'Data Warehousing',
  'Great Expectations', 'LangGraph', 'LLM', 'Generative AI', 'CI/CD',
  'Git', 'Terraform', 'Machine Learning', 'Data Pipelines', 'GCP', 'BigQuery',
  'PostgreSQL', 'MongoDB', 'Redis', 'React', 'TypeScript', 'Node.js', 'NoSQL',
  'Azure Data Factory', 'Healthcare Analytics', 'Cloud Data Platform', 'Enterprise Data Platform',
  'Apache Spark', 'Data Architecture', 'Data Governance'
];

// Canonical Normalization Map
function normalizeText(text: string): string {
  let normalized = text;
  const replacements: [RegExp, string][] = [
    [/\bpy\s+spark\b/gi, 'PySpark'],
    [/\badls\s+gen\s*2\b/gi, 'ADLS'],
    [/\baws\s+s3\b/gi, 'S3'],
    [/\bk8s\b/gi, 'Kubernetes'],
  ];
  for (const [pattern, replacement] of replacements) {
    normalized = normalized.replace(pattern, replacement);
  }
  return normalized;
}

export async function runHybridAnalysis(resumeText: string, jdText: string): Promise<JobAnalysis> {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  
  // STEP 0: Normalize text before extraction
  const normalizedResume = normalizeText(resumeText);
  const normalizedJD = normalizeText(jdText);

  // STEP 1: Deterministic Skill Extraction
  const rTextLower = normalizedResume.toLowerCase();
  const jdTextLower = normalizedJD.toLowerCase();
  
  const extractedResumeSkills = SKILL_TAXONOMY.filter(skill => rTextLower.includes(skill.toLowerCase()));
  const extractedJDSkills = SKILL_TAXONOMY.filter(skill => jdTextLower.includes(skill.toLowerCase()));

  // STEP 2: Groq Validation Layer
  const prompt = `
    You are an Expert Data Engineering Recruiter AI.
    I have extracted potential skills deterministically from a Resume and a Job Description (JD).
    The text has already been normalized using canonical mappings.
    
    Resume Raw Text: "${normalizedResume.substring(0, 2000)}"
    JD Raw Text: "${normalizedJD.substring(0, 2000)}"
    
    Deterministically Extracted Resume Skills: ${JSON.stringify(extractedResumeSkills)}
    Deterministically Extracted JD Skills: ${JSON.stringify(extractedJDSkills)}
    
    CANONICAL NORMALIZATION RULES (apply BEFORE matching):
    - "Py Spark" or "py spark" = "PySpark" (same skill, MUST be Matched)
    - "ADF" = "Azure Data Factory" (same skill)
    - "ADLS Gen2" or "ADLS" = "ADLS" (same skill)
    - "AWS S3" = "S3" (same skill)
    - "K8s" = "Kubernetes" (same skill)
    - "Apache Spark" = "Spark" (PySpark in resume + Spark in JD = Matched)
    
    After normalization, if both sides resolve to the same canonical skill, mark it as MATCHED, never Partial Match.
    
    CLASSIFICATION RULES:
    - "technical" = Tools, platforms, frameworks, programming languages
    - "domain" = Industry knowledge, architectural concepts, business domains
    
    IMPORTANT SEPARATION & LOGIC RULES:
    1. Domain concepts (Healthcare Analytics, Cloud Data Platform, etc.) must NOT appear in missingSkills or skillGapItems. They go ONLY in domainExposureOpportunities.
    2. skillGapItems must contain ONLY technical skills where the readinessLevel is "Beginner Exposure".
    3. If a skill is missing from the resume, but the candidate has highly transferable experience that makes them "Working Knowledge" or "Interview Ready" (e.g., they know PySpark so they are Interview Ready for Databricks; or they know AWS so Azure is quick to learn), DO NOT put it in missingSkills or skillGapItems. Instead, treat it as functionally matched: put it in matchedSkills, but ALSO put it in missingTechnicalATS so they know to add the keyword.
    4. Be generous with related ecosystem tools. If the candidate has deep data engineering experience (Spark, ETL, Data Lakes), they shouldn't be penalized heavily for missing a specific vendor tool.
    
    READINESS LEVELS:
    - "Beginner Exposure" = Never used, needs foundational learning (TRUE GAP -> skillGapItems)
    - "Working Knowledge" = Has related ecosystem experience, can ramp up quickly (FUNCTIONAL MATCH -> matchedSkills)
    - "Interview Ready" = Minor gap, can discuss confidently with brief study (FUNCTIONAL MATCH -> matchedSkills)
    
    ATS RELEVANCE SCORE:
    Calculate a generous score (0-100) that accounts for transferable and related experience. If the candidate knows PySpark, Delta Lake, and SQL, their relevance for a Databricks/Snowflake role is extremely high (90+), even if those exact words are missing. Score them like a senior tech recruiter who understands engineering concepts, NOT a keyword matcher.
    
    RECRUITER SUMMARY:
    - strengths: array of the candidate's strongest skills that directly match or closely relate to JD requirements
    - topGaps: array of the most critical missing technical skills the candidate should address
    
    ATS KEYWORD SPLIT:
    - missingTechnicalATS: ATS keywords for tools/platforms missing from resume (e.g. "Databricks", "Snowflake")
    - missingDomainATS: ATS keywords for domain/conceptual terms missing from resume (e.g. "Healthcare Analytics", "Cloud Data Platform")

    Your job is to:
    1. Extract ALL technical skills, platforms, domains, and ATS keywords present in the JD.
    2. Validate these against the Resume text after canonical normalization.
    3. Detect aliases using normalization rules.
    4. Identify TRUE partial matches ONLY when there is genuine conceptual overlap but NOT an exact canonical match.
    5. Separate domain concepts from technical skills.
    6. Calculate ATS Relevance Score VERY generously, accounting for transferable engineering experience.
    7. Assign a learningOrder (1 = learn first) to each skillGapItem and domainExposureOpportunity. Order by: Critical priority first, then High, Medium, Low. Within the same priority, order by estimated learning hours (shortest first for quick wins).
    8. Estimate realistic learning hours for each missing skill.
    
    CRITICAL RULES:
    - NEVER hallucinate skills. If a skill does not exist in the JD text, it CANNOT appear anywhere.
    - After canonical normalization, identical skills = Matched.
    - Every skill in requiredSkills MUST have an entry in skillMatchMatrix.
    - Domain concepts must NOT be in missingSkills or skillGapItems.
    
    Return a STRICT JSON object (do not wrap in markdown tags):
    {
      "requiredSkills": ["array of all validated skills from the JD, using canonical names"],
      "matchedSkills": ["skills found in BOTH after normalization"],
      "missingSkills": ["ONLY technical skills from JD missing from resume"],
      "partialMatches": ["genuine conceptual overlaps only"],
      "keywordDistribution": [
        { "keyword": "string", "jdCount": number, "resumeCount": number }
      ],
      "skillGapItems": [
        {
          "skill": "technical skill name only",
          "priority": "Critical | High | Medium | Low",
          "type": "technical",
          "readinessLevel": "Beginner Exposure | Working Knowledge | Interview Ready",
          "estimatedLearningHours": "e.g. 5-8 hours, 10-15 hours, 20+ hours",
          "learningOrder": 1,
          "reason": "Why the JD requires it",
          "learningPath": [
            { "level": "Beginner", "description": "course desc", "resources": [] }
          ]
        }
      ],
      "skillMatchMatrix": [
        {
          "skill": "canonical skill name",
          "resumeEvidence": "excerpt from resume, or 'None'",
          "jdEvidence": "excerpt from JD",
          "status": "Matched | Partial Match | Missing"
        }
      ],
      "atsRelevanceScore": number,
      "domainExposureOpportunities": [
        {
          "skill": "domain concept name",
          "reason": "Why this domain knowledge matters for the role",
          "readinessLevel": "Beginner Exposure | Working Knowledge | Interview Ready",
          "estimatedLearningHours": "e.g. 3-5 hours",
          "learningOrder": 1
        }
      ],
      "missingTechnicalATS": ["technical ATS keywords missing"],
      "missingDomainATS": ["domain ATS keywords missing"],
      "recruiterSummary": {
        "strengths": ["candidate's strongest matching skills"],
        "topGaps": ["most critical technical gaps"]
      }
    }
  `;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "llama-3.1-8b-instant",
    temperature: 0.1,
    response_format: { type: "json_object" }
  });

  const responseText = completion.choices[0]?.message?.content;
  if (!responseText) throw new Error("Failed to parse Groq response");

  let parsed: any;
  try {
    parsed = JSON.parse(responseText);
  } catch (e) {
    throw new Error("Failed to parse JSON from Groq");
  }

  // STEP 3: Coverage Formula Calculation
  const matchedCount = parsed.matchedSkills?.length || 0;
  const partialCount = parsed.partialMatches?.length || 0;
  const totalJDCount = parsed.requiredSkills?.length || 1;

  const coverageRaw = ((matchedCount + (0.5 * partialCount)) / totalJDCount) * 100;
  const coverageRounded = Math.round(coverageRaw * 100) / 100;
  
  const coverageBreakdown = {
    matched: matchedCount,
    partial: partialCount,
    jdSkills: totalJDCount,
    formula: `((${matchedCount} + (0.5 × ${partialCount})) / ${totalJDCount}) × 100`,
    result: coverageRounded
  };

  const categoryBreakdown = [
    { category: 'Data Engineering', matched: matchedCount, total: totalJDCount, percentage: coverageRounded }
  ];

  const analysis: JobAnalysis = {
    ...parsed,
    matchPercentage: Math.round(coverageRaw),
    categoryBreakdown,
    coverageBreakdown,
    atsRelevanceScore: parsed.atsRelevanceScore || 0,
    domainExposureOpportunities: parsed.domainExposureOpportunities || [],
    missingTechnicalATS: parsed.missingTechnicalATS || [],
    missingDomainATS: parsed.missingDomainATS || [],
    recruiterSummary: parsed.recruiterSummary || { strengths: [], topGaps: [] }
  };

  return analysis;
}
