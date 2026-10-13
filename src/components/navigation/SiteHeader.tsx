import { useState } from 'react'
import { Link } from 'react-router'

const items = [
  { label: 'About', to: '/#about' },
  { label: 'Stack', to: '/#stack' },
  { label: 'Work', to: '/#work' },
  { label: 'Contact', to: '/#contact' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return <header className="relative z-15">
    <div className="page-wrap flex h-[76px] items-center justify-between border-b border-white/12">
      <Link className="inline-flex flex-col gap-1 text-sm font-bold leading-none tracking-[.09em]" to="/" onClick={close} aria-label="ConsoleX home">
        <span>CONSOLE<span className="text-accent">X</span></span><small className="font-mono text-[8px] leading-snug tracking-[.08em] text-neutral-500">INDEPENDENT SOFTWARE</small>
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        <nav className="flex items-center gap-7" aria-label="Main navigation">
          {items.map((item) => <Link key={item.label} className="font-mono text-[10px] text-neutral-300 transition-colors hover:text-accent" to={item.to}>{item.label}</Link>)}
        </nav>
        <span className="flex items-center gap-2 font-mono text-[8px] tracking-wide text-neutral-500"><i className="size-[7px] rounded-full bg-accent" /> CONSOLEX / PORTFOLIO</span>
      </div>
      <button className="inline-flex items-center gap-3 border border-white/20 bg-transparent px-3 py-2 font-mono text-[9px] uppercase md:hidden" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
        <span>{open ? 'Close' : 'Menu'}</span><span className="text-lg leading-none text-accent" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
    </div>
    <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} className="absolute left-6 right-6 top-[75px] z-20 border border-white/20 bg-[#101111] px-5 py-2 md:hidden">
      {items.map((item) => <Link key={item.label} className="flex justify-between border-b border-white/10 py-4 text-lg last:border-b-0" to={item.to} onClick={close}>{item.label}<span className="text-accent" aria-hidden="true">↗</span></Link>)}
    </nav>
  </header>
}
