import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import { gsap, hasFinePointer, prefersReducedMotion } from '../../lib/gsap'
import { useMagnetic } from '../../lib/useMagnetic'
import { cn } from '../../lib/utils'

interface LiquidButtonProps {
  href?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  children: ReactNode
  className?: string
  ariaLabel?: string
  external?: boolean
}

/**
 * LiquidButton — the gel interaction.
 *
 * A red pill with a bead of the same material that stretches toward the
 * pointer and snaps back, both rendered inside an SVG gooey alpha filter
 * (feGaussianBlur → feColorMatrix). Magnetic pull on approach; a pulse
 * answers keyboard focus. Falls back to a crisp flat pill on engines where
 * CSS-referenced filters misbehave (Safari) — the bead simply stays dormant.
 */
export function LiquidButton({ href, onClick, children, className, ariaLabel, external }: LiquidButtonProps) {
  const wrapRef = useMagnetic<HTMLSpanElement>({ strength: 0.22, field: 46 })
  const beadRef = useRef<HTMLSpanElement>(null)
  const baseRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const bead = beadRef.current
    const base = baseRef.current
    if (!wrap || !bead || !base) return
    if (!hasFinePointer() || prefersReducedMotion()) return

    gsap.set(bead, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.4 })

    const beadX = gsap.quickTo(bead, 'x', { duration: 0.5, ease: 'power3.out' })
    const beadY = gsap.quickTo(bead, 'y', { duration: 0.5, ease: 'power3.out' })

    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      beadX(clamp(dx * 0.4, -(r.width / 2 - 14), r.width / 2 - 14))
      beadY(clamp(dy * 0.5, -(r.height / 2 - 8), r.height / 2 - 8))
    }
    const onEnter = () => {
      gsap.to(bead, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power3.out', overwrite: 'auto' })
      gsap.to(base, { scale: 1.045, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
    }
    const onLeave = () => {
      beadX(0)
      beadY(0)
      gsap.to(bead, {
        autoAlpha: 0,
        scale: 0.4,
        duration: 0.55,
        ease: 'power3.in',
        delay: 0.1,
        overwrite: 'auto',
      })
      gsap.to(base, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.55)', overwrite: 'auto' })
    }
    const onFocus = () => {
      gsap
        .timeline({ overwrite: 'auto' })
        .fromTo(bead, { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1.3, duration: 0.28 })
        .to(bead, { autoAlpha: 0, scale: 0.4, duration: 0.34 })
    }

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerenter', onEnter)
    wrap.addEventListener('pointerleave', onLeave)
    wrap.addEventListener('focusin', onFocus)

    return () => {
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerenter', onEnter)
      wrap.removeEventListener('pointerleave', onLeave)
      wrap.removeEventListener('focusin', onFocus)
      gsap.killTweensOf([bead, base])
    }
  }, [wrapRef])

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ filter: 'url(#cx-goo)' }}
      >
        <span ref={baseRef} className="absolute inset-0 rounded-full bg-red" />
        <span ref={beadRef} className="absolute left-1/2 top-1/2 h-10 w-10 rounded-full bg-red opacity-0" />
      </span>
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </>
  )

  const shared = cn(
    'relative inline-flex items-center justify-center rounded-full px-8 py-4 font-mono text-label uppercase text-bg transition-transform duration-200 active:scale-[0.97]',
    className,
  )

  return (
    <span ref={wrapRef} className="inline-block">
      {href ? (
        <a
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          className={shared}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} aria-label={ariaLabel} className={shared}>
          {inner}
        </button>
      )}
    </span>
  )
}
