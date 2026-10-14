import type { Project } from '../../data/site'
import { useReveal } from '../../lib/useReveal'
import { cn } from '../../lib/utils'
import { StatusTag } from '../ui/StatusTag'

interface ProjectRowProps {
  project: Project
  last?: boolean
}

/** Compact index row (Nexus, Veil) — planned projects with no assets yet. */
export function ProjectRow({ project, last }: ProjectRowProps) {
  const ref = useReveal<HTMLElement>({ y: 24 })

  return (
    <article
      ref={ref}
      aria-label={`${project.name} — ${project.type} — ${project.statusLabel.toLowerCase()}`}
      className={cn(
        'group border-t border-line transition-colors duration-300 hover:bg-surface',
        last && 'border-b',
      )}
    >
      <div className="grid grid-cols-[auto_1fr] items-start gap-x-5 py-8 transition-transform duration-300 ease-swift group-hover:translate-x-2 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-x-8 md:py-9 md:px-2">
        <span className="font-mono text-micro uppercase text-red">{project.index}</span>

        <div>
          <h3 className="text-3xl font-semibold uppercase tracking-tight text-ink md:text-4xl">
            {project.displayName}
            <span className="ml-4 align-middle font-mono text-micro font-normal normal-case tracking-normal text-faint">
              {project.type}
            </span>
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-dim">{project.description}</p>
        </div>

        <div className="col-span-2 mt-4 md:col-span-1 md:col-start-3 md:mt-0 md:justify-self-end">
          <StatusTag status={project.status} label={project.statusLabel} />
        </div>
      </div>
    </article>
  )
}
