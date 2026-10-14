import type { MouseEvent, ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface GhostButtonProps {
  href?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  children: ReactNode
  className?: string
  ariaLabel?: string
  external?: boolean
}

/** The counterpoint to the gel button: sharp, bordered, monochrome. */
export function GhostButton({ href, onClick, children, className, ariaLabel, external }: GhostButtonProps) {
  const shared = cn(
    'group relative inline-flex items-center justify-center gap-2.5 border border-line px-8 py-4 font-mono text-label uppercase text-ink transition-colors duration-300 hover:border-red hover:text-red active:scale-[0.97]',
    className,
  )
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="absolute -left-px -top-px h-1.5 w-1.5 bg-red opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </>
  )
  return href ? (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={shared}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={shared}>
      {inner}
    </button>
  )
}
