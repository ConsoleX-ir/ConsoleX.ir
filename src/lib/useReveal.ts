import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from './gsap'

interface RevealOptions {
  /** px offset the elements rise from */
  y?: number
  /** seconds between siblings */
  stagger?: number
  /** child selector — defaults to the element itself */
  selector?: string
  /** ScrollTrigger start string */
  start?: string
  /** delay before the reveal, seconds */
  delay?: number
}

/**
 * Scroll-triggered entrance for a section's children.
 * With reduced motion, content simply stays visible (no transform applied).
 */
export function useReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null)
  const opts = useRef(options)

  useEffect(() => {
    opts.current = options
  })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    const { y = 32, stagger = 0.08, selector, start = 'top 84%', delay = 0 } = opts.current
    const targets: Element[] = selector ? Array.from(el.querySelectorAll(selector)) : [el]
    if (targets.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.95,
          ease: 'power3.out',
          stagger,
          delay,
          overwrite: 'auto',
          scrollTrigger: { trigger: el, start, once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
