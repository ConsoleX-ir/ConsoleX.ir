/**
 * Site-wide configuration — the single place to edit brand copy and links.
 *
 * ⚠️ EXTERNAL LINKS POLICY (per project brief):
 * Only real, verified destinations may be published. The fields below are
 * intentionally EMPTY until verified URLs are supplied. The UI renders
 * these destinations ONLY when non-empty — never "#", never a guess.
 *
 * TODO(owner): fill these in before launch, e.g.
 *   github: "https://github.com/<your-handle>"
 *   email:  "mailto:<you@example.com>"
 */
export const site = {
  name: "ConsoleX",
  tagline: "Independent software, built with curiosity",
  description:
    "ConsoleX is an independent software brand building desktop applications and interactive experiments — from Aura Player, a desktop music player, to 3D and multiplayer concepts.",
  links: {
    github: "" as string,
    email: "" as string,
  },
};

export type NavLink = { label: string; href: string };

export const homeNav: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Lab", href: "#lab" },
  { label: "Contact", href: "#contact" },
];
