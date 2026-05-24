import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const jobAnalysisRequestSchema = z.object({
  resumeData: z.object({
    name: z.string(),
    role: z.string(),
    summary: z.string(),
    skills: z.array(z.string()),
    experience: z.array(z.string()),
    projects: z.array(z.string()),
    education: z.array(z.string()),
    rawText: z.string(),
  }),
  jd: z.string().min(50, 'Job description must be at least 50 characters'),
});

export const chatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })).optional()
});
