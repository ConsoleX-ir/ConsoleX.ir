import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type WelcomeIntroProps = { onContinue: () => void; onEnterWithSound: () => void }

export default function WelcomeIntro({ onContinue, onEnterWithSound }: WelcomeIntroProps) {
  const introRef = useRef<HTMLDivElement>(null)
  const exitTween = useRef<gsap.core.Tween | null>(null)
  const exiting = useRef(false)

  const leave = (withSound = false) => {
    if (exiting.current) return
    exiting.current = true
    if (withSound) onEnterWithSound()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !introRef.current) { onContinue(); return }
    exitTween.current = gsap.to(introRef.current, { yPercent: -100, duration: 0.48, ease: 'power3.inOut', onComplete: onContinue })
  }

  useEffect(() => {
    const firstButton = introRef.current?.querySelector<HTMLButtonElement>('button')
    firstButton?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { leave(); return }
      if (event.key !== 'Tab' || !introRef.current) return
      const buttons = introRef.current.querySelectorAll<HTMLButtonElement>('button')
      const first = buttons[0]
      const last = buttons[buttons.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    const media = gsap.matchMedia()
    if (introRef.current) media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .from('.intro-topline', { y: 8, opacity: 0, duration: 0.3 })
          .from('.intro-word', { yPercent: 105, opacity: 0, duration: 0.58, stagger: 0.08 }, '-=0.06')
          .from('.intro-rule', { scaleX: 0, duration: 0.34, transformOrigin: 'left' }, '-=0.14')
          .from('.intro-actions', { y: 8, opacity: 0, duration: 0.32 }, '-=0.1')
      }, introRef)
      return () => ctx.revert()
    })
    return () => { document.removeEventListener('keydown', onKeyDown); media.revert(); exitTween.current?.kill() }
  }, [onContinue])

  return <div ref={introRef} className="fixed inset-0 z-50 grid min-h-svh place-items-center overflow-hidden bg-[#080909]" role="dialog" aria-modal="true" aria-labelledby="intro-title">
    <div className="intro-surface" aria-hidden="true"><div className="intro-surface-grid" /><div className="intro-light" /><div className="intro-sweep" /></div>
    <div className="relative z-[1] mx-auto flex min-h-[min(820px,calc(100svh-80px))] w-[min(1320px,calc(100%-96px))] flex-col justify-between py-[30px] max-[800px]:w-[calc(100%-48px)] max-[520px]:w-[calc(100%-36px)]">
      <div className="intro-topline flex justify-between font-mono text-[8px] tracking-[.11em] text-neutral-500 max-[520px]:text-[7px]"><span>CONSOLEX / PERSONAL SOFTWARE STUDIO</span><span className="max-[520px]:max-w-[110px] max-[520px]:text-right">EST. IN CURIOSITY</span></div>
      <div className="my-auto w-fit pl-[9%] max-[520px]:pl-0">
        <p className="intro-overline mb-6 flex items-center gap-2.5 font-mono text-[9px] tracking-[.11em] text-neutral-300"><i className="size-1.5 bg-accent" /> AN INDEPENDENT DEVELOPER’S SPACE</p>
        <h1 className="m-0 overflow-hidden text-[clamp(90px,18vw,235px)] font-bold leading-[.73] tracking-[-.105em] max-[520px]:text-[clamp(80px,21vw,116px)]" id="intro-title"><span className="intro-word block">CONSOLE</span><span className="intro-word intro-brand-x ml-[29%] block">X<span className="text-accent">.</span></span></h1>
        <div className="intro-rule mt-8 h-px w-[min(510px,72vw)] bg-gradient-to-r from-accent to-white/20" />
        <p className="mt-[18px] text-[15px] leading-relaxed text-neutral-300 max-[520px]:text-[13px]">Ideas into software.<br />A little precision, a lot of curiosity.</p>
        <div className="mt-[30px] flex flex-wrap gap-[22px] max-[520px]:gap-2.5">
          <button className="inline-flex min-h-[45px] cursor-pointer items-center gap-6 border border-accent bg-accent px-[15px] font-mono text-[9px] max-[520px]:gap-[13px] max-[520px]:px-[11px] max-[520px]:text-[8px]" type="button" onClick={() => leave()}>Enter quietly <span aria-hidden="true">↗</span></button>
          <button className="inline-flex min-h-[45px] cursor-pointer items-center gap-6 border border-white/25 bg-transparent px-[15px] font-mono text-[9px] text-neutral-300 max-[520px]:gap-[13px] max-[520px]:px-[11px] max-[520px]:text-[8px]" type="button" onClick={() => leave(true)}><span className="text-base text-accent" aria-hidden="true">♫</span> Enter with music</button>
        </div>
      </div>
      <div className="intro-bottomline flex justify-between font-mono text-[8px] tracking-[.11em] text-neutral-500 max-[520px]:text-[7px]"><span>PORTFOLIO / 2026</span><span>SKIP INTRO <button className="cursor-pointer border-0 bg-transparent text-sm text-accent" type="button" onClick={() => leave()} aria-label="Skip intro">↗</button></span></div>
    </div>
  </div>
}
