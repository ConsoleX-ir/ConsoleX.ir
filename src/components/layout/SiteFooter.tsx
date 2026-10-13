import { Link } from 'react-router'
import { socialLinks } from '../../data/socialLinks'

export default function SiteFooter() {
  return <footer className="page-wrap grid min-h-[108px] grid-cols-[1fr_auto_auto_auto] items-center gap-[clamp(20px,5vw,72px)] max-[800px]:grid-cols-[1fr_auto] max-[800px]:py-[22px] max-[800px]:gap-5">
    <Link className="inline-flex flex-col gap-1 text-sm font-bold tracking-[.09em]" to="/" aria-label="ConsoleX home"><span>CONSOLE<span className="text-accent">X</span></span><small className="font-mono text-[8px] font-normal text-neutral-500">BUILT WITH CURIOSITY</small></Link>
    <span className="text-right font-mono text-[8px] text-neutral-500">© {new Date().getFullYear()} Console</span>
    <a className="inline-flex gap-2 font-mono text-[8px] text-neutral-400 transition-colors hover:text-accent" href={socialLinks[0].href} target="_blank" rel="noreferrer">GitHub <span className="text-accent" aria-hidden="true">↗</span></a>
    <a className="inline-flex justify-self-end gap-2 font-mono text-[8px] text-neutral-400 transition-colors hover:text-accent" href="#main-content">Back to top <span className="text-accent" aria-hidden="true">↑</span></a>
  </footer>
}
