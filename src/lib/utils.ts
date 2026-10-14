/** Tiny class-name joiner — avoids a clsx dependency. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Test support for backdrop-filter with an SVG filter reference (Chromium-only today). */
export function supportsBackdropFilterUrl(): boolean {
  if (typeof CSS === 'undefined' || !CSS.supports) return false
  try {
    return CSS.supports('backdrop-filter', 'url(#f)') || CSS.supports('-webkit-backdrop-filter', 'url(#f)')
  } catch {
    return false
  }
}
