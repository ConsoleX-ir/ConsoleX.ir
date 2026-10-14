import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion'
import { CornerTicks } from '../ui/CornerTicks'

/**
 * Bar heights after the Aura app icon's own 9-bar equalizer glyph
 * (44/80/132/196/248/196/132/80/44 on a 512 grid). Rendered as an abstract
 * "signal field" — explicitly not a screenshot.
 */
const HEIGHTS = [44, 80, 132, 196, 248, 196, 132, 80, 44]
const OPACITY = [0.28, 0.42, 0.58, 0.78, 1, 0.78, 0.58, 0.42, 0.28]

export function EqualizerVisual() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const bars = gsap.utils.toArray<HTMLElement>('[data-eq-bar]')
      const tweens = bars.map((bar, i) =>
        gsap.to(bar, {
          scaleY: () => gsap.utils.random(0.3, 1),
          duration: () => gsap.utils.random(0.45, 1.05),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          delay: i * 0.055,
          transformOrigin: 'center',
          paused: true,
        }),
      )
      ScrollTrigger.create({
        trigger: rootRef.current ?? undefined,
        start: 'top 92%',
        end: 'bottom 8%',
        onEnter: () => tweens.forEach((t) => t.play()),
        onLeave: () => tweens.forEach((t) => t.pause()),
        onEnterBack: () => tweens.forEach((t) => t.play()),
        onLeaveBack: () => tweens.forEach((t) => t.pause()),
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <figure className="relative">
      <div ref={rootRef} className="relative border border-line bg-surface p-6 md:p-8">
        <CornerTicks className="opacity-70" />
        <figcaption className="flex items-center justify-between">
          <span className="font-mono text-micro uppercase text-ink">Aura — signal field</span>
          <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase text-faint">
            <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-red" />
            live
          </span>
        </figcaption>

        <div className="mt-6 flex h-[280px] items-center justify-center gap-[2.4%] md:h-[340px]" aria-hidden="true">
          {HEIGHTS.map((h, i) => (
            <span
              key={i}
              data-eq-bar
              className="w-[6.5%] max-w-[26px] min-w-[6px] rounded-full"
              style={{
                height: `${(h / 248) * 100}%`,
                backgroundColor: i === 4 ? '#e63228' : '#f5f5f5',
                opacity: i === 4 ? 1 : OPACITY[i],
              }}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-line-soft pt-4">
          <span className="font-mono text-[9px] uppercase text-faint">ConsoleX audio system</span>
          <span className="font-mono text-[9px] uppercase text-faint">AURA v3</span>
        </div>
      </div>
      <p className="mono-label mt-4 text-[10px] leading-relaxed">
        Abstract visual — after Aura’s own icon system. Not a screenshot.
      </p>
    </figure>
  )
}
