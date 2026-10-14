import type { Project } from '../../data/site'
import { useReveal } from '../../lib/useReveal'
import { ArrowLink } from '../ui/ArrowLink'
import { StatusTag } from '../ui/StatusTag'
import { EqualizerVisual } from './EqualizerVisual'

/**
 * ProjectFlagship — the full-width editorial showcase (Aura Player):
 * giant two-line title, meta row, verified feature index, stack chips,
 * and the abstract equalizer panel on the right.
 */
export function ProjectFlagship({ project }: { project: Project }) {
  const rootRef = useReveal<HTMLElement>({ selector: '[data-reveal]', stagger: 0.14 })

  return (
    <article
      ref={rootRef}
      aria-label={`${project.name} — ${project.type}`}
      className="border-t border-line pt-10 md:pt-14"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div data-reveal className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="font-mono text-micro uppercase text-red">{project.index}</span>
            <span className="mono-label">{project.type}</span>
            <StatusTag status={project.status} label={project.statusLabel} meta={project.statusMeta} />
          </div>

          <h3 className="mt-8 font-semibold uppercase leading-[0.85] tracking-tight text-ink">
            <span className="block text-[clamp(3rem,7.2vw,7.5rem)]">{project.displayName}</span>
            {project.outlineLine && (
              <span className="text-outline block text-[clamp(3rem,7.2vw,7.5rem)]">
                {project.outlineLine}
              </span>
            )}
          </h3>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-dim">{project.description}</p>

          {project.features && (
            <div className="mt-9">
              <h4 className="mono-label">Feature index</h4>
              <ul className="mt-4 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {project.features.map((feature, i) => (
                  <li
                    key={feature}
                    className="flex items-baseline gap-3 border-t border-line-soft py-2.5"
                  >
                    <span className="font-mono text-[9px] text-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-snug text-dim">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="border border-line px-3 py-1.5 font-mono text-micro uppercase text-dim"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            {project.repoUrl && (
              <ArrowLink href={project.repoUrl} external>
                Open repository
              </ArrowLink>
            )}
            {project.license && (
              <span className="mono-label">License — {project.license}</span>
            )}
          </div>
        </div>

        <div data-reveal className="lg:col-span-5 lg:pl-4">
          <EqualizerVisual />
        </div>
      </div>
    </article>
  )
}
