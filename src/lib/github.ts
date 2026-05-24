import { GitHubStats } from '@/types';

export async function fetchGitHubStats(username: string): Promise<GitHubStats | null> {
  if (!username) return null;
  
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: process.env.GITHUB_TOKEN ? {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      } : {},
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return {
      repos: data.public_repos,
      stars: 0, // Note: would need GraphQL or multiple API calls for accurate stars
      totalContributions: 0, // Requires GraphQL API
      contributionCalendar: [], // Requires GraphQL API
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}
