import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function usePageMotion(pathname: string, hash: string) {
  const lenisRef = useRef<Lenis | null>(null)
  const [reduceMotion, setReduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = (event: MediaQueryListEvent) => setReduceMotion(event.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    let raf = 0
    const tick = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef.current = null }
  }, [reduceMotion])

  useEffect(() => {
    const scrollFrame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
      if (target && lenisRef.current) lenisRef.current.scrollTo(target, { offset: -88, immediate: true })
      else if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' })
      else if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
      else window.scrollTo({ top: 0, behavior: 'auto' })
      ScrollTrigger.refresh()
    })
    if (reduceMotion) return () => cancelAnimationFrame(scrollFrame)

    const ctx = gsap.context(() => {
      gsap.from('.page-reveal', { y: 22, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' })
      gsap.utils.toArray<HTMLElement>('.scroll-reveal').forEach((element) => {
        gsap.from(element, { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } })
      })
    })
    return () => { cancelAnimationFrame(scrollFrame); ctx.revert() }
  }, [pathname, hash, reduceMotion])
}
