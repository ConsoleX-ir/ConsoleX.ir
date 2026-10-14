import { techIndex } from '../../data/site'
import { useReveal } from '../../lib/useReveal'
import { cn } from '../../lib/utils'
import { SectionLabel } from '../ui/SectionLabel'

/**
 * TechnologyIndex — a hairline-grid typographic index of the verified
 * stack, split by discipline. No logo wall; hover marks the row.
 */
export function TechnologyIndex() {
  const ref = useReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.07, y: 24 })

  return (
    <section id="stack" aria-labelledby="stack-title" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-page px-gutter pt-24 md:px-10 md:pt-36">
        <SectionLabel num="03" label="Technology index" annotation="As declared in public repositories" />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8 md:mt-14">
          <h2
            id="stack-title"
            className="text-title font-semibold uppercase leading-[0.9] tracking-tight text-ink"
          >
            Tools of
            <br />
            the trade<span className="text-red">.</span>
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-dim">
            The languages, frameworks and systems that appear across the public repositories — plus
            what is being explored next.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-12 grid grid-cols-1 gap-px border border-line-soft bg-line-soft md:mt-16 md:grid-cols-2 lg:grid-cols-3"
        >
          {techIndex.map((category) => (
            <div
              key={category.title}
              data-reveal
              className="group bg-bg p-6 transition-colors duration-300 hover:bg-surface md:p-7"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3
                  className={cn(
                    'font-mono text-label uppercase',
                    category.accent ? 'text-red' : 'text-dim',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mr-2 inline-block h-[7px] w-[7px]',
                      category.accent ? 'bg-red' : 'bg-line',
                    )}
                  />
                  {category.title}
                </h3>
                {category.note && (
                  <span className="font-mono text-[9px] uppercase text-faint">{category.note}</span>
                )}
              </div>
              <ul className="mt-4">
                {category.items.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 border-t border-line-soft py-2.5 first:border-t-0"
                  >
                    <span className="font-mono text-[9px] text-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-lg font-medium tracking-tight text-ink transition-colors duration-200 group-hover:text-ink hover:text-red">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
