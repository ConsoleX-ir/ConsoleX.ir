# ConsoleX redesign notes

## Initial audit

- The app is a React 19 + TypeScript + Vite 8 single-page app with one `App.tsx`, one minified hand-written stylesheet, GSAP/ScrollTrigger, and Lenis. There was no router, component/data split, audio feature, or Tailwind setup.
- The baseline `npm run build` passes. The page had one Aura Player entry plus generic project/roadmap claims, generic GitHub and LinkedIn destinations, and an unverified email address.
- `docs/Screenshot.png` is a 1.28 MB screenshot of the portfolio, not an Aura Player screenshot. It will remain reference material and will not be presented as product UI.
- `song/cornfieldChase.mp3` is the provided 5,085,433-byte MP3, about 127 seconds by MP3 frame scan. It will be loaded only on playback (`preload="none"`) and kept as the sole audio source. No transcoding tool is available; the source stays untouched.
- The local Git origin identifies the project repository as `ConsoleX-ir/ConsoleX.ir`. No verified email or LinkedIn destination is recorded in the source.
- The prior stylesheet fetched Space Grotesk and DM Mono from Google Fonts. Those same font families will be bundled locally to avoid a third-party font request.

## Implementation plan and decisions

1. Migrate the visual system to Tailwind CSS v4 through its official Vite plugin, retaining only global tokens, reset rules, and bespoke motion/artwork CSS.
2. Split the site into a persistent app shell, welcome intro, navigation, audio controls, homepage sections, and an Aura Player project page. Use React Router so `/projects/aura-player` loads directly while shared audio stays mounted between routes.
3. Keep content in typed data modules. Present only the technology stack supplied by the owner and the Aura Player information already present in the site brief; remove unsupported side projects, roadmap items, metrics, and social links.
4. Use an explicitly labeled abstract concept visual for Aura Player because no real product screenshot is present. Add a short, skippable first-visit intro with a reduced-motion fallback and optional, user-started music.
5. Run TypeScript/production build checks and inspect route, responsive, keyboard, reduced-motion, and audio behavior where the available browser tools permit. Do not report visual browser checks unless they were completed.

## Implemented structure

- `src/components/` holds shared navigation, footer, audio controls, intro, artwork, and link/section primitives.
- `src/pages/` holds the home route, Aura Player page, and not-found route; React Router keeps the shared audio provider mounted while changing pages.
- `src/data/` holds the owner-specified technology groups, Aura Player facts, and configured profile/contact destinations.
- Tailwind CSS v4 is the primary layout/type/spacing/color system. The remaining global stylesheet contains theme/reset rules, shared max-width, special orbital and Aura artwork geometry, intro motion, and the tiny music indicator animation.
- Vercel's SPA fallback rewrites deep links to `index.html`; this is necessary for directly loading the client-side Aura Player route.

## Verification

- `npm run build` passed, including `tsc -b` and Vite production bundling. Final output: JavaScript 423.38 kB (140.52 kB gzip), CSS 34.92 kB (8.25 kB gzip); locally bundled font files total about 52 kB. The optional MP3 is emitted as a 5.09 MB asset and is not preloaded.
- A production Vite preview returned `200 text/html` for both `/` and `/projects/aura-player`; `vercel.json` also parses as valid JSON.
- `git diff --check` completed without whitespace errors. No lint or test script is configured in `package.json`.
- The single audio element, no-autoplay behavior, muted preference, rejected-play handling, focus trap, keyboard skip, and reduced-motion paths are implemented in source. Actual playback and keyboard interaction were not browser-tested.
- Desktop/mobile visual review and console inspection remain unverified because the Chrome browser bridge is unavailable in this environment; the local checks above do not replace visual browser testing.
- The npm installation reported zero known vulnerabilities at install time. No deployment, commit, or remote GitHub request was made.

## Risks to resolve or report

- The email address and LinkedIn profile need owner confirmation before being added.
- Direct route fallback is expected from Vite's SPA hosting behavior; confirm the current deployment adapter if the hosting configuration is later added to this workspace.
- The local audio is about 5.1 MB. It is already compressed MP3 and will not be duplicated or transcoded without an available media tool and a demonstrated need.
