"use client";

import { useEffect, useRef, useState } from "react";
import { homeNav, site } from "@/data/site";
import type { ViewRoute } from "@/hooks/useHashRoute";

/**
 * Fixed header — transparent over the hero, frosted white after scroll.
 * In the Aura detail view it swaps navigation for a return path.
 */

function Wordmark({ home }: { home: boolean }) {
  return (
    <a
      href={home ? "#top" : "#/"}
      className="group flex items-center gap-2.5"
      aria-label={home ? "ConsoleX — back to top" : "ConsoleX — back to portfolio"}
    >
      <span
        aria-hidden="true"
        className="block h-6 w-6 rounded-full transition-transform duration-500 group-hover:scale-110"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #bae6fd 0%, #38bdf8 48%, #2563eb 100%)",
          boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
        }}
      />
      <span className="font-display text-lg font-semibold tracking-tight text-cx-text">
        {site.name}
      </span>
    </a>
  );
}

export default function Header({
  route,
  onNavigateHome,
}: {
  route: ViewRoute;
  onNavigateHome: (anchor?: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu when the URL hash changes (back/forward nav)
  useEffect(() => {
    const closeOnNav = () => setMenuOpen(false);
    window.addEventListener("hashchange", closeOnNav);
    return () => window.removeEventListener("hashchange", closeOnNav);
  }, []);

  // mobile menu: scroll lock, Escape, focus in/out
  useEffect(() => {
    if (!menuOpen) return;
    document.documentElement.classList.add("cx-intro-lock");
    firstMenuLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("cx-intro-lock");
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // from the detail view, route home first, then land on the section
    if (route.name !== "home") {
      e.preventDefault();
      const anchor = href.replace("#", "");
      onNavigateHome(anchor);
      return;
    }
    if (href === "#top") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-cx-border bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-cx flex h-16 items-center justify-between md:h-[4.5rem]">
        <Wordmark home={route.name === "home"} />

        {route.name === "home" ? (
          <>
            <nav
              aria-label="Primary"
              className="hidden items-center gap-8 md:flex"
            >
              {homeNav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="link-sweep text-sm text-cx-text-2 transition-colors hover:text-cx-text"
                >
                  {link.label}
                </a>
              ))}
              {site.links.github ? (
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-cx-border px-4 py-2 text-sm text-cx-text transition-colors hover:border-cx-accent hover:text-cx-accent"
                >
                  GitHub ↗
                </a>
              ) : (
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="rounded-full bg-cx-accent px-4 py-2 text-sm text-white transition-colors hover:bg-cx-accent-deep"
                >
                  Get in touch
                </a>
              )}
            </nav>

            {/* mobile trigger */}
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="cx-mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              tabIndex={menuOpen ? -1 : 0}
              aria-hidden={menuOpen || undefined}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cx-border text-cx-text md:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                    menuOpen ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${
                    menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => onNavigateHome("work")}
            className="font-mono2 group flex min-h-11 items-center gap-2 text-sm text-cx-text-2 transition-colors hover:text-cx-accent"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            All projects
          </button>
        )}
      </div>

      {/* mobile menu overlay */}
      {menuOpen && (
        <div
          id="cx-mobile-menu"
          className="fixed inset-0 z-50 flex flex-col bg-white md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="container-cx flex h-16 items-center justify-between">
            <span className="font-display text-lg font-semibold">ConsoleX</span>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cx-border text-cx-text"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                ×
              </span>
            </button>
          </div>
          <nav
            aria-label="Mobile"
            className="container-cx mt-10 flex flex-col gap-2"
          >
            {homeNav.map((link, i) => (
              <a
                key={link.href}
                ref={i === 0 ? firstMenuLinkRef : undefined}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  const anchor = link.href.replace("#", "");
                  if (route.name === "home") {
                    document
                      .getElementById(anchor)
                      ?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    onNavigateHome(anchor);
                  }
                }}
                className="font-display border-b border-cx-ink-line py-4 text-3xl font-medium tracking-tight text-cx-text transition-colors hover:text-cx-accent"
              >
                <span className="font-mono2 mr-4 text-xs text-cx-text-3">
                  0{i + 1}
                </span>
                {link.label}
              </a>
            ))}
          </nav>
          <p className="font-mono2 container-cx mt-auto pb-10 text-xs text-cx-text-3">
            {site.tagline}
          </p>
        </div>
      )}
    </header>
  );
}
