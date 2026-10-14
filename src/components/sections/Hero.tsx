"use client";

import LiquidGlass from "@/components/visuals/LiquidGlass";
import { useGelFormDone } from "@/hooks/useGelFormDone";
import { site } from "@/data/site";

/**
 * Hero — establishes ConsoleX immediately: headline, honest description,
 * a clear path to the work, and the signature liquid element behind it.
 */

function Stagger({
  on,
  delay,
  className = "",
  children,
}: {
  on: boolean;
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        on ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Hero({ reducedMotion }: { reducedMotion: boolean }) {
  const gelDone = useGelFormDone();
  const on = reducedMotion || gelDone;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="Introduction"
    >
      <LiquidGlass />

      <div className="container-cx relative z-10 w-full pb-28 pt-32 md:pb-32 md:pt-40">
        <div className="max-w-2xl">
          <Stagger on={on} delay={0}>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="cx-pulse inline-block h-1.5 w-1.5 rounded-full bg-cx-accent"
              />
              Independent software studio
            </p>
          </Stagger>

          <h1 className="font-display text-[2.7rem] font-semibold leading-[1.04] tracking-tight text-cx-text sm:text-6xl lg:text-[4.5rem]">
            <Stagger on={on} delay={90}>
              <span className="block">Independent software,</span>
            </Stagger>
            <Stagger on={on} delay={180}>
              <span className="block">
                built with <span className="text-cx-accent">curiosity.</span>
              </span>
            </Stagger>
          </h1>

          <Stagger on={on} delay={300}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-cx-text-2 md:text-lg">
              ConsoleX designs and engineers desktop applications and
              interactive experiments — from Aura Player, a desktop music
              player, to concepts in 3D and multiplayer. Every project is
              built end to end and labeled honestly at every stage.
            </p>
          </Stagger>

          <Stagger on={on} delay={420}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-cx-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-cx-accent-deep hover:shadow-lg hover:shadow-blue-500/20"
              >
                Selected work
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
              {site.links.github ? (
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cx-border bg-white/70 px-6 py-3 text-sm font-medium text-cx-text backdrop-blur transition-colors hover:border-cx-accent hover:text-cx-accent"
                >
                  GitHub ↗
                </a>
              ) : (
                <a
                  href="#lab"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cx-border bg-white/70 px-6 py-3 text-sm font-medium text-cx-text backdrop-blur transition-colors hover:border-cx-accent hover:text-cx-accent"
                >
                  Visit the lab
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </Stagger>
        </div>
      </div>

      {/* scroll cue */}
      <Stagger
        on={on}
        delay={650}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:bottom-10"
      >
        <div
          className="flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-mono2 text-[10px] tracking-[0.2em] text-cx-text-3">
            SCROLL
          </span>
          <span className="relative block h-9 w-px overflow-hidden bg-cx-border">
            {!reducedMotion && (
              <span
                className="absolute left-0 top-0 h-3 w-px bg-cx-accent"
                style={{
                  animation: "cx-scroll-cue 1.8s ease-in-out infinite",
                }}
              />
            )}
          </span>
        </div>
      </Stagger>

      <style>{`
        @keyframes cx-scroll-cue {
          0% { transform: translateY(-100%); }
          60% { transform: translateY(300%); }
          100% { transform: translateY(300%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cx-scroll-cue { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
