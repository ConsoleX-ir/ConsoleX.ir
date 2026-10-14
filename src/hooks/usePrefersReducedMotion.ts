"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe prefers-reduced-motion subscription.
 * Returns `false` on the server and before the first client measurement,
 * then tracks live changes to the media query.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
