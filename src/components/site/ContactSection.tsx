import { AURA_REPO_URL, GITHUB_URL, TASKFLOW_REPO_URL, brand } from '../../data/site'
import { useReveal } from '../../lib/useReveal'
import { useMagnetic } from '../../lib/useMagnetic'
import { ArrowLink } from '../ui/ArrowLink'
import { LiquidButton } from '../ui/LiquidButton'
import { SectionLabel } from '../ui/SectionLabel'

/**
 * ContactSection — the closing statement. The verified origin question as
 * display type, GitHub as the single honest channel, and a small directory.
 */
export function ContactSection() {
  const ref = useReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.12 })
  const wordmarkRef = useMagnetic<HTMLSpanElement>({ strength: 0.12, field: 70 })

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-page px-gutter pt-24 md:px-10 md:pt-36">
        <SectionLabel num="04" label="Contact" annotation="Official channel — GitHub" />

        <div ref={ref} className="mt-12 grid grid-cols-1 gap-14 md:mt-16 md:grid-cols-12 md:gap-10">
          <div data-reveal className="md:col-span-7">
            <span ref={wordmarkRef} className="inline-block">
              <h2
                id="contact-title"
                className="text-title font-semibold uppercase leading-[0.92] tracking-tight text-ink"
              >
                <span className="text-dim">“</span>Can I build
                <br />
                this myself<span className="text-red">?”</span>
              </h2>
            </span>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-dim">
              That question is where {brand.name} starts — and the answer keeps turning into
              software. The work lives in the open: follow the repositories, read the code, file an
              issue.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <LiquidButton href={GITHUB_URL} external ariaLabel="Follow ConsoleX on GitHub">
                Follow on GitHub
              </LiquidButton>
              <span className="mono-label max-w-[220px] leading-relaxed">
                No public email — GitHub is the verified channel
              </span>
            </div>
          </div>

          <div data-reveal className="md:col-span-5 lg:col-span-4 lg:col-start-9">
            <h3 className="mono-label">Directory</h3>
            <div className="mt-4 border-b border-line-soft">
              <div className="border-t border-line-soft py-4">
                <ArrowLink href={GITHUB_URL} external className="w-full justify-between">
                  GitHub profile
                </ArrowLink>
              </div>
              <div className="border-t border-line-soft py-4">
                <ArrowLink href={AURA_REPO_URL} external className="w-full justify-between">
                  Aura Player — repo
                </ArrowLink>
              </div>
              <div className="border-t border-line-soft py-4">
                <ArrowLink href={TASKFLOW_REPO_URL} external className="w-full justify-between">
                  TaskFlow — repo
                </ArrowLink>
              </div>
            </div>
            <p className="mt-6 font-mono text-micro uppercase leading-relaxed text-faint">
              Everything published. Everything built in the open.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
