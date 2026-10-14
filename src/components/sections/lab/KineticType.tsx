"use client";

import { useEffect, useRef } from "react";

/**
 * Lab experiment 3 — Kinetic type.
 * Letters dodge the pointer with spring physics and settle back home.
 */
export default function KineticType({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const areaRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const word = "CONSOLEX";

  useEffect(() => {
    const area = areaRef.current;
    if (!area || reducedMotion) return;

    const letters = word.split("").map(() => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      hx: 0,
      hy: 0,
    }));

    const measure = () => {
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        const lr = el.getBoundingClientRect();
        const ar = area.getBoundingClientRect();
        letters[i].hx = lr.left - ar.left + lr.width / 2;
        letters[i].hy = lr.top - ar.top + lr.height / 2;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(area);

    const pointer = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      const ar = area.getBoundingClientRect();
      pointer.x = e.clientX - ar.left;
      pointer.y = e.clientY - ar.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    area.addEventListener("pointermove", onMove, { passive: true });
    area.addEventListener("pointerleave", onLeave, { passive: true });

    let inView = true;
    let hidden = document.hidden;
    let raf = 0;
    let running = false;

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        updateRun();
      },
      { threshold: 0.05 }
    );
    io.observe(area);
    const onVis = () => {
      hidden = document.hidden;
      updateRun();
    };
    document.addEventListener("visibilitychange", onVis);

    const R = 90;
    let prev = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;

      letters.forEach((l, i) => {
        const dx = l.x + l.hx - pointer.x;
        const dy = l.y + l.hy - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < R && dist > 0.01) {
          const force = ((R - dist) / R) * 900;
          l.vx += (dx / dist) * force * dt;
          l.vy += (dy / dist) * force * dt;
        }
        l.vx += -l.x * 60 * dt - l.vx * 7 * dt;
        l.vy += -l.y * 60 * dt - l.vy * 7 * dt;
        l.x += l.vx * dt;
        l.y += l.vy * dt;

        const el = letterRefs.current[i];
        if (el) {
          el.style.transform = `translate(${l.x}px, ${l.y}px)`;
        }
      });

      if (running) raf = requestAnimationFrame(step);
    };

    const updateRun = () => {
      const should = inView && !hidden;
      if (should && !running) {
        running = true;
        prev = performance.now();
        raf = requestAnimationFrame(step);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
    updateRun();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={areaRef}
      className="relative flex h-60 w-full cursor-crosshair items-center justify-center overflow-hidden bg-white"
      role="img"
      aria-label="Interactive typography: the word ConsoleX dodging the pointer"
    >
      <p
        aria-hidden="true"
        className="font-display select-none whitespace-nowrap px-4 text-center text-[clamp(1.7rem,6.5vw,2.6rem)] font-semibold tracking-tight text-cx-text"
      >
        {word.split("").map((ch, i) => (
          <span
            key={i}
            ref={(el) => {
              letterRefs.current[i] = el;
            }}
            className={`inline-block will-change-transform ${
              i === word.length - 1 ? "text-cx-accent" : ""
            }`}
          >
            {ch}
          </span>
        ))}
      </p>
    </div>
  );
}
