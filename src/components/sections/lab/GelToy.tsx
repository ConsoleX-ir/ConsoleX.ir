"use client";

import { useEffect, useRef } from "react";

/**
 * Lab experiment 1 — Gel toy.
 * Gooey metaballs (blur + contrast compositing) that chase and squish
 * around the pointer. Pauses offscreen; static under reduced motion.
 */
export default function GelToy({ reducedMotion }: { reducedMotion: boolean }) {
  const areaRef = useRef<HTMLDivElement | null>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;

    const N = 5;
    const blobs = Array.from({ length: N }, (_, i) => ({
      x: 0.3 + i * 0.1,
      y: 0.5,
      vx: 0,
      vy: 0,
      r: 0.10 + (i % 3) * 0.035,
      phase: (i / N) * Math.PI * 2,
    }));

    const pointer = { x: 0.5, y: 0.45, active: false };

    const onMove = (e: PointerEvent) => {
      const rect = area.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    area.addEventListener("pointermove", onMove, { passive: true });
    area.addEventListener("pointerdown", onMove, { passive: true });
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

    let t = 0;
    let prev = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt;

      const aspect = area.clientWidth / Math.max(1, area.clientHeight);

      blobs.forEach((b, i) => {
        let tx: number, ty: number;
        if (pointer.active && i === 0) {
          tx = pointer.x;
          ty = pointer.y;
        } else if (pointer.active) {
          // satellites trail toward the pointer with orbit
          const ang = t * (0.6 + i * 0.13) + b.phase;
          tx = pointer.x + Math.cos(ang) * (0.10 + i * 0.02);
          ty = pointer.y + Math.sin(ang) * (0.13 + i * 0.02);
        } else {
          const ang = t * 0.5 + b.phase;
          tx = 0.5 + Math.cos(ang * 0.9) * 0.24;
          ty = 0.5 + Math.sin(ang * 1.2) * 0.2;
        }

        // spring
        const k = 26 + i * 3;
        const damp = 5.5;
        b.vx += (tx - b.x) * k * dt - b.vx * damp * dt;
        b.vy += (ty - b.y) * k * dt - b.vy * damp * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // pixel-space positioning (transform % is relative to the element)
        const px = b.x * area.clientWidth;
        const py = b.y * area.clientHeight;
        const sizeV = b.r * (aspect > 1.4 ? 150 : 120) * 2;
        const el = blobRefs.current[i];
        if (el) {
          el.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`;
          el.style.width = `${sizeV}px`;
          el.style.height = `${sizeV}px`;
        }
      });

      if (running) raf = requestAnimationFrame(step);
    };

    const updateRun = () => {
      const should = inView && !hidden && !reducedMotion;
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

    if (reducedMotion) {
      // settle into a calm static arrangement
      blobs.forEach((b, i) => {
        const el = blobRefs.current[i];
        const ang = (i / N) * Math.PI * 2;
        const px = (0.5 + Math.cos(ang) * 0.18) * area.clientWidth;
        const py = (0.5 + Math.sin(ang) * 0.16) * area.clientHeight;
        if (el) {
          el.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`;
          const sizeV = b.r * 130 * 2;
          el.style.width = `${sizeV}px`;
          el.style.height = `${sizeV}px`;
        }
      });
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerdown", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion]);

  const colors = [
    "radial-gradient(circle at 35% 30%, #60a5fa 0%, #2563eb 70%, #1d4ed8 100%)",
    "radial-gradient(circle at 35% 30%, #38bdf8 0%, #2563eb 75%, #1e40af 100%)",
    "radial-gradient(circle at 35% 30%, #7cc0f4 0%, #3b82f6 70%, #1d4ed8 100%)",
    "radial-gradient(circle at 35% 30%, #38bdf8 0%, #2f6fee 75%, #1e40af 100%)",
    "radial-gradient(circle at 35% 30%, #60a5fa 0%, #2563eb 70%, #1e3a8a 100%)",
  ];

  return (
    <div
      ref={areaRef}
      className="relative h-60 w-full cursor-crosshair overflow-hidden bg-white"
      role="img"
      aria-label="Interactive gel toy: blue metaballs that follow the pointer"
    >
      {/* SVG gooey filter: preserves color, hardens alpha edges */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <filter id="cx-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -13"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>
      <div
        className="absolute inset-0"
        style={{ filter: "url(#cx-goo)", background: "transparent" }}
      >
        {colors.map((bg, i) => (
          <div
            key={i}
            ref={(el) => {
              blobRefs.current[i] = el;
            }}
            aria-hidden="true"
            className="absolute left-0 top-0 rounded-full"
            style={{ background: bg, transform: "translate(-50%,-50%)" }}
          />
        ))}
      </div>
    </div>
  );
}
