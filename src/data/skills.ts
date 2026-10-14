/**
 * Skills — represented honestly.
 * level "primary"  → daily drivers, proven in shipped work
 * level "working"  → real working knowledge, still deepening
 * No fake percentage bars, no logo walls.
 */

export type Skill = { name: string; level: "primary" | "working"; note?: string };
export type SkillGroup = { label: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: [
      { name: "TypeScript", level: "primary" },
      { name: "JavaScript", level: "primary" },
      { name: "Python", level: "working" },
      { name: "Go", level: "working", note: "Wails migration work" },
    ],
  },
  {
    label: "Interface",
    skills: [
      { name: "React", level: "primary" },
      { name: "Next.js", level: "primary", note: "this site runs on it" },
      { name: "HTML & CSS", level: "primary" },
    ],
  },
  {
    label: "Backend & data",
    skills: [
      { name: "Node.js", level: "primary" },
      { name: "Express", level: "working" },
      { name: "MongoDB", level: "working" },
    ],
  },
  {
    label: "Desktop",
    skills: [
      { name: "Electron", level: "primary", note: "ships Aura Player" },
      { name: "Wails", level: "working", note: "active migration" },
    ],
  },
];
