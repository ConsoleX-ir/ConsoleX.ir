import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: '01', name: 'AURA PLAYER', type: 'DESKTOP APP / MEDIA', status: 'IN DEVELOPMENT', description: 'A focused home for the music you already own. Built to make listening feel personal again.', tech: 'TYPESCRIPT · ELECTRON · REACT', art: 'aura', mark: 'AURA' },
  { id: '02', name: 'CONSOLEX', type: 'CREATIVE SYSTEM / WEB', status: 'ACTIVE', description: 'An evolving space for experiments, useful tools, and ideas that deserve to become real.', tech: 'REACT · WEB PLATFORM', art: 'console', mark: 'CX' },
  { id: '03', name: 'SMALL TOOLS', type: 'UTILITIES / EXPERIMENTS', status: 'ONGOING', description: 'Small, sharp solutions to everyday friction. Made to solve a problem, then get out of the way.', tech: 'WEB APIS · JAVASCRIPT', art: 'tools', mark: 'TOOLS' },
]

const stack = ['TYPESCRIPT', 'REACT', 'JAVASCRIPT', 'HTML / CSS', 'ELECTRON', 'GSAP', 'NODE.JS', 'FIGMA']

function SectionTag({ number, children }: { number: string; children: string }) {
  return <div className="section-tag"><span>{number}</span><i />{children}</div>
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [clock, setClock] = useState('00:00:00')

  useEffect(() => {
    const updateClock = () => setClock(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Tehran', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()))
    updateClock()
    const clockId = window.setInterval(updateClock, 1000)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = reduceMotion ? null : new Lenis({ lerp: 0.09, smoothWheel: true })
    let raf = 0
    const tick = (time: number) => { lenis?.raf(time); raf = requestAnimationFrame(tick) }
    if (lenis) raf = requestAnimationFrame(tick)
    lenis?.on('scroll', ScrollTrigger.update)

    const ctx = gsap.context(() => {
      if (reduceMotion) return
      const intro = gsap.timeline({ delay: 0.12 })
      intro.from('.hero-kicker, .hero-title-line, .hero-bottom', { y: 28, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out' })
      gsap.to('.hero-orbit', { rotate: 360, duration: 55, repeat: -1, ease: 'none' })
      gsap.to('.hero-title', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => gsap.from(element, { y: 36, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } }))
      gsap.utils.toArray<HTMLElement>('.project-art').forEach((element) => gsap.from(element, { scale: 0.94, clipPath: 'inset(8% 8% 8% 8%)', duration: 1, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 82%', once: true } }))
      gsap.to('.contact-word', { xPercent: -10, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom bottom', scrub: 1 } })
    }, root)
    return () => { window.clearInterval(clockId); cancelAnimationFrame(raf); lenis?.destroy(); ctx.revert() }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return <div className="site-shell" ref={root}>
    <div className="ambient-grid" aria-hidden="true" />
    <div className="ambient-coordinate" aria-hidden="true">SYS_01 <span>●</span> ONLINE<br />X: 024 &nbsp; Y: 918</div>
    <header className="topbar">
      <a className="wordmark" href="#top" aria-label="ConsoleX home">CONSOLE<span className="red">X</span><small>INDEPENDENT DEVELOPER</small></a>
      <div className="topbar-right"><span className="local-clock">TEHRAN&nbsp; {clock}</span><button className="menu-toggle" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}><span /> <span /></button></div>
    </header>
    <nav className={`nav-panel ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
      {[['ABOUT', '#about'], ['WORK', '#work'], ['EXPERIMENTS', '#experiments'], ['CONTACT', '#contact']].map(([label, href], i) => <a key={label} href={href} onClick={closeMenu}><span>0{i + 1}</span>{label}<b>↗</b></a>)}
      <div className="nav-note">CURRENTLY OPEN TO<br />INTERESTING PROBLEMS.</div>
    </nav>

    <main id="top">
      <section className="hero section-frame" aria-labelledby="hero-title">
        <div className="hero-index mono">00 / PERSONAL INDEX <span>— 2026</span></div>
        <div className="hero-orbit" aria-hidden="true"><span>✳</span></div>
        <div className="hero-content">
          <p className="hero-kicker mono"><i /> SOFTWARE DEVELOPER &nbsp; / &nbsp; BUILDING UNDER CONSOLEX</p>
          <h1 className="hero-title" id="hero-title"><span className="hero-title-line">CON</span><span className="hero-title-line hero-title-last">SOLE<span className="red">.</span></span></h1>
          <div className="hero-bottom"><p>Build real software.<br />Explore ideas. Make things useful.</p><a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><b>↓</b></a></div>
        </div>
        <div className="hero-side mono">INDEPENDENT<br />BY DESIGN<br /><span>35°41' N — 51°25' E</span></div>
        <div className="hero-crosshair" aria-hidden="true">+</div>
      </section>

      <section className="about section-frame" id="about">
        <SectionTag number="01">A LITTLE CONTEXT</SectionTag>
        <div className="about-layout">
          <h2 className="reveal">I LIKE IDEAS<br />THAT <span className="outline-text">WORK.</span></h2>
          <div className="about-copy reveal"><p className="lead">I’m Console — an independent developer making software with purpose, curiosity, and a healthy respect for the details.</p><p>ConsoleX is where the work lives: products in progress, experiments worth sharing, and small tools that make digital life a little better. I care about how things work as much as how they feel.</p><a className="text-link" href="#work">A FEW THINGS I’VE MADE <span>↘</span></a></div>
        </div>
        <div className="about-rule"><span>THINK CLEARLY</span><i /><span>MAKE USEFUL THINGS</span><i /><span>STAY CURIOUS</span></div>
      </section>

      <section className="toolkit section-frame" id="toolkit">
        <SectionTag number="02">TOOLS OF THE TRADE</SectionTag>
        <div className="toolkit-head reveal"><h2>THE<br /><span className="outline-text">TOOLKIT</span></h2><p>THE RIGHT TOOL FOR THE<br />RIGHT KIND OF PROBLEM.</p></div>
        <div className="stack-list">{stack.map((item, i) => <div className="stack-row" key={item}><span className="mono">0{i + 1}</span><strong>{item}</strong><span className="stack-symbol">↗</span></div>)}</div>
      </section>

      <section className="work section-frame" id="work">
        <SectionTag number="03">SELECTED WORK</SectionTag>
        <div className="work-heading reveal"><h2>MADE<br /><span className="outline-text">REAL.</span></h2><p>THOUGHTS BECOME THINGS.<br />HERE ARE A FEW.</p></div>
        <div className="project-list">{projects.map((project) => <article className="project" key={project.id}>
          <div className={`project-art art-${project.art}`} aria-label={`${project.name} project visual`}><div className="art-grid" /><div className="art-index mono">CX / {project.id} <span>●</span> {project.status}</div><div className="art-mark">{project.mark}</div><div className="art-bottom mono"><span>CONSOLEX STUDIO</span><span>2026 — PRESENT</span></div><div className="art-cross">+</div></div>
          <div className="project-info"><div className="project-meta mono"><span>{project.id} — {project.type}</span><span>{project.status}</span></div><h3>{project.name}</h3><div className="project-detail"><p>{project.description}</p><span className="mono">{project.tech}</span></div></div>
        </article>)}</div>
      </section>

      <section className="experiments section-frame" id="experiments">
        <SectionTag number="04">THE PLAYGROUND</SectionTag>
        <div className="experiment-layout"><div className="experiment-title reveal"><span className="mono">NOT EVERYTHING NEEDS A ROADMAP.</span><h2>WHAT IF<br /><span className="red">WE</span><br />TRIED?</h2></div><div className="experiment-copy reveal"><p>Some ideas start as a question. A strange interface, a tiny utility, a late-night browser experiment. This is the space for following the thread.</p><div className="experiment-stamps"><span>UI STUDIES</span><span>WEB TOYS</span><span>ODD IDEAS</span><span>SMALL WINS</span></div><span className="mono experiment-foot">IN PROGRESS, ALWAYS.</span></div></div>
      </section>

      <section className="roadmap section-frame" id="roadmap">
        <SectionTag number="05">NEXT UP</SectionTag>
        <div className="roadmap-heading reveal"><h2>STILL<br /><span className="outline-text">BECOMING.</span></h2><p>AN ECOSYSTEM IN MOTION.<br />NO FAKE DEADLINES. JUST DIRECTION.</p></div>
        <div className="roadmap-list"><div className="roadmap-item is-active"><span className="road-dot" /><span className="mono">NOW / BUILDING</span><strong>AURA PLAYER</strong><p>A calmer way to listen to the music you love.</p><b>↗</b></div><div className="roadmap-item"><span className="road-dot" /><span className="mono">IN MOTION / EXPLORING</span><strong>VELO</strong><p>A new kind of momentum for everyday work.</p><b>↗</b></div><div className="roadmap-item"><span className="road-dot" /><span className="mono">ON THE HORIZON / RESEARCH</span><strong>NEXUS</strong><p>Connecting the pieces. Finding the useful signal.</p><b>↗</b></div></div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-inner section-frame"><SectionTag number="06">HAVE A GOOD ONE?</SectionTag><p className="contact-pre mono">GOOD THINGS START WITH A CONVERSATION.</p><h2 className="contact-word">LET’S MAKE<br />SOMETHING<span className="red">.</span></h2><div className="contact-bottom"><p>Have a project, a question, or an idea<br />that won’t leave you alone?</p><a className="contact-email" href="mailto:hello@consolex.dev">LET’S TALK <span>↗</span></a></div>
          <div className="social-links"><a href="https://github.com/" target="_blank" rel="noreferrer">GITHUB <span>↗</span></a><a href="mailto:hello@consolex.dev">EMAIL <span>↗</span></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LINKEDIN <span>↗</span></a></div></div>
      </section>
    </main>
    <footer className="footer section-frame"><a className="footer-mark" href="#top">CONSOLE<span className="red">X</span></a><span className="mono">BUILT WITH CODE & CURIOSITY.</span><span className="mono">© 2026 — CONSOLE</span><a className="back-top mono" href="#top">BACK TO TOP ↑</a></footer>
  </div>
}

export default App
