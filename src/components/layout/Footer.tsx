import { site } from "@/data/site";

/**
 * Footer — sticky to the viewport bottom via the app shell's flex column.
 * Only verified external links are rendered (see src/data/site.ts).
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-cx-border bg-white">
      <div className="container-cx">
        <div className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between md:py-16">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="block h-5 w-5 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 32% 28%, #bae6fd 0%, #38bdf8 48%, #2563eb 100%)",
                }}
              />
              <span className="font-display text-base font-semibold tracking-tight">
                {site.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cx-text-2">
              An independent software brand. Every project here is a real work
              in progress, honestly labeled.
            </p>
          </div>

          <nav aria-label="Footer" className="flex gap-16">
            <div>
              <p className="eyebrow mb-4">Site</p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    className="text-cx-text-2 transition-colors hover:text-cx-accent"
                    href="#work"
                  >
                    Selected work
                  </a>
                </li>
                <li>
                  <a
                    className="text-cx-text-2 transition-colors hover:text-cx-accent"
                    href="#about"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    className="text-cx-text-2 transition-colors hover:text-cx-accent"
                    href="#lab"
                  >
                    Lab
                  </a>
                </li>
                <li>
                  <a
                    className="text-cx-text-2 transition-colors hover:text-cx-accent"
                    href="#contact"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4">Projects</p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    className="text-cx-text-2 transition-colors hover:text-cx-accent"
                    href="#/projects/aura-player"
                  >
                    Aura Player
                  </a>
                </li>
                <li>
                  <a
                    className="text-cx-text-2 transition-colors hover:text-cx-accent"
                    href="#work"
                  >
                    Velo
                  </a>
                </li>
                <li>
                  <a
                    className="text-cx-text-2 transition-colors hover:text-cx-accent"
                    href="#work"
                  >
                    Nexus
                  </a>
                </li>
                <li>
                  <a
                    className="text-cx-text-2 transition-colors hover:text-cx-accent"
                    href="#work"
                  >
                    Veil
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-cx-ink-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cx-text-3">
            © {year} {site.name}. Independent works in progress.
          </p>
          <p className="font-mono2 text-[11px] tracking-wide text-cx-text-3">
            Built with Next.js · TypeScript · a custom WebGL gel
          </p>
        </div>
      </div>
    </footer>
  );
}
