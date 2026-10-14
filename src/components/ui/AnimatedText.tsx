import { cn } from '../../lib/utils'

interface SplitLineProps {
  text: string
  className?: string
  charClassName?: string
}

/**
 * Splits a line into per-character masks for the staggered entrance.
 * Accessible: the plain string is exposed to assistive tech via sr-only,
 * the decorative characters are aria-hidden.
 */
export function SplitLine({ text, className, charClassName }: SplitLineProps) {
  return (
    <span className={cn('block', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span data-char className={cn('inline-block will-change-transform', charClassName)}>
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          </span>
        ))}
      </span>
    </span>
  )
}
