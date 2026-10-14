"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Hash-based view routing for the single-route deployment surface.
 *
 * Supported hashes:
 *   "" | "#/"                           → home view
 *   "#/projects/aura-player"            → Aura Player detail view
 *   any "#section-id"                   → home view (section anchor)
 *
 * Why hash routing? The preview gateway of this environment only exposes
 * the root route, so in-app views synchronise with the URL hash. This keeps
 * deep links (`/#/projects/aura-player`) and browser back/forward working.
 * View content lives in dedicated components, so wiring a real route
 * (e.g. /projects/aura-player) later is a drop-in change.
 *
 * Implemented with useSyncExternalStore — the URL hash IS the external
 * store; React subscribes instead of mirroring it into state.
 */

export type ViewRoute = { readonly name: "home" | "aura" };

const HOME: ViewRoute = { name: "home" };
const AURA: ViewRoute = { name: "aura" };

export function routeFromHash(hash: string): ViewRoute {
  const h = hash.replace(/^#/, "");
  if (h === "/projects/aura-player" || h === "/projects/aura-player/") {
    return AURA;
  }
  return HOME;
}

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener("hashchange", onStoreChange);
  return () => window.removeEventListener("hashchange", onStoreChange);
};

const getSnapshot = (): ViewRoute => routeFromHash(window.location.hash);
const getServerSnapshot = (): ViewRoute => HOME;

export function useHashRoute(): {
  route: ViewRoute;
  navigate: (to: "home" | "aura", opts?: { anchor?: string }) => void;
} {
  const route = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const navigate = useCallback(
    (to: "home" | "aura", opts?: { anchor?: string }) => {
      if (to === "aura") {
        if (routeFromHash(window.location.hash).name !== "aura") {
          window.location.hash = "/projects/aura-player";
        }
        return;
      }
      // back home — optionally landing on an anchor section
      if (opts?.anchor) {
        const el = document.getElementById(opts.anchor);
        if (el) {
          // same hash → no hashchange event → scroll directly
          if (window.location.hash === `#${opts.anchor}`) {
            el.scrollIntoView();
          } else {
            window.location.hash = opts.anchor; // hashchange → home + anchor
          }
        }
        return;
      }
      if (window.location.hash !== "" && window.location.hash !== "#/") {
        window.location.hash = "/";
      }
    },
    []
  );

  return { route, navigate };
}
