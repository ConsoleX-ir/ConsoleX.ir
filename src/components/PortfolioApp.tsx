"use client";

import { useEffect, useRef } from "react";
import Opening from "@/components/opening/Opening";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Lab from "@/components/sections/Lab";
import Roadmap from "@/components/sections/Roadmap";
import Contact from "@/components/sections/Contact";
import AuraView from "@/components/aura/AuraView";
import { useHashRoute } from "@/hooks/useHashRoute";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const HOME_TITLE = "ConsoleX — Independent software, built with curiosity";

/**
 * PortfolioApp — the single-route application shell.
 * Home sections stay mounted (hidden) while the Aura detail view is
 * active, so the WebGL gel pauses via IntersectionObserver and home
 * scroll position survives round-trips.
 */
export default function PortfolioApp() {
  const { route, navigate } = useHashRoute();
  const reducedMotion = usePrefersReducedMotion();

  const prevRoute = useRef<string>("home");
  const homeScrollY = useRef(0);

  useEffect(() => {
    const from = prevRoute.current;
    const to = route.name;
    if (from === to) return;
    prevRoute.current = to;

    if (to === "aura") {
      homeScrollY.current = window.scrollY;
      window.scrollTo({ top: 0, behavior: "auto" });
      document.title = "Aura Player — ConsoleX";
    } else {
      document.title = HOME_TITLE;
      const h = window.location.hash.replace(/^#/, "");
      if (h && h !== "/" && document.getElementById(h)) {
        // came home via a section hash (e.g. #work) — land there
        requestAnimationFrame(() => {
          document.getElementById(h)?.scrollIntoView({ behavior: "auto" });
        });
      } else {
        window.scrollTo({ top: homeScrollY.current, behavior: "auto" });
      }
    }
  }, [route]);

  return (
    <div id="top" className="flex min-h-screen flex-col bg-cx-bg text-cx-text">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-cx-accent focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Opening />

      <Header route={route} onNavigateHome={(anchor) => navigate("home", { anchor })} />

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <div hidden={route.name !== "home"}>
          <Hero reducedMotion={reducedMotion} />
          <About />
          <Skills />
          <Work />
          <Lab reducedMotion={reducedMotion} />
          <Roadmap />
          <Contact />
        </div>
        {route.name === "aura" ? (
          <AuraView
            onNavigateHome={(anchor) => navigate("home", { anchor })}
          />
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
