import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ArrowLinkProps {
  href: string
  children: ReactNode
  external?: boolean
  className?: string
  ariaLabel?: string
}

/** Technical link with a growing red underline and a nudging arrow. */
export function ArrowLink({ href, children, external, className, ariaLabel }: ArrowLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn(
        'group inline-flex items-center gap-2 font-mono text-label uppercase text-ink transition-colors duration-300 hover:text-red',
        className,
      )}
    >
      <span className="relative py-1">
        {children}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-red transition-transform duration-300 ease-swift group-hover:scale-x-100"
        />
      </span>
      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={1.5}
        className="h-3.5 w-3.5 transition-transform duration-300 ease-swift group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  )
}
