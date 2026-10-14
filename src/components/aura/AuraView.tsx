"use client";

import Reveal from "@/components/motion/Reveal";
import AuraIllustration from "@/components/aura/AuraIllustration";
import { aura } from "@/data/aura";
import { site } from "@/data/site";

/**
 * Aura Player detail view — a designed page with its own content rhythm,
 * sharing the site's design system. Reached via #/projects/aura-player
 * (deep-linkable, back/forward safe); see useHashRoute for routing notes.
 */
export default function AuraView({
  onNavigateHome,
}: {
  onNavigateHome: (anchor?: string) => void;
}) {
  return (
    <article className="cx-view-enter">
      {/* header band */}
      <header className="border-b border-cx-border bg-gradient-to-b from-cx-bg-2 to-white">
        <div className="container-cx pb-16 pt-32 md:pb-20 md:pt-44">
          <Reveal>
            <p className="eyebrow mb-8 flex items-center gap-3">
              <span className="text-cx-accent">Project 01</span>
              <span aria-hidden="true" className="h-px w-10 bg-cx-border" />
              {aura.category}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-5xl font-semibold tracking-tight text-cx-text sm:text-6xl md:text-8xl">
              Aura{" "}
              <span className="bg-gradient-to-r from-cx-accent to-cx-glow bg-clip-text text-transparent">
                Player
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cx-text-2">
              {aura.tagline}
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p className="font-mono2 mt-8 inline-flex items-center gap-2.5 rounded-full border border-cx-border bg-white px-4 py-2 text-[11px] tracking-[0.12em] text-cx-text-2">
              <span
                aria-hidden="true"
                className="cx-pulse inline-block h-1.5 w-1.5 rounded-full bg-cx-accent"
              />
              {aura.statusLabel.toUpperCase()}
            </p>
          </Reveal>

          <Reveal delay={340}>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cx-border bg-cx-border lg:grid-cols-4">
              {aura.meta.map((m) => (
                <div key={m.label} className="bg-white p-5">
                  <dt className="font-mono2 text-[10px] uppercase tracking-[0.16em] text-cx-text-3">
                    {m.label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-snug text-cx-text">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </header>

      {/* illustration */}
      <div className="container-cx pt-14 md:pt-20">
        <Reveal>
          <AuraIllustration />
          <p className="font-mono2 mt-4 text-center text-[11px] tracking-wide text-cx-text-3">
            {aura.illustrationCaption}
          </p>
        </Reveal>
      </div>

      {/* overview */}
      <section aria-label="Overview" className="container-cx py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <p className="eyebrow md:sticky md:top-28">Overview</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <div className="space-y-6">
              {aura.overview.map((para, i) => (
                <Reveal key={i} delay={i * 90}>
                  <p
                    className={`leading-relaxed text-cx-text-2 ${
                      i === 0
                        ? "font-display text-xl leading-relaxed text-cx-text md:text-2xl"
                        : "text-base"
                    }`}
                  >
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* verified capabilities */}
      <section
        aria-label="What it does"
        className="border-y border-cx-border bg-cx-bg-2"
      >
        <div className="container-cx py-20 md:py-28">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight text-cx-text md:text-3xl">
              What it does — verified
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-12">
            {aura.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="border-t border-cx-border pt-6">
                  <p className="font-mono2 text-[11px] text-cx-accent">
                    0{i + 1}
                  </p>
                  <p className="font-display mt-3 text-lg font-medium text-cx-text">
                    {f.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-cx-text-2">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* under the hood */}
      <section aria-label="Under the hood" className="container-cx py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <p className="eyebrow md:sticky md:top-28">Under the hood</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            {aura.underTheHood.map((para, i) => (
              <Reveal key={i} delay={i * 90}>
                <p
                  className={`leading-relaxed ${
                    i === 0
                      ? "mb-6 text-lg text-cx-text"
                      : "text-base text-cx-text-2"
                  }`}
                >
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal delay={180}>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="font-mono2 mb-4 text-[11px] tracking-[0.14em] text-cx-text-3">
                    SHIPPED STACK
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {aura.stackToday.map((t) => (
                      <li
                        key={t}
                        className="font-mono2 rounded-full border border-cx-border bg-white px-3.5 py-1.5 text-[11px] text-cx-text-2"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono2 mb-4 text-[11px] tracking-[0.14em] text-cx-text-3">
                    MIGRATION TARGET — IN PROGRESS
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {aura.stackMigration.map((t) => (
                      <li
                        key={t}
                        className="font-mono2 rounded-full border border-dashed border-cx-accent/50 bg-cx-surface px-3.5 py-1.5 text-[11px] text-cx-accent"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-12 rounded-2xl border border-cx-border bg-cx-bg-2 p-6 md:p-8">
                <p className="font-mono2 flex items-center gap-2.5 text-[11px] tracking-[0.14em] text-cx-text-3">
                  <span
                    aria-hidden="true"
                    className="cx-pulse inline-block h-1.5 w-1.5 rounded-full bg-cx-accent"
                  />
                  WHERE IT STANDS
                </p>
                <p className="mt-4 text-sm leading-relaxed text-cx-text-2">
                  v3.2.0 is the published baseline. The Wails migration is
                  active development — it is not complete, and no release date
                  is promised. This page is updated as milestones actually
                  land, not before.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10">
                {site.links.github ? (
                  <a
                    href={site.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cx-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-cx-accent-deep"
                  >
                    View the repository ↗
                  </a>
                ) : (
                  <p className="font-mono2 rounded-xl border border-dashed border-cx-border px-5 py-4 text-xs leading-relaxed text-cx-text-3">
                    {aura.linksNote}
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* bottom return path */}
      <footer className="border-t border-cx-border">
        <div className="container-cx flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => onNavigateHome("work")}
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-cx-text"
          >
            <span
              aria-hidden="true"
              className="text-cx-accent transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            <span className="link-sweep">Back to all projects</span>
          </button>
          <p className="font-mono2 text-[11px] tracking-wide text-cx-text-3">
            NEXT UP · VELO — DOWNLOAD MANAGER
          </p>
        </div>
      </footer>
    </article>
  );
}
