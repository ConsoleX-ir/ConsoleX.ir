/**
 * The four known ConsoleX projects — the source of truth for the portfolio.
 * TaskFlow is explicitly NOT a ConsoleX project and must never appear here.
 *
 * Status vocabulary (kept honest on purpose):
 *  - "in-development" → actively being built (may have a shipped baseline)
 *  - "planned"        → a concept; nothing is claimed as finished
 */

export type ProjectStatus = "in-development" | "planned";

export type Project = {
  id: string;
  index: string; // display ordinal, e.g. "01"
  name: string;
  category: string;
  status: ProjectStatus;
  statusLabel: string;
  description: string;
  stack: string[];
  hasDetailPage: boolean;
  art: "aura" | "velo" | "nexus" | "veil";
};

export const projects: Project[] = [
  {
    id: "aura-player",
    index: "01",
    name: "Aura Player",
    category: "Desktop music player",
    status: "in-development",
    statusLabel: "In development · v3.2.0 baseline",
    description:
      "A desktop music player for local libraries — playback, playlists, audio effects and online music discovery. Currently being rebuilt on a Go + Wails foundation.",
    stack: ["Electron", "React", "TypeScript", "Wails", "Go"],
    hasDetailPage: true,
    art: "aura",
  },
  {
    id: "velo",
    index: "02",
    name: "Velo",
    category: "Download manager",
    status: "in-development",
    statusLabel: "In development · early builds",
    description:
      "A desktop download manager in the spirit of classic tools like Free Download Manager — built with Electron, and built together with a friend.",
    stack: ["Electron", "TypeScript"],
    hasDetailPage: false,
    art: "velo",
  },
  {
    id: "nexus",
    index: "03",
    name: "Nexus",
    category: "Telegram client",
    status: "planned",
    statusLabel: "Planned · concept stage",
    description:
      "A future ConsoleX take on a Telegram client. Early concept — the ideas are being sketched, nothing is promised yet.",
    stack: [],
    hasDetailPage: false,
    art: "nexus",
  },
  {
    id: "veil",
    index: "04",
    name: "Veil",
    category: "Multiplayer 3D game",
    status: "planned",
    statusLabel: "Planned · concept stage",
    description:
      "A social-deduction 3D experience for groups of 4–12 players in sessions of roughly 15 minutes, aiming to run without paid infrastructure. Three.js is the intended direction.",
    stack: ["Three.js (intended)"],
    hasDetailPage: false,
    art: "veil",
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
