"use client";

import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/layout/SectionHead";
import { site } from "@/data/site";

/**
 * Contact — data-driven by design.
 * Channels render ONLY when a verified URL exists in src/data/site.ts.
 * No "#" hrefs, no invented destinations — ever.
 */
export default function Contact() {
  const channels = [
    { label: "GitHub", url: site.links.github, hint: "code, releases, issues" },
    { label: "Email", url: site.links.email, hint: "the direct line" },
  ].filter((c) => Boolean(c.url));

  return (
    <section id="contact" className="scroll-mt-20" aria-label="Contact">
      <div className="container-cx py-24 md:py-36">
        <SectionHead index="06" title="Contact" note="The honest part" />

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="font-display text-5xl font-semibold tracking-tight text-cx-text md:text-7xl">
                Say{" "}
                <span className="relative inline-block text-cx-accent">
                  hello.
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-0 h-1.5 w-full rounded-full bg-cx-glow/50"
                  />
                </span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-cx-text-2 md:text-lg">
                Feedback on the projects, ideas worth arguing about, or a
                reason to build something together — the door is open.
                Public channels appear below only once they are verified, so
                this section stays as honest as the rest of the site.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            {channels.length > 0 ? (
              <Reveal delay={200}>
                <ul className="space-y-4">
                  {channels.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.url}
                        target={c.url.startsWith("http") ? "_blank" : undefined}
                        rel={
                          c.url.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group flex min-h-14 items-center justify-between rounded-2xl border border-cx-border bg-white px-6 py-4 transition-all hover:border-cx-accent hover:shadow-lg hover:shadow-blue-500/10"
                      >
                        <span className="font-display text-lg font-medium text-cx-text group-hover:text-cx-accent">
                          {c.label}
                        </span>
                        <span className="font-mono2 text-[11px] text-cx-text-3">
                          {c.hint}
                          <span
                            aria-hidden="true"
                            className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cx-accent"
                          >
                            ↗
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : (
              <Reveal delay={200}>
                <div className="rounded-2xl border border-dashed border-cx-border bg-cx-bg-2 p-6">
                  <p className="font-mono2 text-[11px] tracking-[0.14em] text-cx-text-3">
                    CHANNELS PENDING VERIFICATION
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-cx-text-2">
                    No public contact destinations have been verified yet, so
                    none are shown — this section refuses to link to anything
                    fake. The channel list is data-driven and will fill in the
                    moment real URLs are supplied.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
