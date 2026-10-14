/**
 * Aura Player detail view content.
 * Only features supported by verified information are listed.
 * The Wails migration is NOT claimed as complete anywhere.
 */

export const aura = {
  id: "aura-player",
  name: "Aura Player",
  category: "Desktop music player",
  statusLabel: "In development · v3.2.0 baseline",
  tagline: "A desktop music player for the library you actually own.",
  meta: [
    { label: "Type", value: "Desktop application" },
    { label: "Baseline", value: "v3.2.0" },
    { label: "Stack today", value: "Electron · React · TypeScript" },
    { label: "Migration", value: "Electron → Wails (Go), in progress" },
  ],
  overview: [
    "Aura Player is ConsoleX's longest-running project: a desktop music player built around a simple conviction — the music you keep on your own machine deserves a proper home. It plays your local library, keeps it organized, and makes it pleasant to sit down and listen.",
    "The app has shipped real functionality across several versions: local music playback, a library with playlists, audio effects, and online music discovery for finding something new without leaving the player. The current published baseline is version 3.2.0.",
    "Right now the project is in the middle of its most interesting engineering chapter: migrating the desktop shell from Electron to Wails with a Go backend. It is an active, ongoing effort — the goal is a lighter, faster player, and the migration is not finished yet.",
  ],
  features: [
    {
      title: "Local music playback",
      body: "The core of Aura — reliable playback of the files in your own library, with no accounts attached to listening.",
    },
    {
      title: "Library & playlists",
      body: "Organize tracks, build and maintain playlists, and keep a personal collection tidy over time.",
    },
    {
      title: "Audio effects",
      body: "Sound shaping built on the Web Audio API — listening can be tuned, not just played.",
    },
    {
      title: "Online music discovery",
      body: "A bridge beyond the local library: discover music online from inside the player.",
    },
  ],
  underTheHood: [
    "The shipped baseline is an Electron application with a React and TypeScript interface, using the Web Audio API for its effects pipeline. That combination is what powers Aura as it exists today.",
    "The Wails migration moves the desktop shell to Go — trading Chromium's weight for a native webview while keeping the same front-end stack. The migration is an active development effort: parts of the shell are being rebuilt and validated against the existing feature set. It is not complete, and no release date is promised.",
  ],
  stackToday: ["Electron", "React", "TypeScript", "Web Audio API"],
  stackMigration: ["Wails", "Go"],
  linksNote:
    "Repository and download links will be published here once the public URLs are verified.",
  illustrationCaption: "Original illustration — not a product screenshot.",
} as const;
