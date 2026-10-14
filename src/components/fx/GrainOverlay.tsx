const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")"

/**
 * GrainOverlay — static film grain for the cinematic texture.
 * A single tiled SVG turbulence image: zero animation loops, zero cost
 * after first paint. Honors prefers-reduced-transparency by fading out.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] motion-reduce:opacity-0"
      style={{ backgroundImage: GRAIN_URI, backgroundSize: '180px 180px' }}
    />
  )
}
