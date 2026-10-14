/**
 * CONSOLEX — structured site content.
 *
 * Every fact below is verified against public sources:
 *  - github.com/ConsoleX-ir profile + profile README (fetched 2026-10)
 *  - github.com/ConsoleX-ir/Aura-player README @ main (v3.2.0)
 *  - github.com/ConsoleX-ir/TaskFlow README
 *
 * Projects without repositories (Velo / Nexus / Veil) are represented
 * exactly at their declared status: planned. No features, screenshots,
 * dates or links are invented for them.
 */

export const GITHUB_URL = 'https://github.com/ConsoleX-ir'
export const AURA_REPO_URL = 'https://github.com/ConsoleX-ir/Aura-player'
export const TASKFLOW_REPO_URL = 'https://github.com/ConsoleX-ir/TaskFlow'

export const brand = {
  name: 'ConsoleX',
  person: 'Mohammad Hossain Bahie',
  role: 'Developer · Builder · Problem Solver',
  claim: 'Building my own world.',
  github: GITHUB_URL,
  githubHandle: 'ConsoleX-ir',
  repoCount: 27,
  statement:
    'ConsoleX is my personal software ecosystem where I turn ideas into real projects.',
  layers:
    'Software development across different layers — from frontend and desktop applications to backend systems, architecture, and lower-level technologies.',
  creed: ['Think', 'Design', 'Build', 'Test', 'Break', 'Understand', 'Improve'],
  quote: 'good software isn’t just functional. It should feel good to use.',
  question: 'Can I build this myself?',
} as const

export type ProjectStatus = 'live' | 'shipped' | 'planned'

export interface Project {
  id: string
  index: string
  name: string
  displayName: string
  outlineLine?: string
  type: string
  status: ProjectStatus
  statusLabel: string
  statusMeta?: string
  description: string
  features?: string[]
  stack: string[]
  stackNote?: string
  repoUrl?: string
  license?: string
}

export const projects: Project[] = [
  {
    id: 'aura',
    index: 'P.01',
    name: 'Aura Player',
    displayName: 'AURA',
    outlineLine: 'PLAYER',
    type: 'Desktop music player',
    status: 'live',
    statusLabel: 'LIVE',
    statusMeta: 'v3.2.0 — liquid-glass generation',
    description:
      'A modern, elegant and lightweight desktop music player focused on a polished listening experience — premium glass interface, dynamic colors extracted from album artwork, and a deep audio engine.',
    features: [
      'Audio Studio — 10-band EQ, preamp, limiter & FX chain',
      'Synchronized lyrics via LRCLIB',
      'Find Info Online — Deezer · Apple Music · MusicBrainz',
      'Live Radio & Explore — Radio Browser · Audius',
      'Aura Rewind — monthly listening story',
      'Command palette + 18+ keyboard shortcuts',
      '12 theme identities · liquid-glass play bar',
      'Windows & Linux — AppImage / .deb',
    ],
    stack: ['Electron', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'SQLite'],
    repoUrl: AURA_REPO_URL,
    license: 'MIT',
  },
  {
    id: 'taskflow',
    index: 'P.02',
    name: 'TaskFlow',
    displayName: 'TASK',
    outlineLine: 'FLOW',
    type: 'Task-management dashboard',
    status: 'shipped',
    statusLabel: 'SHIPPED',
    description:
      'A premium task-management dashboard with a physical, liquid-glass interface — SVG metaball filters, spring physics and travelling pill interactions adapted from the open liquid-taffy reference.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'GSAP'],
    repoUrl: TASKFLOW_REPO_URL,
  },
  {
    id: 'velo',
    index: 'P.03',
    name: 'Velo',
    displayName: 'VELO',
    type: 'Download manager',
    status: 'planned',
    statusLabel: 'COMING SOON',
    description:
      'A download manager inspired by applications such as Free Download Manager — built to explore the engineering behind downloads, queues, concurrency, progress tracking and desktop applications.',
    stack: [],
    stackNote: 'STACK — DEFINED AT BUILD TIME',
  },
  {
    id: 'nexus',
    index: 'P.04',
    name: 'Nexus',
    displayName: 'NEXUS',
    type: 'Telegram client',
    status: 'planned',
    statusLabel: 'COMING LATER',
    description:
      'A Telegram client exploring what a modern desktop messaging experience could look like — going beyond simply reproducing an existing client.',
    stack: [],
    stackNote: 'STACK — DEFINED AT BUILD TIME',
  },
  {
    id: 'veil',
    index: 'P.05',
    name: 'Veil',
    displayName: 'VEIL',
    type: 'Social deduction game',
    status: 'planned',
    statusLabel: 'COMING LATER',
    description:
      'A social deduction game built around deception, sabotage, deduction and player interaction.',
    stack: [],
    stackNote: 'STACK — DEFINED AT BUILD TIME',
  },
]

export interface TechCategory {
  title: string
  note?: string
  accent?: boolean
  items: string[]
}

export const techIndex: TechCategory[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'C++'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Vite', 'Next.js'],
  },
  {
    title: 'Desktop',
    items: ['Electron'],
  },
  {
    title: 'Data & State',
    items: ['Zustand', 'SQLite', 'IndexedDB'],
  },
  {
    title: 'Tooling',
    items: ['Git', 'GitHub', 'Linux', 'Windows'],
  },
  {
    title: 'Currently Exploring',
    note: 'active interests',
    accent: true,
    items: [
      'Rust',
      'Tauri',
      'Desktop Architecture',
      'Software Architecture',
      'Performance',
      'Systems & Networking',
      'Machine Learning & AI',
      'Cybersecurity',
    ],
  },
]

export interface NavItem {
  id: string
  label: string
  num: string
}

export const navItems: NavItem[] = [
  { id: 'intro', label: 'Intro', num: '01' },
  { id: 'work', label: 'Work', num: '02' },
  { id: 'stack', label: 'Stack', num: '03' },
  { id: 'contact', label: 'Contact', num: '04' },
]
