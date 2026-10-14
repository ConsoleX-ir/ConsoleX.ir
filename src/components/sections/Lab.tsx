"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/layout/SectionHead";
import GelToy from "@/components/sections/lab/GelToy";
import Interference from "@/components/sections/lab/Interference";
import KineticType from "@/components/sections/lab/KineticType";

function LabCard({
  name,
  caption,
  reducedMotion,
  children,
}: {
  name: string;
  caption: string;
  reducedMotion: boolean;
  children: ReactNode;
}) {
  return (
    <Reveal className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-cx-border bg-white transition-shadow duration-500 hover:shadow-xl hover:shadow-blue-500/10">
        <div className="flex items-center justify-between border-b border-cx-ink-line px-5 py-3.5">
          <p className="font-mono2 text-[11px] tracking-[0.14em] text-cx-text-2">
            {name.toUpperCase()}
          </p>
          <p className="font-mono2 flex items-center gap-2 text-[10px] tracking-wider text-cx-text-3">
            <span
              aria-hidden="true"
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                reducedMotion ? "border border-cx-text-3" : "cx-pulse bg-emerald-500"
              }`}
            />
            {reducedMotion ? "STATIC PREVIEW" : "LIVE"}
          </p>
        </div>
        <div className="border-b border-cx-ink-line">{children}</div>
        <p className="flex-1 px-5 py-4 text-[13px] leading-relaxed text-cx-text-2">
          {caption}
        </p>
      </article>
    </Reveal>
  );
}

export default function Lab({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section
      id="lab"
      className="scroll-mt-20 border-y border-cx-border bg-cx-bg-2"
      aria-label="Lab experiments"
    >
      <div className="container-cx py-24 md:py-36">
        <SectionHead index="04" title="Lab" note="Actually running" />

        <div className="mt-14 md:mt-20">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-display max-w-xl text-2xl font-medium tracking-tight text-cx-text md:text-3xl">
                Small experiments, live in your browser
              </h2>
              <p className="font-mono2 max-w-[240px] text-right text-[11px] leading-relaxed tracking-wide text-cx-text-3">
                nothing mocked — every panel below is real code reacting to you
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            <LabCard
              name="Gel toy"
              caption="The signature material, miniaturized — stir it with your pointer and watch the blobs chase, merge and snap back."
              reducedMotion={reducedMotion}
            >
              <GelToy reducedMotion={reducedMotion} />
            </LabCard>
            <LabCard
              name="Interference"
              caption="Two drifting wave sources overlap; your pointer becomes a third. A 140×96 buffer, upscaled — physics for pennies."
              reducedMotion={reducedMotion}
            >
              <Interference reducedMotion={reducedMotion} />
            </LabCard>
            <LabCard
              name="Kinetic type"
              caption="Letters with springs. Get close and they dodge; step back and they settle home like nothing happened."
              reducedMotion={reducedMotion}
            >
              <KineticType reducedMotion={reducedMotion} />
            </LabCard>
          </div>
        </div>
      </div>
    </section>
  );
}
