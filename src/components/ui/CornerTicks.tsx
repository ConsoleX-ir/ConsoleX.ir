import { cn } from '../../lib/utils'

/** Four red corner ticks — the surveyor frame used on feature panels. */
export function CornerTicks({ className }: { className?: string }) {
  const base = 'absolute h-2.5 w-2.5 border-red transition-opacity duration-300'
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
      <span className={cn(base, 'left-0 top-0 border-l border-t')} />
      <span className={cn(base, 'right-0 top-0 border-r border-t')} />
      <span className={cn(base, 'bottom-0 left-0 border-b border-l')} />
      <span className={cn(base, 'bottom-0 right-0 border-b border-r')} />
    </div>
  )
}
