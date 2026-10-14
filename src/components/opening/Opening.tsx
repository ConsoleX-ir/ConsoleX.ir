"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Opening sequence — a short, art-directed introduction.
 *
 * Behaviour (per brief):
 *  - plays once per browser session (sessionStorage flag)
 *  - skippable: button + Escape key
 *  - never traps focus; content is reachable the moment it exits
 *  - skipped entirely for prefers-reduced-motion and no-JS visitors
 *  - hands off to the hero gel via the "cx-gel-form" event as it exits
 *  - no audio, no artificial loading wait beyond the choreography itself
 */

const WORD = "ConsoleX";

export default function Opening() {
  const [state, setState] = useState<"play" | "exit" | "gone">("play");
  const exitedRef = useRef(false);
  const userInitiatedRef = useRef(false);

  const beginExit = useCallback((userInitiated = false) => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    userInitiatedRef.current = userInitiated;
    setState("exit");
    // hand off to the hero liquid element as the overlay starts leaving
    window.dispatchEvent(new CustomEvent("cx-gel-form"));
    try {
      sessionStorage.setItem("cx-intro", "seen");
    } catch {
      /* storage unavailable — intro will simply replay next visit */
    }
    document.documentElement.classList.remove("cx-intro-lock");
  }, []);

  useEffect(() => {
    // pre-hydration bootstrap may have decided the intro should not play;
    // CSS already hides the overlay — defer the state change out of the
    // synchronous effect body
    if (document.documentElement.classList.contains("cx-skip-intro")) {
      document.documentElement.classList.remove("cx-intro-lock");
      const raf = requestAnimationFrame(() => setState("gone"));
      return () => cancelAnimationFrame(raf);
    }
    const timer = window.setTimeout(() => beginExit(false), 1750);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") beginExit(true);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [beginExit]);

  useEffect(() => {
    if (state !== "gone" && userInitiatedRef.current) {
      // return focus into the document after a user skip
      const main = document.getElementById("main");
      main?.focus({ preventScroll: true });
    }
  }, [state]);

  if (state === "gone") return null;

  return (
    <div
      className="cx-opening"
      data-exit={state === "exit" ? "true" : undefined}
      onAnimationEnd={() => {
        if (state === "exit") setState("gone");
      }}
    >
      <div aria-hidden="true" className="flex flex-col items-center gap-6">
        <span
          className="cx-intro-gel block h-4 w-4"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, #bae6fd 0%, #38bdf8 45%, #2563eb 100%)",
            boxShadow: "0 6px 24px rgba(37,99,235,0.45)",
          }}
        />
        <p
          className="font-display text-5xl font-semibold tracking-tight text-cx-text sm:text-6xl md:text-7xl"
        >
          {WORD.split("").map((ch, i) => (
            <span
              key={i}
              className="cx-intro-letter"
              style={{ "--d": `${140 + i * 55}ms` } as React.CSSProperties}
            >
              {ch}
            </span>
          ))}
        </p>
        <span className="cx-intro-line block h-px w-24 bg-cx-accent" />
        <span
          className="cx-intro-tag eyebrow"
          style={{ "--d": "0ms" } as React.CSSProperties}
        >
          Independent software
        </span>
      </div>

      <button
        type="button"
        onClick={() => beginExit(true)}
        className="font-mono2 absolute bottom-8 right-8 min-h-11 rounded-full border border-cx-border px-5 py-2 text-xs tracking-wider text-cx-text-2 transition-colors hover:border-cx-accent hover:text-cx-accent sm:bottom-10 sm:right-12"
      >
        Skip — esc
      </button>
    </div>
  );
}
