import { GITHUB_URL, AURA_REPO_URL, TASKFLOW_REPO_URL, brand, navItems } from '../../data/site'
import { scrollToTarget } from '../../lib/useSmoothScroll'
import { Wordmark } from '../ui/Wordmark'
import { ArrowUp } from 'lucide-react'

/** SiteFooter — the final composition: wordmark, sitemap, directory, colophon. */
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-line md:mt-36">
      <div className="mx-auto w-full max-w-page px-gutter py-12 md:px-10 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mono-label mt-4">{brand.claim}</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-dim">
              {brand.role}. Independent software, built in the open — from desktop applications to
              the systems underneath them.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="mono-label">Index</h2>
            <ul className="mt-4">
              {navItems.map((item) => (
                <li key={item.id} className="border-t border-line-soft">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToTarget(`#${item.id}`)
                    }}
                    className="group flex items-baseline gap-3 py-2.5 font-mono text-label uppercase text-dim transition-colors hover:text-red"
                  >
                    <span aria-hidden="true" className="text-[9px] text-faint group-hover:text-red">
                      {item.num}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="mono-label">Repositories</h2>
            <ul className="mt-4">
              {[
                ['GitHub profile', GITHUB_URL],
                ['Aura Player', AURA_REPO_URL],
                ['TaskFlow', TASKFLOW_REPO_URL],
              ].map(([label, href]) => (
                <li key={href} className="border-t border-line-soft">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-3 py-2.5 font-mono text-label uppercase text-dim transition-colors hover:text-ink"
                  >
                    {label}
                    <span aria-hidden="true" className="text-faint transition-colors group-hover:text-red">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-soft pt-6 md:flex-row md:items-center md:justify-between">
          <p className="mono-label">
            © {year} {brand.name} — {brand.person}
          </p>
          <p className="mono-label">React · TypeScript · Vite · Tailwind CSS</p>
          <button
            type="button"
            onClick={() => scrollToTarget(0)}
            className="mono-label inline-flex items-center gap-2 transition-colors hover:text-red"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </footer>
  )
}
