import { Link } from 'react-router'
import SectionLabel from '../components/ui/SectionLabel'
import ArrowLink from '../components/ui/ArrowLink'
import ProjectArtwork from '../components/effects/ProjectArtwork'
import { auraPlayer } from '../data/projects'
import { skillGroups } from '../data/skills'
import { socialLinks } from '../data/socialLinks'

const sectionSpace = 'mx-auto w-[min(1320px,calc(100%-96px))] border-t border-white/10 py-[clamp(78px,11vw,148px)] max-[800px]:w-[calc(100%-48px)] max-[520px]:w-[calc(100%-36px)] max-[520px]:py-[78px]'
const sectionTitle = 'm-0 text-[clamp(65px,10.5vw,142px)] font-semibold leading-[.81] tracking-[-.09em] max-[800px]:text-[clamp(68px,13vw,112px)] max-[520px]:text-[clamp(61px,15.4vw,82px)]'

export default function HomePage() {
  return <>
    <section className="relative mx-auto flex min-h-[min(820px,calc(100svh-76px))] w-[min(1320px,calc(100%-96px))] items-center border-b border-white/10 max-[800px]:w-[calc(100%-48px)] max-[520px]:min-h-[min(760px,calc(100svh-70px))] max-[520px]:w-[calc(100%-36px)]" aria-labelledby="hero-title">
      <div className="absolute left-0 right-0 top-7 z-[2] flex justify-between font-mono text-[9px] tracking-[.11em] text-neutral-500 max-[520px]:top-5 max-[520px]:text-[7px]"><span>CONSOLEX / 2026</span><span className="max-[520px]:max-w-32 max-[520px]:text-right">INDEPENDENT SOFTWARE DEVELOPER</span></div>
      <div className="hero-orbit absolute right-[8%] top-[20%] z-[1] aspect-square w-[min(39vw,480px)] rounded-full border border-white/10 opacity-65 max-[800px]:right-[-3%] max-[800px]:top-1/4 max-[800px]:w-[54vw] max-[800px]:opacity-40 max-[520px]:right-[-19%] max-[520px]:top-[28%] max-[520px]:w-[75vw] max-[520px]:opacity-30" aria-hidden="true"><span>✳</span></div>
      <div className="relative z-[2] w-full px-[4%] pb-[18px] pt-[58px] max-[800px]:px-0 max-[520px]:px-0">
        <p className="page-reveal mb-[26px] flex items-center gap-2.5 font-mono text-[9px] tracking-[.1em] text-neutral-300 max-[520px]:max-w-[285px] max-[520px]:text-[7px] max-[520px]:tracking-[.05em]"><i className="size-[7px] rounded-full bg-accent" /> CODE WITH INTENT. BUILD WITH CURIOSITY.</p>
        <h1 className="page-reveal m-0 text-[clamp(100px,18vw,246px)] font-bold leading-[.77] tracking-[-.105em] max-[800px]:text-[clamp(92px,19vw,155px)] max-[520px]:text-[clamp(75px,20vw,110px)]" id="hero-title">CONSOLE<span className="text-accent">.</span></h1>
        <div className="page-reveal mt-[46px] flex max-w-[990px] flex-wrap items-end justify-between gap-7 pr-[8%] max-[520px]:mt-[33px] max-[520px]:flex-col max-[520px]:items-start max-[520px]:gap-[17px] max-[520px]:pr-0">
          <p className="m-0 text-[15px] leading-[1.65] text-[#bdbdb8] max-[520px]:text-[13px]">Independent developer building software<br className="hidden sm:block" /> that feels considered and works hard.</p>
          <div className="flex flex-wrap gap-3"><ArrowLink to={auraPlayer.slug} variant="primary">Explore Aura Player</ArrowLink><a className="inline-flex min-h-10 items-center justify-between gap-6 border-b border-white/30 py-2.5 font-mono text-[10px] text-neutral-300 transition-colors hover:border-accent hover:text-paper" href="#work">Selected work <span className="text-base text-accent" aria-hidden="true">↓</span></a></div>
        </div>
      </div>
      <div className="absolute bottom-[26px] left-0 flex items-center gap-3 font-mono text-[8px] tracking-[.1em] text-neutral-500 max-[520px]:bottom-[18px]"><span className="h-px w-[26px] bg-accent" /> SCROLL TO EXPLORE</div>
    </section>

    <section className={`${sectionSpace} border-t-0`} id="about" aria-labelledby="about-title">
      <SectionLabel index="01">ABOUT</SectionLabel>
      <div className="scroll-reveal grid grid-cols-[1.15fr_.85fr] items-end gap-[7%] py-[68px] pb-[76px] max-[800px]:grid-cols-1 max-[800px]:gap-[38px] max-[800px]:py-[52px] max-[800px]:pb-[58px] max-[520px]:gap-[34px] max-[520px]:py-[48px]">
        <h2 className={sectionTitle} id="about-title">I LIKE IDEAS<br />THAT <span className="outline-type">WORK.</span></h2>
        <div className="max-w-[445px] pb-[7px] max-[800px]:ml-[17%] max-[520px]:ml-[5%]"><p className="mb-5 text-[clamp(19px,2vw,24px)] leading-[1.45]">I’m Console — a developer who likes turning a good question into a useful piece of software.</p><p className="mb-[18px] text-[13px] leading-[1.85] text-neutral-400 max-[520px]:text-[12px]">ConsoleX is my space to build, learn, and share the work as it takes shape. I care about strong foundations, thoughtful details, and making technology feel a little more human.</p><a className="mt-2.5 inline-flex gap-7 border-b border-white/25 py-3 pb-[9px] font-mono text-[8px] tracking-wide text-neutral-300" href="#stack">A LITTLE ABOUT HOW I BUILD <span className="text-sm text-accent" aria-hidden="true">↓</span></a></div>
      </div>
      <div className="flex items-center gap-[18px] border-t border-white/10 pt-[15px] font-mono text-[8px] tracking-[.08em] text-neutral-500 max-[520px]:gap-2 max-[520px]:text-[6px] max-[520px]:tracking-normal" aria-label="Guiding principles"><span>THINK CLEARLY</span><i className="h-px min-w-2 flex-1 bg-white/10" /><span>MAKE USEFUL THINGS</span><i className="h-px min-w-2 flex-1 bg-white/10" /><span>STAY CURIOUS</span></div>
    </section>

    <section className={sectionSpace} id="stack" aria-labelledby="stack-title">
      <SectionLabel index="02">TECHNOLOGY</SectionLabel>
      <div className="flex items-end justify-between gap-6 py-[60px] pb-12 max-[800px]:py-12 max-[800px]:pb-9 max-[520px]:flex-col max-[520px]:items-start max-[520px]:gap-4 max-[520px]:py-11 max-[520px]:pb-[30px]">
        <h2 className={sectionTitle} id="stack-title">THE<br /><span className="outline-type">TOOLKIT</span></h2><p className="mb-2 mr-[7%] font-mono text-[9px] leading-[1.8] text-neutral-500 max-[800px]:mr-[2%] max-[520px]:ml-1.5 max-[520px]:text-[8px]">A PRACTICAL SET OF TOOLS<br />FOR MAKING SOFTWARE.</p>
      </div>
      <div className="ml-[29%] border-t border-white/15 max-[800px]:ml-[14%] max-[520px]:ml-0">
        {skillGroups.map((group, index) => <div className="scroll-reveal grid min-h-[72px] grid-cols-[46px_minmax(125px,.7fr)_1.5fr_24px] items-center gap-4 border-b border-white/15 transition-colors hover:text-accent max-[800px]:min-h-[68px] max-[800px]:grid-cols-[34px_105px_1fr_16px] max-[800px]:gap-2.5 max-[520px]:min-h-[67px] max-[520px]:grid-cols-[26px_80px_1fr_12px] max-[520px]:gap-[7px]" key={group.category}>
          <span className="font-mono text-[9px] text-neutral-500">0{index + 1}</span><h3 className="m-0 text-[13px] font-medium text-neutral-300 max-[800px]:text-[12px] max-[520px]:text-[10px]">{group.category}</h3><ul className="m-0 flex list-none flex-wrap gap-x-[18px] gap-y-2 p-0 max-[800px]:gap-x-3 max-[520px]:gap-x-2.5 max-[520px]:gap-y-[7px]">{group.items.map((skill) => <li className="text-sm text-paper max-[800px]:text-xs max-[520px]:text-[10px]" key={skill}>{skill}</li>)}</ul><span className="text-right text-neutral-500" aria-hidden="true">↗</span>
        </div>)}
      </div>
    </section>

    <section className={sectionSpace} id="work" aria-labelledby="work-title">
      <SectionLabel index="03">FEATURED PROJECT</SectionLabel>
      <div className="flex items-end justify-between gap-6 py-[60px] pb-12 max-[800px]:py-12 max-[800px]:pb-9 max-[520px]:flex-col max-[520px]:items-start max-[520px]:gap-4 max-[520px]:py-11 max-[520px]:pb-[30px]">
        <h2 className={sectionTitle} id="work-title">IN<br /><span className="outline-type">MOTION.</span></h2><p className="mb-2 mr-[7%] font-mono text-[9px] leading-[1.8] text-neutral-500 max-[800px]:mr-[2%] max-[520px]:ml-1.5 max-[520px]:text-[8px]">ONE PROJECT, BUILT<br />WITH CARE.</p>
      </div>
      <article className="scroll-reveal grid grid-cols-[1.1fr_.9fr] items-center gap-[7%] border-t border-white/15 pt-[35px] max-[800px]:grid-cols-1 max-[800px]:gap-[18px]">
        <Link className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-accent" to={auraPlayer.slug} aria-label="Explore Aura Player project"><ProjectArtwork compact /></Link>
        <div className="py-5 max-[800px]:px-[3%] max-[520px]:px-0"><p className="mb-[18px] font-mono text-[8px] uppercase tracking-[.1em] text-neutral-400"><span className="text-accent">01</span> / DESKTOP SOFTWARE</p><h3 className="mb-[14px] text-[clamp(36px,5vw,64px)] font-semibold tracking-[-.07em] max-[520px]:text-[38px]">{auraPlayer.name}</h3><p className="m-0 max-w-[385px] text-sm leading-[1.7] text-neutral-400 max-[520px]:text-xs">{auraPlayer.summary}</p><div className="my-[22px] mb-[18px] flex flex-wrap gap-2">{auraPlayer.stack.map((technology) => <span className="border border-white/20 px-2.5 py-2 font-mono text-[8px] text-neutral-300" key={technology}>{technology}</span>)}</div><p className="mb-[18px] flex items-center gap-2 font-mono text-[8px] uppercase text-neutral-400"><i className="size-[7px] rounded-full bg-accent" /> {auraPlayer.status}</p><ArrowLink to={auraPlayer.slug}>Discover the project</ArrowLink></div>
      </article>
      <p className="ml-auto mt-[17px] max-w-[530px] text-right font-mono text-[8px] leading-relaxed text-neutral-500 max-[520px]:max-w-none max-[520px]:text-left">Aura Player is presented as a work in progress. The visual on this page is original concept artwork, not an application screenshot.</p>
    </section>

    <section className="relative overflow-hidden bg-[#e9e9e4] text-[#101110]" id="contact" aria-labelledby="contact-title">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" style={{ backgroundImage: 'linear-gradient(90deg, transparent 24.9%, #d2d2cc 25%, transparent 25.1%, transparent 49.9%, #d2d2cc 50%, transparent 50.1%, transparent 74.9%, #d2d2cc 75%, transparent 75.1%)' }} />
      <div className="relative z-[1] mx-auto w-[min(1320px,calc(100%-96px))] py-[82px] pb-[55px] max-[800px]:w-[calc(100%-48px)] max-[520px]:w-[calc(100%-36px)] max-[520px]:py-[54px] max-[520px]:pb-11">
        <SectionLabel index="04">GET IN TOUCH</SectionLabel><p className="mb-[22px] mt-[95px] font-mono text-[9px] tracking-[.1em] text-neutral-500 max-[520px]:mt-[62px] max-[520px]:text-[8px]">HAVE A GOOD QUESTION?</p><h2 className="m-0 text-[clamp(70px,13vw,176px)] font-bold leading-[.79] tracking-[-.1em] max-[800px]:text-[clamp(68px,13.5vw,115px)] max-[520px]:text-[clamp(58px,13.6vw,74px)]" id="contact-title">LET’S BUILD<br />SOMETHING<span className="text-accent">.</span></h2>
        <div className="flex items-end justify-between gap-6 py-[42px] pb-[76px] max-[520px]:flex-col max-[520px]:items-start max-[520px]:py-7 max-[520px]:pb-9"><p className="m-0 text-sm leading-[1.65] text-neutral-700">I’m always glad to hear about thoughtful projects<br className="hidden sm:block" /> and interesting problems.</p><ArrowLink to={socialLinks[0].href} variant="dark" external>Find me on GitHub</ArrowLink></div>
      </div>
    </section>
  </>
}
