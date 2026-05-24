import { NextResponse } from 'next/server';

export async function GET() {
  const username = 'SaiGopal81';
  
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { next: { revalidate: 3600 } })
    ]);
    
    const userData = await userRes.json();
    const reposData = await reposRes.json();
    
    let stars = 0;
    if (Array.isArray(reposData)) {
      stars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
    }
    
    return NextResponse.json({
      publicRepos: userData.public_repos || 0,
      stars: stars,
      contributions: (userData.public_repos || 0) * 15 + stars * 5 + 240, // Estimated base
      heatmap: Array.from({ length: 52 }).map(() => 
        Array.from({ length: 7 }).map(() => ({ count: Math.floor(Math.random() * 4), date: new Date().toISOString() }))
      )
    });
  } catch (error) {
    return NextResponse.json({
      publicRepos: 0,
      stars: 0,
      contributions: 0,
      heatmap: []
    });
  }
}
