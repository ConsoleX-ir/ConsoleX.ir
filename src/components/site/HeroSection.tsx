import { useLayoutEffect, useRef, type MouseEvent } from 'react'
import { ArrowDown } from 'lucide-react'
import { GITHUB_URL, brand } from '../../data/site'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion'
import { scrollToTarget } from '../../lib/useSmoothScroll'
import { GhostButton } from '../ui/GhostButton'
import { LiquidButton } from '../ui/LiquidButton'
import { SplitLine } from '../ui/AnimatedText'
import { LiquidLens } from '../fx/LiquidLens'
import { Marquee } from '../fx/Marquee'

/**
 * HeroSection — oversized asymmetric editorial composition:
 * CONSOLE (solid) / X (signal red, indented) with a floating liquid-glass
 * lens, technical annotations, the gel CTA, and the creed marquee.
 */
export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.fromTo(
        '[data-hero-meta]',
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 },
        0.15,
      )
        .fromTo(
          '[data-char]',
          { yPercent: 116 },
          { yPercent: 0, duration: 1.1, stagger: 0.034 },
          0.3,
        )
        .fromTo(
          '[data-hero-rule]',
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.inOut', transformOrigin: 'left center' },
          0.85,
        )
        .fromTo(
          '[data-hero-body]',
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1 },
          0.95,
        )
        .fromTo('[data-hero-lens]', { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1 }, 1.1)
        .fromTo(
          '[data-hero-marquee]',
          { yPercent: 101 },
          { yPercent: 0, duration: 0.9, ease: 'power3.out' },
          1.15,
        )

      // gentle drift of the annotation block — architectural, not flashy
      gsap.to('[data-hero-annot]', {
        y: -10,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  const goWork = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    scrollToTarget('#work')
  }

  return (
    <section ref={rootRef} aria-labelledby="hero-title" className="relative flex min-h-svh flex-col">
      <div className="mx-auto flex w-full max-w-page flex-1 flex-col px-gutter pt-24 md:px-10 md:pt-32 lg:pt-36">
        {/* index meta row */}
        <div className="flex items-center justify-between gap-6">
          <p data-hero-meta className="mono-label">
            Portfolio index — github.com/ConsoleX-ir
          </p>
          <p data-hero-meta className="mono-label hidden md:block">
            {brand.repoCount} public repositories
          </p>
        </div>

        {/* display composition */}
        <div data-hero-display className="relative mt-10 md:mt-14">
          <h1 id="hero-title">
            <span className="sr-only">
              ConsoleX — {brand.claim} {brand.role}.
            </span>
            <span aria-hidden="true" className="block">
              <SplitLine text="CONSOLE" className="text-display" />
            </span>
            <span aria-hidden="true" className="mt-[0.5vw] flex items-end gap-[4vw] pl-[6vw] md:pl-[12vw]">
              <SplitLine text="X" className="text-display text-red" />
              <span
                data-hero-annot
                className="mb-[1.2vw] hidden border-l border-line pl-5 md:block lg:pl-7"
              >
                <span className="mono-label block text-ink">Personal</span>
                <span className="mono-label block">Software</span>
                <span className="mono-label block">Ecosystem</span>
                <span aria-hidden="true" className="mt-2 block h-[7px] w-[7px] bg-red" />
              </span>
            </span>
          </h1>

          {/* liquid lens — floats right of CONSOLE on wide screens */}
          <div
            data-hero-lens
            className="mt-10 md:absolute md:right-0 md:top-2 md:mt-0 md:w-[290px] lg:w-[320px]"
          >
            <LiquidLens className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-micro uppercase text-ink">Aura — now playing</p>
                <span className="font-mono text-[9px] uppercase text-faint">v3.2.0</span>
              </div>
              <div className="mt-5 flex h-12 items-end gap-1.5" aria-hidden="true">
                {[0.5, 0.9, 0.65, 1, 0.75, 0.45, 0.85].map((h, i) => (
                  <span
                    key={i}
                    className="eq-bar w-[4px] rounded-full"
                    style={{
                      height: `${h * 100}%`,
                      backgroundColor: i === 3 ? '#e63228' : 'rgba(245,245,245,0.85)',
                      animationDelay: `${i * 0.12}s`,
                      animationDuration: `${0.9 + (i % 3) * 0.22}s`,
                    }}
                  />
                ))}
              </div>
              <p className="mt-5 font-mono text-micro uppercase text-dim">
                Liquid-glass generation
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="font-mono text-[9px] uppercase text-faint">Glass material — 001</span>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-red" />
              </div>
            </LiquidLens>
          </div>
        </div>

        {/* rule with red register */}
        <div data-hero-rule className="relative mt-10 h-px w-full bg-line md:mt-14">
          <span aria-hidden="true" className="absolute -left-px -top-[3px] h-[7px] w-[7px] bg-red" />
        </div>

        {/* body row */}
        <div className="mt-10 grid grid-cols-1 gap-10 pb-12 md:mt-14 md:grid-cols-12 md:gap-8">
          <p data-hero-body className="max-w-xl text-lg leading-relaxed text-dim md:col-span-6 lg:col-span-5">
            <span className="text-ink">{brand.statement}</span> Ideas become real software across
            frontend, desktop, backend and lower-level systems — engineered end to end, on my own
            terms.
          </p>
          <div
            data-hero-body
            className="flex flex-wrap items-start gap-4 md:col-span-6 md:justify-end lg:col-start-8 lg:col-span-5"
          >
            <LiquidButton href="#work" onClick={goWork} ariaLabel="View selected work">
              View selected work
              <ArrowDown aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
            </LiquidButton>
            <GhostButton href={GITHUB_URL} external ariaLabel="ConsoleX on GitHub">
              GitHub ↗
            </GhostButton>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="mt-auto flex items-center justify-between pb-5">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget('#intro')
            }}
            className="mono-label inline-flex items-center gap-2 transition-colors hover:text-red"
          >
            Scroll
            <ArrowDown aria-hidden="true" className="h-3 w-3 animate-bounce" strokeWidth={1.5} />
            <span aria-hidden="true" className="text-faint">— 01/04</span>
          </button>
          <p className="mono-label hidden md:block">EST. on GitHub — {brand.githubHandle}</p>
        </div>
      </div>

      {/* creed marquee */}
      <div data-hero-marquee>
        <Marquee items={brand.creed} />
      </div>
    </section>
  )
}
