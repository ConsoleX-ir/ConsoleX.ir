import type { ReactNode } from 'react'

type SectionLabelProps = { index: string; children: ReactNode }

export default function SectionLabel({ index, children }: SectionLabelProps) {
  return <p className="mb-0 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.09em] text-neutral-300"><span className="text-accent">{index}</span><i className="h-px w-[30px] bg-neutral-600" aria-hidden="true" />{children}</p>
}
