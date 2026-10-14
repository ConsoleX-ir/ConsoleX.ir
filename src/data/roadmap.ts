/**
 * Roadmap — deliberately free of dates and promises.
 * Everything here is labeled with its real stage.
 */

export type RoadmapItem = {
  title: string;
  note: string;
  state: "in-progress" | "concept";
};

export type RoadmapColumn = {
  when: string;
  hint: string;
  items: RoadmapItem[];
};

export const roadmap: RoadmapColumn[] = [
  {
    when: "Now",
    hint: "actively on the desk",
    items: [
      {
        title: "Aura Player — Wails migration",
        note: "Rebuilding the desktop foundation on Go + Wails. In active development, not shipped yet.",
        state: "in-progress",
      },
      {
        title: "Velo — early builds",
        note: "Download manager groundwork with Electron, together with a friend.",
        state: "in-progress",
      },
    ],
  },
  {
    when: "Next",
    hint: "shaping up",
    items: [
      {
        title: "Nexus — Telegram client",
        note: "Concept sketches for a ConsoleX take on a Telegram client.",
        state: "concept",
      },
    ],
  },
  {
    when: "Later",
    hint: "on the horizon",
    items: [
      {
        title: "Veil — 3D social deduction",
        note: "A multiplayer experiment for 4–12 players, Three.js direction, no paid infrastructure.",
        state: "concept",
      },
    ],
  },
];

export const roadmapFootnote =
  "No dates here on purpose. Plans move when the software does.";
