import { LeetCodeStats } from '@/types';

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats | null> {
  if (!username) return null;
  // Simple fallback values as LeetCode requires graphql or external proxy
  return { easy: 0, medium: 0, hard: 0, total: 0 };
}
