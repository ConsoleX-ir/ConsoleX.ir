export type Project = {
  slug: string
  name: string
  descriptor: string
  summary: string
  status: string
  stack: readonly string[]
  sourceUrl?: string
}

export const auraPlayer: Project = {
  slug: '/projects/aura-player',
  name: 'Aura Player',
  descriptor: 'A desktop music player',
  summary: 'A focused place to return to the music you already love.',
  status: 'In development',
  stack: ['TypeScript', 'React', 'Electron'],
}
