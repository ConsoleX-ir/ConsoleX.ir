import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/** Shared reduced-motion query. */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches
}

/** Fine-pointer query — gating pointer-only effects. */
export const FINE_POINTER_QUERY = '(pointer: fine)'

export function hasFinePointer(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(FINE_POINTER_QUERY).matches
}
