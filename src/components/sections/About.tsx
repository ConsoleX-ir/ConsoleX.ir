"use client";

import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/layout/SectionHead";

const principles = [
  {
    title: "Ship honestly",
    body: "Every status label on this site reflects the real state of the work — no vaporware, no inflated claims.",
  },
  {
    title: "Craft over volume",
    body: "Few projects, finished properly. Details like typography, motion and material are treated as engineering work.",
  },
  {
    title: "Curiosity is a feature",
    body: "Experiments belong here. The Lab exists because playing with technique is how the serious work gets better.",
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20" aria-label="About ConsoleX">
      <div className="container-cx py-24 md:py-36">
        <SectionHead index="01" title="About" note="Who is building this" />

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-display text-[1.65rem] font-medium leading-[1.28] tracking-tight text-cx-text md:text-[2.35rem]">
                ConsoleX is an independent software brand — a small, ambitious
                home for desktop applications, developer tools and interactive
                experiments, built outside the usual product playbook.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-9 max-w-xl space-y-5 text-base leading-relaxed text-cx-text-2">
                <p>
                  There is no client list and no growth story to perform here.
                  ConsoleX exists because making software carefully is
                  satisfying in itself: sketching an interface, arguing with a
                  shader until the light feels right, and shipping small tools
                  that hold up under daily use.
                </p>
                <p>
                  The portfolio runs the full range — a desktop music player
                  with a shipped baseline, a download manager taking its first
                  steps, and two concepts waiting their turn. What ties them
                  together is one design language and one standard: say what
                  is true about the work, then make the work better.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={200}>
              <p className="eyebrow mb-6">Operating principles</p>
              <ul className="space-y-7">
                {principles.map((p, i) => (
                  <li key={p.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] block h-2 w-2 shrink-0 rounded-[2px] bg-cx-accent"
                      style={{ transform: `rotate(${18 + i * 14}deg)` }}
                    />
                    <div>
                      <p className="font-display text-base font-medium text-cx-text">
                        {p.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-cx-text-2">
                        {p.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 rounded-2xl border border-cx-border bg-cx-bg-2 p-5">
                <p className="font-mono2 flex items-center gap-2.5 text-[11px] tracking-[0.14em] text-cx-text-3">
                  <span
                    aria-hidden="true"
                    className="cx-pulse inline-block h-1.5 w-1.5 rounded-full bg-cx-accent"
                  />
                  CURRENTLY ON THE DESK
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cx-text">
                  Migrating Aura Player from Electron to Wails — rebuilding the
                  desktop shell on Go, one subsystem at a time.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
