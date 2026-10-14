"use client";

import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/layout/SectionHead";
import { roadmap, roadmapFootnote } from "@/data/roadmap";

export default function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-20" aria-label="Roadmap">
      <div className="container-cx py-24 md:py-36">
        <SectionHead index="05" title="Roadmap" note="No dates attached" />

        <div className="mt-14 md:mt-20">
          <Reveal>
            <h2 className="font-display max-w-xl text-2xl font-medium tracking-tight text-cx-text md:text-3xl">
              Where things are heading
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {roadmap.map((col, ci) => (
              <Reveal key={col.when} delay={ci * 110}>
                <div className="relative border-t-2 border-cx-accent/70 pt-6">
                  <div className="mb-7 flex items-baseline justify-between gap-3">
                    <p className="font-display text-xl font-semibold tracking-tight text-cx-text">
                      {col.when}
                    </p>
                    <p className="font-mono2 text-[11px] tracking-wide text-cx-text-3">
                      {col.hint}
                    </p>
                  </div>
                  <ul className="space-y-7">
                    {col.items.map((item) => (
                      <li key={item.title} className="flex gap-4">
                        <span
                          aria-hidden="true"
                          className={`mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                            item.state === "in-progress"
                              ? "cx-pulse bg-cx-accent"
                              : "border-[1.5px] border-cx-text-3 bg-transparent"
                          }`}
                        />
                        <div>
                          <p className="font-display text-[15px] font-medium leading-snug text-cx-text">
                            {item.title}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-cx-text-2">
                            {item.note}
                          </p>
                          <p className="font-mono2 mt-2.5 text-[10px] tracking-[0.14em] text-cx-text-3">
                            {item.state === "in-progress"
                              ? "IN PROGRESS"
                              : "CONCEPT"}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="font-mono2 mt-16 border-t border-cx-ink-line pt-6 text-xs tracking-wide text-cx-text-3">
              {roadmapFootnote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
