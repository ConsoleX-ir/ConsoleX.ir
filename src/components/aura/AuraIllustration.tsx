/**
 * Aura Player — large original illustration of the player concept.
 * Clearly stylized (labeled as an illustration, never a screenshot):
 * library sidebar, album disc, transport bar and a live equalizer.
 */
export default function AuraIllustration() {
  const libRows = [1, 2, 3, 4, 5];
  return (
    <div className="rounded-3xl border border-cx-border bg-cx-bg-2 p-5 sm:p-8 md:p-12">
      <div className="overflow-hidden rounded-2xl border border-cx-border bg-white shadow-[0_24px_60px_-24px_rgba(37,99,235,0.25)]">
        <div className="grid sm:grid-cols-[220px_1fr]">
          {/* sidebar / library */}
          <div className="hidden border-r border-cx-ink-line bg-cx-bg-2/60 p-5 sm:block">
            <div className="mb-5 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="block h-4 w-4 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 32% 28%, #bae6fd 0%, #38bdf8 48%, #2563eb 100%)",
                }}
              />
              <span className="font-display text-xs font-semibold text-cx-text">
                Aura
              </span>
            </div>
            <p className="font-mono2 mb-3 text-[9px] tracking-[0.18em] text-cx-text-3">
              LIBRARY
            </p>
            <div className="space-y-2.5">
              {libRows.map((row) => (
                <div key={row} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`block h-6 w-6 shrink-0 rounded-md ${
                      row === 2
                        ? "bg-gradient-to-br from-sky-300 to-blue-600"
                        : "bg-cx-surface"
                    }`}
                  />
                  <div className="flex-1 space-y-1.5">
                    <span
                      aria-hidden="true"
                      className={`block h-1.5 rounded-full ${
                        row === 2 ? "bg-cx-accent/70" : "bg-cx-border"
                      }`}
                      style={{ width: `${88 - row * 9}%` }}
                    />
                    <span
                      aria-hidden="true"
                      className="block h-1.5 w-1/3 rounded-full bg-cx-ink-line"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="font-mono2 mb-3 mt-6 text-[9px] tracking-[0.18em] text-cx-text-3">
              PLAYLISTS
            </p>
            <div className="space-y-2">
              <span aria-hidden="true" className="block h-1.5 w-4/5 rounded-full bg-cx-border" />
              <span aria-hidden="true" className="block h-1.5 w-3/5 rounded-full bg-cx-border" />
            </div>
          </div>

          {/* main pane */}
          <div className="p-5 sm:p-7">
            <div className="flex items-start gap-5 sm:gap-7">
              {/* album disc */}
              <div className="relative h-28 w-28 shrink-0 sm:h-36 sm:w-36">
                <div
                  aria-hidden="true"
                  className="cx-spin absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #2563eb, #38bdf8, #7dd3fc, #2563eb)",
                  }}
                >
                  <span className="absolute inset-[18%] rounded-full border border-white/40" />
                  <span className="absolute inset-[34%] rounded-full border border-white/50" />
                </div>
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-cx-accent"
                />
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <p className="font-mono2 text-[9px] tracking-[0.18em] text-cx-text-3">
                  NOW PLAYING
                </p>
                <span aria-hidden="true" className="mt-3 block h-2.5 w-3/4 rounded-full bg-cx-text/85" />
                <span aria-hidden="true" className="mt-2 block h-2 w-1/2 rounded-full bg-cx-border" />
                {/* progress */}
                <div className="mt-5 flex items-center gap-3">
                  <span className="font-mono2 text-[9px] text-cx-text-3">1:47</span>
                  <span aria-hidden="true" className="relative block h-1 flex-1 rounded-full bg-cx-border">
                    <span className="absolute left-0 top-0 h-full w-[42%] rounded-full bg-gradient-to-r from-cx-accent to-cx-glow" />
                    <span className="absolute left-[42%] top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow ring-2 ring-cx-accent" />
                  </span>
                  <span className="font-mono2 text-[9px] text-cx-text-3">4:12</span>
                </div>
                {/* transport */}
                <div className="mt-5 flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-cx-border text-[9px] text-cx-text-2">◀◀</span>
                  <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-cx-accent text-white shadow-lg shadow-blue-500/30">
                    <span className="ml-0.5 block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
                  </span>
                  <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-cx-border text-[9px] text-cx-text-2">▶▶</span>
                  <span aria-hidden="true" className="ml-auto hidden h-1 w-16 rounded-full bg-cx-border sm:block">
                    <span className="block h-full w-2/3 rounded-full bg-cx-accent/70" />
                  </span>
                </div>
              </div>
            </div>

            {/* equalizer strip */}
            <div className="mt-7 flex h-16 items-end gap-1.5 rounded-xl border border-cx-ink-line bg-cx-bg-2/70 px-4 pb-3 pt-2">
              {Array.from({ length: 22 }).map((_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={`cx-eq-bar block flex-1 rounded-t-sm ${
                    i % 4 === 0 ? "bg-cx-accent/80" : "bg-cx-glow/50"
                  }`}
                  style={
                    {
                      "--d": `${(i % 7) * 130}ms`,
                      height: `${28 + ((i * 37) % 62)}%`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
