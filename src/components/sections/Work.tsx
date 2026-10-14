"use client";

import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/layout/SectionHead";
import { ProjectArt } from "@/components/visuals/ProjectArt";
import { projects, type Project } from "@/data/projects";

/**
 * Selected Work — the main content experience.
 * Editorial, asymmetric rows with large ordinals and original artwork;
 * statuses are honest and visually distinct (pulsing vs. hollow).
 */

function StatusChip({ project }: { project: Project }) {
  const active = project.status === "in-development";
  return (
    <p className="font-mono2 inline-flex items-center gap-2.5 text-[11px] tracking-[0.12em] text-cx-text-2">
      {active ? (
        <span
          aria-hidden="true"
          className="cx-pulse inline-block h-1.5 w-1.5 rounded-full bg-cx-accent"
        />
      ) : (
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 rounded-full border-[1.5px] border-cx-text-3"
        />
      )}
      {active ? "IN DEVELOPMENT" : "PLANNED"}
      <span aria-hidden="true" className="text-cx-border">
        ·
      </span>
      <span className="text-cx-text-3">{project.statusLabel.split("·")[1]?.trim()}</span>
    </p>
  );
}

function WorkRow({ project, flip }: { project: Project; flip: boolean }) {
  const art = (
    <div
      className={`group/art relative overflow-hidden rounded-3xl border border-cx-border bg-cx-bg-2 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 ${
        project.status === "planned" ? "opacity-80" : ""
      }`}
    >
      <div className="aspect-[16/10] p-6 sm:p-10">
        <ProjectArt kind={project.art} />
      </div>
      {project.hasDetailPage ? (
        <span className="font-mono2 absolute bottom-4 right-5 text-[11px] tracking-wide text-cx-text-3 transition-colors group-hover/art:text-cx-accent">
          open project →
        </span>
      ) : null}
    </div>
  );

  return (
    <article className="relative border-t border-cx-border py-14 last:border-b md:py-20">
      <div
        aria-hidden="true"
        className="ghost-num font-display pointer-events-none absolute -top-2 right-0 select-none text-[6rem] font-semibold leading-none md:-top-6 md:text-[9rem]"
      >
        {project.index}
      </div>

      <div className="relative grid items-center gap-10 md:grid-cols-12 md:gap-12">
        {/* text column */}
        <div className={`md:col-span-5 ${flip ? "md:order-2" : ""}`}>
          <Reveal>
            <p className="font-mono2 mb-4 text-[11px] tracking-[0.16em] text-cx-text-3">
              {project.category.toUpperCase()}
            </p>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-cx-text md:text-[2.5rem] md:leading-tight">
              {project.hasDetailPage ? (
                <a
                  href="#/projects/aura-player"
                  className="link-sweep hover:text-cx-accent"
                >
                  {project.name}
                </a>
              ) : (
                project.name
              )}
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cx-text-2">
              {project.description}
            </p>
            <div className="mt-6">
              <StatusChip project={project} />
            </div>
            {project.stack.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="font-mono2 rounded-full border border-cx-border bg-white px-3 py-1.5 text-[11px] text-cx-text-2"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-mono2 mt-5 text-[11px] text-cx-text-3">
                stack: to be chosen when the concept earns it
              </p>
            )}
            {project.hasDetailPage ? (
              <a
                href="#/projects/aura-player"
                className="group mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-cx-accent"
              >
                <span className="link-sweep">Open the Aura Player project</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            ) : null}
          </Reveal>
        </div>

        {/* art column */}
        <div className={`md:col-span-7 ${flip ? "md:order-1" : ""}`}>
          <Reveal delay={140}>
            {project.hasDetailPage ? (
              <a
                href="#/projects/aura-player"
                aria-label={`Open the ${project.name} project page`}
                className="block rounded-3xl focus-visible:outline-offset-4"
              >
                {art}
              </a>
            ) : (
              <div aria-hidden="true">{art}</div>
            )}
          </Reveal>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="scroll-mt-20" aria-label="Selected work">
      <div className="container-cx py-24 md:py-36">
        <SectionHead index="03" title="Selected work" note="All four of them" />
        <div className="mt-14 md:mt-20">
          <Reveal>
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-display max-w-xl text-2xl font-medium tracking-tight text-cx-text md:text-3xl">
                Four projects, honestly labeled
              </h2>
              <p className="font-mono2 text-[11px] tracking-wide text-cx-text-3">
                2 in development · 2 planned
              </p>
            </div>
          </Reveal>
          <div>
            {projects.map((project, i) => (
              <WorkRow key={project.id} project={project} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
