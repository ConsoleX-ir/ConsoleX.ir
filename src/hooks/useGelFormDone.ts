"use client";

import { useEffect, useState } from "react";

/**
 * Resolves to true when the opening sequence has handed off to the page
 * (either it finished/skipped, or it never played this session).
 * Used to choreograph the hero entrance into the same timeline as the gel.
 */
export function useGelFormDone(): boolean {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("cx-skip-intro")) {
      const t = window.setTimeout(() => setDone(true), 150);
      return () => window.clearTimeout(t);
    }
    const onForm = () => setDone(true);
    window.addEventListener("cx-gel-form", onForm);
    return () => window.removeEventListener("cx-gel-form", onForm);
  }, []);

  return done;
}
