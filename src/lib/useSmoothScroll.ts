import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

let lenisInstance: Lenis | null = null

/**
 * Lenis smooth scrolling, wired into GSAP's ticker so ScrollTrigger stays in
 * sync. Disabled entirely for prefers-reduced-motion users (native scroll).
 */
export function useSmoothScroll(): void {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })
    lenisInstance = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

/** Scroll lock used by the mobile menu overlay. */
export function lockScroll(locked: boolean): void {
  if (lenisInstance) {
    if (locked) lenisInstance.stop()
    else lenisInstance.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

/** Anchor navigation that respects Lenis when active. */
export function scrollToTarget(target: string | HTMLElement | number, offset = -72): void {
  if (typeof target === 'number') {
    if (lenisInstance) lenisInstance.scrollTo(target, { duration: 1.2 })
    else window.scrollTo({ top: target, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { offset, duration: 1.2 })
  } else {
    ;(el as HTMLElement).scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
  }
}
