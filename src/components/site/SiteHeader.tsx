import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { GITHUB_URL, navItems } from '../../data/site'
import { ScrollTrigger } from '../../lib/gsap'
import { lockScroll, scrollToTarget } from '../../lib/useSmoothScroll'
import { cn } from '../../lib/utils'
import { Wordmark } from '../ui/Wordmark'

function handleAnchor(e: ReactMouseEvent<HTMLAnchorElement>, target: string, after?: () => void) {
  if (!target.startsWith('#')) return
  e.preventDefault()
  after?.()
  scrollToTarget(target === '#top' ? 0 : target)
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = () => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  // on open: move focus into the menu; Escape closes from anywhere
  useEffect(() => {
    if (!menuOpen) return
    const first = menuRef.current?.querySelector<HTMLElement>('a[href]')
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scroll spy — highlight the section currently crossing mid-viewport
  useEffect(() => {
    const triggers = navItems
      .map((item) => {
        const section = document.getElementById(item.id)
        if (!section) return null
        return ScrollTrigger.create({
          trigger: section,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setActive(item.id)
          },
        })
      })
      .filter(Boolean)
    return () => triggers.forEach((t) => t?.kill())
  }, [])

  useEffect(() => {
    lockScroll(menuOpen)
    return () => lockScroll(false)
  }, [menuOpen])

  const trapFocus = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      closeMenu()
      return
    }
    if (e.key !== 'Tab') return
    const focusables = e.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (!first || !last) return
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500',
          scrolled || menuOpen
            ? 'border-b border-line bg-bg/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-gutter md:h-[72px] md:px-10">
          <a
            href="#top"
            aria-label="ConsoleX — back to top"
            onClick={(e) => handleAnchor(e, '#top', () => setMenuOpen(false))}
          >
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                onClick={(e) => handleAnchor(e, `#${item.id}`)}
                className={cn(
                  'group font-mono text-label uppercase transition-colors duration-300',
                  active === item.id ? 'text-red' : 'text-dim hover:text-ink',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'mr-1.5 text-[9px] transition-colors',
                    active === item.id ? 'text-red' : 'text-faint group-hover:text-red',
                  )}
                >
                  {item.num}
                </span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-label uppercase text-ink transition-colors duration-300 hover:border-red hover:text-red"
            >
              GitHub
              <ArrowUpRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="h-3.5 w-3.5 transition-transform duration-300 ease-swift group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-red hover:text-red lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        id="mobile-menu"
        ref={menuRef}
        inert={!menuOpen}
        onKeyDown={trapFocus}
        className={cn(
          'fixed inset-0 z-40 bg-bg transition-opacity duration-300 lg:hidden',
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col px-gutter pb-10 pt-28">
          <p className="mono-label">Navigation</p>
          <nav aria-label="Mobile" className="mt-4 flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  // unlock explicitly before scrolling — the menuOpen effect
                  // that re-enables Lenis only runs after the re-render
                  e.preventDefault()
                  setMenuOpen(false)
                  lockScroll(false)
                  scrollToTarget(`#${item.id}`)
                }}
                className="flex items-baseline gap-4 border-b border-line-soft py-5 font-sans text-4xl font-semibold uppercase tracking-tight text-ink transition-colors hover:text-red"
              >
                <span className="font-mono text-xs text-red">{item.num}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-label uppercase text-ink"
            >
              github.com/ConsoleX-ir
              <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-3.5 w-3.5" />
            </a>
            <p className="mono-label">Building my own world.</p>
          </div>
        </div>
      </div>
    </>
  )
}
