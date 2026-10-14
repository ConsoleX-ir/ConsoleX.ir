import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion'

/**
 * GeometricBackground — the architectural layer behind the whole page.
 * Asymmetric hairlines, edge ticks, two drifting survey crosshairs and a
 * single red diagonal. Transform-only motion, heavily throttled in cost.
 */
export function GeometricBackground() {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.to('.bg-drift-a', {
        x: 30,
        y: -20,
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      gsap.to('.bg-drift-b', {
        x: -24,
        y: 16,
        duration: 11,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      gsap.to('.bg-parallax', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g className="bg-parallax">
          {/* structural verticals — Swiss grid fractions */}
          <line x1="216" y1="-20" x2="216" y2="920" stroke="#151515" strokeWidth="1" />
          <line x1="720" y1="-20" x2="720" y2="920" stroke="#181818" strokeWidth="1" />
          <line x1="1224" y1="-20" x2="1224" y2="920" stroke="#151515" strokeWidth="1" />
          {/* sparse horizontals */}
          <line x1="-20" y1="198" x2="1460" y2="198" stroke="#141414" strokeWidth="1" />
          <line x1="-20" y1="576" x2="1460" y2="576" stroke="#171717" strokeWidth="1" />

          {/* the one red diagonal */}
          <line
            x1="1064"
            y1="-20"
            x2="1460"
            y2="248"
            stroke="#e63228"
            strokeOpacity="0.38"
            strokeWidth="1.5"
          />

          {/* survey crosshairs */}
          <g className="bg-drift-a">
            <path d="M962 148 H978 M970 140 V156" stroke="#e63228" strokeWidth="1.25" />
            <circle cx="970" cy="148" r="10.5" stroke="#e63228" strokeOpacity="0.45" strokeWidth="1" />
          </g>
          <g className="bg-drift-b">
            <path d="M198 706 H212 M205 699 V713" stroke="#3a3a3a" strokeWidth="1.25" />
            <circle cx="205" cy="706" r="9.5" stroke="#2c2c2c" strokeWidth="1" />
          </g>

          {/* coordinate annotations (desktop only) */}
          <g className="hidden lg:block" fontFamily="DM Mono, monospace" fontSize="9" letterSpacing="1.5" fill="#3d3d3d">
            <text x="224" y="616">X.216</text>
            <text x="728" y="616">X.720</text>
            <text x="1232" y="616">X.1224</text>
            <text x="1128" y="270" fill="#5a2320">REF.970.148</text>
          </g>
        </g>

        {/* edge ticks along the left margin (desktop only) */}
        <g className="hidden lg:block" stroke="#242424" strokeWidth="1">
          {Array.from({ length: 13 }, (_, i) => {
            const y = 60 + i * 66
            return <line key={y} x1="0" y1={y} x2={i % 4 === 0 ? 14 : 8} y2={y} />
          })}
        </g>
      </svg>
    </div>
  )
}
