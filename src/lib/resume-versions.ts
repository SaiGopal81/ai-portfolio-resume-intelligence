import { ResumeVersion } from '@/types';

export function saveVersion(version: ResumeVersion) {
  if (typeof window === 'undefined') return;
  const versions = getVersions();
  versions.push(version);
  localStorage.setItem('resume-versions', JSON.stringify(versions));
}

export function getVersions(): ResumeVersion[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('resume-versions');
  return data ? JSON.parse(data) : [];
}

export function getVersion(id: string): ResumeVersion | undefined {
  return getVersions().find(v => v.id === id);
}

export function restoreVersion(id: string): ResumeVersion | undefined {
  return getVersion(id);
}

export function downloadVersion(id: string, format: 'pdf' | 'docx' | 'latex') {
  // To be implemented in the components triggering the download
  console.log(`Triggering download for version ${id} in ${format}`);
}
