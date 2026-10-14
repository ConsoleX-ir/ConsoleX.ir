import { useEffect, useState, type ReactNode } from 'react'
import { cn, supportsBackdropFilterUrl } from '../../lib/utils'

interface LiquidLensProps {
  children?: ReactNode
  className?: string
  /** show the drifting red orb inside the lens */
  orb?: boolean
}

/**
 * LiquidLens — the "glass material" demonstration surface.
 *
 * Chromium: `backdrop-filter: url(#cx-lens-displace)` performs a real
 * displacement refraction of whatever sits behind the panel (the orb and
 * typography below it bend at the rim).
 * Safari / Firefox: the same element falls back to a frosted-glass
 * material (blur + saturate) — same geometry, no false claims.
 * `prefers-reduced-transparency` collapses it to an elevated solid.
 */
export function LiquidLens({ children, className, orb = true }: LiquidLensProps) {
  const [refract, setRefract] = useState(false)

  useEffect(() => {
    // Refraction only makes sense when the displacement filter exists;
    // give the filter definition a beat to mount its canvas map first.
    if (!supportsBackdropFilterUrl()) return
    const id = window.requestAnimationFrame(() => setRefract(true))
    return () => window.cancelAnimationFrame(id)
  }, [])

  return (
    <div
      className={cn('lens relative overflow-hidden rounded-2xl', refract && 'lens--refract', className)}
      data-lens={refract ? 'refraction' : 'frosted'}
    >
      {orb && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 animate-orb rounded-full"
          style={{
            background:
              'radial-gradient(circle at 38% 34%, #ff5a4e 0%, #e63228 42%, #7a120c 78%, #300503 100%)',
            filter: 'blur(2px)',
          }}
        />
      )}
      {/* faint scan texture inside the glass */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.028) 0px, rgba(255,255,255,0.028) 1px, transparent 1px, transparent 4px)',
        }}
      />
      {children}
    </div>
  )
}
