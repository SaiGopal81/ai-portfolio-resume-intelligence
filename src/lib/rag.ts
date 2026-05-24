import { RAGDocument } from '@/types';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import { experiences } from '@/data/experience';

export function buildRAGIndex(): RAGDocument[] {
  const docs: RAGDocument[] = [];
  
  projects.forEach(p => {
    docs.push({
      id: `proj-${p.slug}`,
      content: `${p.title}: ${p.description}. Tech: ${p.techStack.join(', ')}`,
      source: p.title,
      category: 'project',
      metadata: { slug: p.slug }
    });
  });

  skills.forEach(s => {
    docs.push({
      id: `skill-${s.name.toLowerCase()}`,
      content: `${s.name} (${s.category}): ${s.description}`,
      source: s.name,
      category: 'skill',
      metadata: { category: s.category }
    });
  });
  
  experiences.forEach((e, i) => {
    docs.push({
      id: `exp-${i}`,
      content: `${e.role} at ${e.company}. ${e.description} Skills used: ${e.technologies.join(', ')}`,
      source: e.company,
      category: 'experience',
      metadata: { role: e.role }
    });
  });

  return docs;
}

export function retrieveRelevant(query: string, topK: number = 5): RAGDocument[] {
  const docs = buildRAGIndex();
  const q = query.toLowerCase();
  
  const scored = docs.map(d => {
    let score = 0;
    if (d.content.toLowerCase().includes(q)) score += 10;
    const words = q.split(' ');
    words.forEach(w => {
      if (w.length > 3 && d.content.toLowerCase().includes(w)) score += 2;
    });
    return { doc: d, score };
  });

  return scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score).slice(0, topK).map(s => s.doc);
}

export function formatRAGContext(docs: RAGDocument[]): string {
  if (docs.length === 0) return 'No relevant portfolio context found.';
  return docs.map((d, i) => `[${i+1}] ${d.category.toUpperCase()} - ${d.source}:\n${d.content}`).join('\n\n');
}
