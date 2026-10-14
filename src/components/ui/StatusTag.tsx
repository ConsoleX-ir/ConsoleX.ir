import { cn } from '../../lib/utils'
import type { ProjectStatus } from '../../data/site'

const DOT: Record<ProjectStatus, string> = {
  live: 'bg-red animate-pulse',
  shipped: 'bg-ink',
  planned: 'border border-dim bg-transparent',
}

interface StatusTagProps {
  status: ProjectStatus
  label: string
  meta?: string
  className?: string
}

/** Mono status chip — pulsing dot only for LIVE, per the motion budget. */
export function StatusTag({ status, label, meta, className }: StatusTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 border border-line bg-surface px-3 py-1.5',
        className,
      )}
    >
      <span aria-hidden="true" className={cn('h-[7px] w-[7px] rounded-full', DOT[status])} />
      <span className="font-mono text-micro uppercase text-ink">{label}</span>
      {meta && (
        <span className="font-mono text-micro uppercase text-faint">— {meta}</span>
      )}
    </span>
  )
}
