import { Fragment } from 'react'
import { cn } from '../../lib/utils'

interface MarqueeProps {
  items: readonly string[]
  className?: string
}

/**
 * Marquee — an infinite editorial strip. The creed chain runs along it.
 * Pure CSS animation; pauses on hover; freezes under reduced motion.
 * The repeated half is aria-hidden; the accessible name carries the text.
 */
export function Marquee({ items, className }: MarqueeProps) {
  const half = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex w-max shrink-0 items-center">
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <span className="whitespace-nowrap px-6 font-sans text-lg font-semibold uppercase tracking-tight text-ink md:px-10 md:text-2xl">
            {item}
          </span>
          <span aria-hidden="true" className="text-red md:text-2xl">
            →
          </span>
        </Fragment>
      ))}
    </div>
  )

  return (
    <div
      role="img"
      aria-label={`Method chain: ${items.join(', ')}`}
      className={cn('marquee overflow-hidden border-y border-line py-3.5 md:py-4', className)}
    >
      <div className="marquee-track flex w-max">
        {half(false)}
        {half(true)}
      </div>
    </div>
  )
}
