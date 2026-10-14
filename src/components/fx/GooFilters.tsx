import { useEffect, useRef, useState } from 'react'

/**
 * Global SVG filter definitions:
 *
 *  #cx-goo            — classic gooey alpha filter for gel surfaces
 *                       (feGaussianBlur + feColorMatrix alpha sharpening)
 *  #cx-lens-displace  — displacement map filter used by the liquid-glass
 *                       lens via `backdrop-filter: url(#cx-lens-displace)`.
 *                       The map is generated on a canvas at runtime.
 *                       Chromium renders the refraction; other engines keep
 *                       the frosted-glass fallback declared in CSS.
 */
export function GooFilters() {
  const [mapUrl, setMapUrl] = useState<string | null>(null)
  const disposed = useRef(false)

  useEffect(() => {
    disposed.current = false
    // Build a radial lens displacement map: R = x-offset, G = y-offset,
    // neutral 128 at center, displacement growing towards the rim.
    const size = 256
    let url: string | null = null
    try {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const img = ctx.createImageData(size, size)
      const data = img.data
      const half = size / 2
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const dx = (x - half) / half
          const dy = (y - half) / half
          const d = Math.min(1, Math.sqrt(dx * dx + dy * dy))
          // ease the effect so the middle stays flat, rim bends
          const f = Math.pow(d, 2.6)
          const i = (y * size + x) * 4
          data[i] = 128 + dx * f * 120 // R — x displacement
          data[i + 1] = 128 + dy * f * 120 // G — y displacement
          data[i + 2] = 128 // B — unused
          data[i + 3] = 255
        }
      }
      ctx.putImageData(img, 0, 0)
      url = canvas.toDataURL()
    } catch {
      return /* canvas unavailable — frosted fallback remains */
    }

    // defer the state update out of the effect body
    const raf = window.requestAnimationFrame(() => {
      if (!disposed.current && url) setMapUrl(url)
    })
    return () => {
      disposed.current = true
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="absolute h-0 w-0 overflow-hidden"
      aria-label="Global effect filters"
      role="presentation"
    >
      <defs>
        {/* gooey merge — used by gel surfaces (kept inside a real inline svg
            so WebKit repaints reliably; CSS-referenced animated filters are
            unreliable in Safari, so gel layers avoid CSS `filter:` there) */}
        <filter id="cx-goo" x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>

        {/* liquid-glass refraction (Chromium) — applied via backdrop-filter */}
        <filter
          id="cx-lens-displace"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          {mapUrl ? (
            <feImage href={mapUrl} x="0" y="0" width="100%" height="100%" result="map" preserveAspectRatio="none" />
          ) : (
            <feOffset in="SourceGraphic" result="map" />
          )}
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="26"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
