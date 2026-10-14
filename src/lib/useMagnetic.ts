import { useEffect, useRef } from 'react'
import { gsap, hasFinePointer, prefersReducedMotion } from './gsap'

interface MagneticOptions {
  /** max translation in px */
  strength?: number
  /** radius around the element that attracts, in px (defaults to element box + field) */
  field?: number
}

/**
 * Magnetic hover — the element leans toward the cursor while it is near,
 * then snaps back with an elastic release. Pointer-fine devices only;
 * inert under reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const ref = useRef<T>(null)
  const opts = useRef(options)

  useEffect(() => {
    opts.current = options
  })

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !hasFinePointer()) return

    const { strength = 0.35, field = 60 } = opts.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const inField =
        Math.abs(dx) < r.width / 2 + field && Math.abs(dy) < r.height / 2 + field
      if (inField) {
        xTo(dx * strength)
        yTo(dy * strength)
      } else {
        xTo(0)
        yTo(0)
      }
    }
    const onLeaveWindow = () => {
      xTo(0)
      yTo(0)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeaveWindow)
    document.addEventListener('mouseleave', onLeaveWindow)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeaveWindow)
      document.removeEventListener('mouseleave', onLeaveWindow)
      gsap.killTweensOf(el)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [])

  return ref
}
