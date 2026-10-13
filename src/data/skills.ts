export type SkillGroup = { category: string; items: readonly string[] }

export const skillGroups: readonly SkillGroup[] = [
  { category: 'Languages', items: ['Python', 'Go', 'TypeScript', 'JavaScript', 'HTML', 'CSS'] },
  { category: 'Frontend', items: ['React', 'Next.js'] },
  { category: 'Backend', items: ['Node.js', 'Express'] },
  { category: 'Database', items: ['MongoDB'] },
  { category: 'Desktop', items: ['Electron', 'Wails'] },
]
