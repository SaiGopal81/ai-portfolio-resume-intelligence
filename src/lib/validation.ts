import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z.string().min(1, 'Message is required').max(2000, 'Message is too long'),
});

export const chatbotSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(500, 'Message is too long'),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).max(20, 'History is too long'),
});

export const jobDescriptionSchema = z.object({
  jd: z.string().min(10, 'Job description is too short').max(10000, 'Job description is too long'),
});

export function sanitizeInput(text: string): string {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '') // strip HTML tags
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim();
}

export function validateFileUpload(file: File): { isValid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/x-tex',
    'application/x-tex'
  ];

  if (!file) return { isValid: false, error: 'No file provided' };
  if (file.size > maxSize) return { isValid: false, error: 'File exceeds 5MB limit' };
  if (!allowedTypes.includes(file.type) && !file.name.endsWith('.tex')) {
    return { isValid: false, error: 'Invalid file type. Only PDF, DOCX, and LaTeX are allowed.' };
  }

  return { isValid: true };
}
