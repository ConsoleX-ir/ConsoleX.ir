import { useEffect, useState } from 'react'
import { REDUCED_MOTION_QUERY } from './gsap'

/** Reactive prefers-reduced-motion state. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
