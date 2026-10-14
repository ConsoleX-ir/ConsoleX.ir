# ConsoleX — Portfolio

The official ConsoleX portfolio: a single-page, brutalist/Swiss-inspired editorial site built from scratch with React 19, TypeScript, Vite 8 and Tailwind CSS 4.

> ConsoleX is the personal software ecosystem of Mohammad Hossain Bahie —
> *"Building my own world."*

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React 19.3 + TypeScript 5.9 (strict)** | Component architecture, typed content model |
| Build | **Vite 8.3** | Current stable; `@vitejs/plugin-react@6` targets Vite 8 |
| Styling | **Tailwind CSS 4.3** (`@tailwindcss/vite`) | CSS-first `@theme` tokens, zero config files |
| Scroll | **Lenis 1.3** | Smooth wheel scrolling, wired into GSAP's ticker |
| Animation | **GSAP 3.15 + ScrollTrigger** | Entrance timelines, scroll reveals, parallax, springs (`elastic.out`) |
| Icons | **lucide-react** | One consistent, lightweight set |
| Fonts | **@fontsource** Space Grotesk Variable + DM Mono | Self-hosted, no CDN dependency |

**Deliberately excluded:** framer-motion/Motion (GSAP already covers entrance + interaction; two engines would overlap), shadcn/ui & Radix (no complex primitives needed — the site is semantic HTML + CSS + a few hooks), three.js/WebGL (all liquid effects are achieved with SVG filters — cheaper, crisper, on-brand).

## Design system

Tokens live in `src/styles/global.css` under `@theme`:

- **Palette** — `bg #080808`, `surface #111111`, `elevated #181818`, `ink #F5F5F5`, `dim #A3A3A3`, `red #E63228`, `line #303030`
- **Type scale** — fluid `display / title / project / statement` sizes, `micro` mono labels (Space Grotesk = display + body, DM Mono = technical metadata)
- **Motion** — `swift / snap / spring` easings; marquee, blink, orb keyframes
- **Layout** — `gutter`, `page` (1600px) container tokens

Red is used as a signal: indices, the X, rules, LIVE states, the gel button. Everything else is monochrome + hairlines.

## Liquid / gel effects (3, deliberately small)

1. **`LiquidButton`** — gel CTA: a bead of red material stretches toward the pointer inside an SVG gooey alpha filter (`feGaussianBlur` → `feColorMatrix`), magnetic pull via GSAP, elastic snap-back, focus pulse. Technique adapted from the MIT `arknow91/liquid-taffy` reference. Falls back to a crisp flat pill where CSS-referenced filters are unreliable (Safari).
2. **`LiquidLens`** — glass panel in the hero: Chromium gets true backdrop refraction (`backdrop-filter: url(#cx-lens-displace)` with a canvas-generated radial displacement map); Safari/Firefox get the same geometry as frosted glass; `prefers-reduced-transparency` collapses it to a solid.
3. **`CustomCursor`** — surveyor reticle (red square dot + lagging ring + crosshair that rotates 45° over interactive targets). Fine-pointer + no-reduced-motion only; replaces the native cursor only in that mode.

Everything else (background lines, grain, marquee, equalizer) is static or transform-only CSS/GSAP — no per-frame effects loops.

## Architecture

```
src/
  data/site.ts              # single source of verified content (projects, tech, nav)
  lib/
    gsap.ts                 # plugin registration + motion queries
    useSmoothScroll.ts      # Lenis ↔ ScrollTrigger ↔ anchor nav
    useReveal.ts            # scroll-triggered entrance (context-cleaned)
    useMagnetic.ts          # magnetic pointer pull hook
    usePrefersReducedMotion.ts
    utils.ts                # cn(), backdrop-filter support probe
  components/
    ui/                     # Wordmark, SectionLabel, StatusTag, ArrowLink,
                            # LiquidButton, GhostButton, CornerTicks, SplitLine
    fx/                     # GooFilters, GeometricBackground, LiquidLens,
                            # GrainOverlay, Marquee, CustomCursor
    site/                   # SiteHeader, HeroSection, IntroSection,
                            # ProjectShowcase (+ Flagship/Panel/Row entries),
                            # EqualizerVisual, TechnologyIndex,
                            # ContactSection, SiteFooter
```

## Content integrity

All copy is verified against public sources (github.com/ConsoleX-ir profile & READMEs, Aura Player v3.2.0 README, TaskFlow README). The old website (consolex-snowy.vercel.app) is offline and was used for nothing. Project statuses are represented exactly: **Aura Player — live (v3.2.0)**, **TaskFlow — shipped**, **Velo / Nexus / Veil — planned**. No contact details are invented: GitHub is the only published channel. No official ConsoleX logo asset exists publicly, so the brand renders as a typographic wordmark; `public/favicon.svg` is a provisional neutral mark.

## Commands

```bash
npm ci             # install exactly the locked versions (recommended)
npm run dev        # http://localhost:3000
npm run build      # tsc -b && vite build → dist/
npm run preview    # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc -b --noEmit
```

`package-lock.json` pins every dependency (resolved URL + integrity hash) to `registry.npmjs.org`, so `npm ci` is deterministic on any machine and never re-resolves through a configured mirror. If `registry.npmjs.org` is slow in your region you can install through a mirror instead — but after any failed download, always clean the cache before retrying (`npm cache clean --force`).

## Troubleshooting npm install (Windows)

Two errors show up regularly on Windows, and both are environment issues, not code issues:

| Error | Meaning | Cause |
|---|---|---|
| `EPERM: operation not permitted, rmdir` | npm could not delete old files inside `node_modules` | Another program holds the files open — VS Code, a running `npm run dev`, or antivirus real-time scanning |
| `ENOENT ... _cacache\content-v2\...` + `Invalid response body while trying to fetch ...` | npm's local cache is corrupted, or a registry/mirror returned an incomplete package | Interrupted installs, antivirus quarantining cache files mid-write, or a mirror serving stale/incomplete tarballs |

### Quick fix

1. Close VS Code and any terminal running the dev server.
2. Double-click **`fix-install.bat`** (included at the project root; run as administrator if EPERM errors persist). It stops Node processes, clears the npm cache, removes `node_modules` and the stale lockfile, restores the clean `package-lock.clean.json`, and lets you pick the download source (npmjs via `npm ci`, or the Liara mirror via `npm install`).
3. Manual equivalent, run in the project folder:

```bat
taskkill /f /im node.exe
npm cache clean --force
rd /s /q node_modules
del package-lock.json
copy package-lock.clean.json package-lock.json
npm ci --no-audit --no-fund
```

### Preventing it

- Add Windows Defender exclusions for the project folder **and** `%LocalAppData%\npm-cache`.
- Enable long paths (deep `node_modules` paths exceed the old 260-char limit):

```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

- After **any** failed download, run `npm cache clean --force` before retrying.
- Prefer `npm ci` over `npm install` — it installs exactly the locked versions and never re-resolves through a mirror.

### Zero-install preview

The repository ships with a prebuilt `dist/` (Vite `base: './'`, so all asset paths are relative). Open `dist/index.html` directly in a browser, or serve it with any static server (`npx serve dist`) — no Node.js required.

## Accessibility & performance

Semantic landmarks, single H1, labelled sections, skip link, `inert` mobile overlay with focus trap + Escape, visible focus states (2px red outline), aria-labelled decorative layers, `prefers-reduced-motion` disables Lenis/parallax/marquee/entrance animations globally, images: none (no fake screenshots), fonts subset + self-hosted, JS effects gated behind pointer/motion queries.
