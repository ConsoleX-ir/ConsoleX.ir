import type { Project } from '../../data/site'
import { useReveal } from '../../lib/useReveal'
import { cn } from '../../lib/utils'
import { ArrowLink } from '../ui/ArrowLink'
import { CornerTicks } from '../ui/CornerTicks'
import { StatusTag } from '../ui/StatusTag'

interface ProjectPanelProps {
  project: Project
  className?: string
}

/** Mid-size asymmetric entry (TaskFlow, Velo) — panel layout with hover ticks. */
export function ProjectPanel({ project, className }: ProjectPanelProps) {
  const ref = useReveal<HTMLElement>()

  return (
    <article
      ref={ref}
      aria-label={`${project.name} — ${project.type}`}
      className={cn('group relative flex flex-col pt-2', className)}
    >
      <CornerTicks className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
        <span className="font-mono text-micro uppercase text-red transition-transform duration-300 ease-swift group-hover:translate-x-1">
          {project.index}
        </span>
        <span className="mono-label">{project.type}</span>
      </div>

      <h3 className="mt-6 font-semibold uppercase leading-[0.9] tracking-tight text-ink">
        <span className="block text-[clamp(2rem,3.4vw,3.4rem)]">{project.displayName}</span>
        {project.outlineLine && (
          <span className="text-outline block text-[clamp(2rem,3.4vw,3.4rem)]">
            {project.outlineLine}
          </span>
        )}
      </h3>

      <div className="mt-5">
        <StatusTag status={project.status} label={project.statusLabel} />
      </div>

      <p className="mt-6 max-w-xl text-base leading-relaxed text-dim">{project.description}</p>

      <div className="mt-6">
        {project.stack.length > 0 ? (
          <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="border border-line px-3 py-1.5 font-mono text-micro uppercase text-dim"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-mono text-micro uppercase text-faint">{project.stackNote}</p>
        )}
      </div>

      <div className="mt-auto pt-8">
        {project.repoUrl ? (
          <ArrowLink href={project.repoUrl} external>
            Open repository
          </ArrowLink>
        ) : (
          <span className="font-mono text-label uppercase text-faint">Repository — upon release</span>
        )}
      </div>
    </article>
  )
}
