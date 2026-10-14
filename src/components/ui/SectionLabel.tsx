import { cn } from '../../lib/utils'

interface SectionLabelProps {
  num: string
  label: string
  annotation?: string
  className?: string
}

/** Editorial section opener: [index] — label — rule — annotation, plus a
 *  faint architectural numeral for the desktop composition. */
export function SectionLabel({ num, label, annotation, className }: SectionLabelProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-micro uppercase text-red">[{num}]</span>
        <span className="mono-label text-ink">{label}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        {annotation && (
          <span className="mono-label hidden md:block">{annotation}</span>
        )}
      </div>
      <span
        aria-hidden="true"
        className="ghost-numeral absolute -top-14 right-0 hidden select-none text-[10rem] lg:block"
      >
        {num}
      </span>
    </div>
  )
}
