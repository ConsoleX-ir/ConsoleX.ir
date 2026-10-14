import { cn } from '../../lib/utils'

/** Typographic ConsoleX wordmark — no logo asset exists publicly, so the
 *  brand renders as set type with the X in signal red and a register square. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-1.5 font-sans text-xl font-bold tracking-tight',
        className,
      )}
    >
      Console<span className="text-red">X</span>
      <span aria-hidden="true" className="mb-0.5 inline-block h-[5px] w-[5px] bg-red" />
    </span>
  )
}
