import { brand } from '../../data/site'
import { useReveal } from '../../lib/useReveal'
import { SectionLabel } from '../ui/SectionLabel'

/**
 * IntroSection — the editorial statement. Verified quote as display type,
 * the method chain as a numbered index, and the operator fact sheet.
 */
export function IntroSection() {
  const gridRef = useReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.12 })

  return (
    <section id="intro" aria-labelledby="intro-title" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-page px-gutter pt-24 md:px-10 md:pt-36">
        <SectionLabel num="01" label="Introduction" annotation="Personal software ecosystem" />

        <div ref={gridRef} className="mt-12 grid grid-cols-1 gap-14 md:mt-16 md:grid-cols-12 md:gap-10">
          <div data-reveal className="md:col-span-7">
            <h2
              id="intro-title"
              className="text-statement font-medium tracking-tight text-ink"
            >
              <span className="text-dim">“</span>good software isn’t just functional.{' '}
              <span className="text-red">It should feel good to use.</span>
              <span className="text-dim">”</span>
            </h2>
            <p className="mt-9 max-w-xl text-lg leading-relaxed text-dim">
              Software development across different layers — from frontend and desktop applications
              to backend systems, architecture, and lower-level technologies. <span className="text-ink">ConsoleX</span>{' '}
              is where those interests become real, working projects.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-dim">
              Every entry in the index below started the same way: with a question, and an
              unwillingness to stop at “someone else built that.”
            </p>
          </div>

          <div data-reveal className="md:col-span-5 lg:col-span-4 lg:col-start-9">
            <h3 className="mono-label">Method — on loop</h3>
            <ol className="mt-4 border-b border-line-soft">
              {brand.creed.map((step, i) => (
                <li
                  key={step}
                  className="flex items-baseline gap-4 border-t border-line-soft py-3.5"
                >
                  <span className="font-mono text-micro text-red">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-2xl font-semibold uppercase tracking-tight text-ink">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <dl className="mt-10 space-y-0 border-y border-line py-1">
              {[
                ['Operator', brand.person],
                ['Handle', `github.com/${brand.githubHandle}`],
                ['Focus', 'Desktop · Web · Systems'],
                ['Mode', 'Independent'],
              ].map(([term, value]) => (
                <div key={term} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="mono-label">{term}</dt>
                  <dd className="text-right font-mono text-label uppercase text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
