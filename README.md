# ConsoleX Portfolio

Personal portfolio website built with Next.js 16, TypeScript, Tailwind CSS 4,
shadcn/ui, and a custom raw-WebGL liquid-glass hero. No 3D libraries used.

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui components
- Prisma ORM (SQLite) — scaffolding included, not required to view the site
- Raw WebGL shader for the signature gel/liquid-glass element
- Hash-routed Aura Player detail view (`#/projects/aura-player`)

## Getting Started

Requires Node.js 20+ (or Bun 1.2+).

```bash
# install dependencies
bun install          # or: npm install

# initialize the (optional) SQLite database
bun db:push          # or: npm run db:push

# start the dev server on http://localhost:3000
bun dev              # or: npm run dev
```

## Scripts

| Command        | Description                        |
| -------------- | ---------------------------------- |
| `dev`          | Start dev server on port 3000      |
| `build`        | Production build (standalone)      |
| `start`        | Run the production build           |
| `lint`         | Run ESLint                         |
| `db:push`      | Push Prisma schema to SQLite       |
| `db:generate`  | Generate Prisma client             |

## Project Structure

```
src/
  app/            # App Router entry (layout, page, 404, favicon, SEO)
  components/
    opening/      # Art-directed intro sequence (skippable, session-gated)
    sections/     # Hero, About, Skills, Work, Lab, Roadmap, Contact
    aura/         # Aura Player detail view (hash-routed)
    lab/          # Live experiments (GelToy, Interference, KineticType)
    layout/       # Header, Footer, SectionHead
    motion/       # Reveal (IntersectionObserver-based)
    visuals/      # LiquidGlass (raw WebGL shader)
    ui/           # shadcn/ui primitives
  data/           # Site content: projects, skills, roadmap, aura, links
  hooks/          # Reusable hooks (hash route, in-view, reduced motion, ...)
  lib/            # Utils, Prisma client
public/           # Static assets (logo, robots.txt)
prisma/           # Database schema
```

## Content Configuration

All site content lives in `src/data/`:
- `site.ts`    — name, tagline, social links (external URLs intentionally
                 left empty with TODOs; UI renders channels only when filled)
- `projects.ts` — showcased projects & statuses
- `skills.ts`   — skills with honesty levels (primary vs working knowledge)
- `roadmap.ts`  — Now / Next / Later plan
- `aura.ts`     — Aura Player verified feature list

## Notes

- The intro animation plays once per browser session by design and is
  automatically skipped for users preferring reduced motion.
- The Aura detail view uses hash routing (`#/projects/aura-player`) so it
  works on any static/dev host; components are ready to move to a real route.
- `Caddyfile` is included for reference deployment behind a Caddy reverse proxy.
