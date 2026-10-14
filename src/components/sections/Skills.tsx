"use client";

import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/layout/SectionHead";
import { skillGroups } from "@/data/skills";

/**
 * Capabilities — a typographic, categorized system (no logo wall, no bars).
 * ● = primary focus, proven in shipped work · ○ = working knowledge
 */
export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20" aria-label="Skills and technologies">
      <div className="container-cx py-24 md:py-36">
        <SectionHead
          index="02"
          title="Capabilities"
          note="Mapped honestly"
        />

        <div className="mt-14 md:mt-20">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-display max-w-lg text-2xl font-medium tracking-tight text-cx-text md:text-3xl">
                The stack behind the projects
              </h2>
              <p className="font-mono2 text-[11px] tracking-wide text-cx-text-3">
                <span aria-hidden="true" className="text-cx-accent">
                  ●
                </span>{" "}
                primary focus
                <span aria-hidden="true" className="mx-3 text-cx-border">
                  |
                </span>
                <span aria-hidden="true" className="text-cx-text-3">
                  ○
                </span>{" "}
                working knowledge
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group, gi) => (
              <Reveal key={group.label} delay={gi * 90}>
                <div>
                  <p className="font-mono2 mb-5 text-[11px] uppercase tracking-[0.16em] text-cx-text-3">
                    {group.label}
                  </p>
                  <ul className="space-y-3.5">
                    {group.skills.map((skill) => (
                      <li key={skill.name} className="group flex items-baseline gap-3">
                        <span
                          aria-hidden="true"
                          className={`mt-[-1px] inline-block h-[7px] w-[7px] shrink-0 rounded-full ${
                            skill.level === "primary"
                              ? "bg-cx-accent"
                              : "border-[1.5px] border-cx-text-3 bg-transparent"
                          }`}
                        />
                        <span className="font-display text-[15px] font-medium text-cx-text transition-colors group-hover:text-cx-accent">
                          {skill.name}
                          {skill.note ? (
                            <span className="font-mono2 ml-2 text-[11px] font-normal text-cx-text-3">
                              {skill.note}
                            </span>
                          ) : null}
                        </span>
                        <span className="sr-only">
                          {skill.level === "primary"
                            ? "primary focus"
                            : "working knowledge"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-14 max-w-xl border-t border-cx-ink-line pt-6 text-sm leading-relaxed text-cx-text-2">
              Familiarity is deliberately uneven — the daily drivers are the
              ones the shipped projects actually use, and the rest is stated
              as working knowledge rather than pretended mastery.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
