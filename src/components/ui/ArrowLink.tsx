import type { ReactNode } from 'react'
import { Link } from 'react-router'

type ArrowLinkProps = { to: string; children: ReactNode; variant?: 'primary' | 'text' | 'dark'; external?: boolean }

export default function ArrowLink({ to, children, variant = 'text', external = false }: ArrowLinkProps) {
  const className = variant === 'primary'
    ? 'group inline-flex min-h-12 items-center justify-between gap-8 border border-accent bg-accent px-4 font-mono text-[10px] text-white transition-colors hover:border-[#ff554a] hover:bg-[#ff554a] focus-visible:outline-2 focus-visible:outline-accent'
    : `group inline-flex min-h-10 items-center justify-between gap-7 border-b py-2.5 font-mono text-[10px] transition-colors hover:border-accent ${variant === 'dark' ? 'border-black/35 text-ink hover:text-accent' : 'border-white/30 text-neutral-300 hover:text-paper'}`
  const content = <>{children}<span className={`text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${variant === 'primary' ? 'text-white' : ''}`} aria-hidden="true">↗</span></>
  return external
    ? <a className={className} href={to} target="_blank" rel="noreferrer">{content}</a>
    : <Link className={className} to={to}>{content}</Link>
}
