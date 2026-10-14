import { useEffect, useRef } from 'react'
import { gsap, hasFinePointer, prefersReducedMotion } from '../../lib/gsap'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [data-cursor="pointer"]'

/**
 * CustomCursor — a surveyor's reticle: red square dot, lagging ring and a
 * fine crosshair that rotates 45° over interactive elements.
 *
 * Accessibility contract:
 *  - rendered only for fine pointers with no reduced-motion preference
 *  - it REPLACES the native cursor only in that mode (html.cursor-hidden)
 *  - keyboard users are untouched (focus-visible outlines remain)
 *  - the native cursor returns automatically if the effect never mounts
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const crossRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const cross = crossRef.current
    if (!dot || !ring || !cross) return
    if (!hasFinePointer() || prefersReducedMotion()) return

    document.documentElement.classList.add('cursor-hidden')

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 })
    gsap.set(cross, { autoAlpha: 0 })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })
    const crossX = gsap.quickTo(cross, 'x', { duration: 0.28, ease: 'power3.out' })
    const crossY = gsap.quickTo(cross, 'y', { duration: 0.28, ease: 'power3.out' })

    let shown = false
    let interactive = false

    const onMove = (e: MouseEvent) => {
      if (!shown) {
        shown = true
        gsap.to([dot, ring, cross], { autoAlpha: 1, duration: 0.3, overwrite: 'auto' })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
      crossX(e.clientX)
      crossY(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null
      const next = typeof t?.closest === 'function' && t.closest(INTERACTIVE_SELECTOR) !== null
      if (next === interactive) return
      interactive = next
      gsap.to(ring, {
        scale: next ? 1.9 : 1,
        borderColor: next ? 'rgba(230,50,40,0.95)' : 'rgba(255,255,255,0.28)',
        duration: 0.35,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      gsap.to(cross, { rotate: next ? 45 : 0, duration: 0.35, ease: 'power3.out', overwrite: 'auto' })
      gsap.to(dot, { scale: next ? 0.55 : 1, duration: 0.3, ease: 'power3.out', overwrite: 'auto' })
    }

    const onDown = () => gsap.to(dot, { scale: 2.1, duration: 0.18, overwrite: 'auto' })
    const onUp = () =>
      gsap.to(dot, { scale: interactive ? 0.55 : 1, duration: 0.25, overwrite: 'auto' })
    const onLeave = () => {
      shown = false
      gsap.to([dot, ring, cross], { autoAlpha: 0, duration: 0.25, overwrite: 'auto' })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, true)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      document.documentElement.classList.remove('cursor-hidden')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver, true)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf([dot, ring, cross])
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-white/25 opacity-0"
      />
      <div ref={crossRef} className="fixed left-0 top-0 h-0 w-0 opacity-0">
        <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-white/45" />
        <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-white/45" />
      </div>
      <div ref={dotRef} className="fixed left-0 top-0 h-[5px] w-[5px] bg-red opacity-0" />
    </div>
  )
}
