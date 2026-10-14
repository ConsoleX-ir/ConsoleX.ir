"use client";

import { useEffect, useRef } from "react";

/**
 * Lab experiment 2 — Interference field.
 * Two drifting wave sources + your pointer as a third; rendered as a
 * low-resolution buffer (140×96) and upscaled — cheap and hypnotic.
 */
export default function Interference({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 140;
    const H = 96;
    canvas.width = W;
    canvas.height = H;
    const img = ctx.createImageData(W, H);
    const data = img.data;

    const pointer = { x: -999, y: -999, active: false };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * W;
      pointer.y = ((1 - (e.clientY - rect.top) / rect.height) * H);
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave, { passive: true });

    // precomputed color ramp: white → light blue → accent (t=0..1)
    const ramp = new Uint8ClampedArray(256 * 3);
    for (let i = 0; i < 256; i++) {
      const t = i / 255;
      // mix #F4F8FF → #7CC0F4 → #1D4ED8
      let r: number, g: number, b: number;
      if (t < 0.55) {
        const k = t / 0.55;
        r = 244 + (124 - 244) * k;
        g = 248 + (192 - 248) * k;
        b = 255 + (244 - 255) * k;
      } else {
        const k = (t - 0.55) / 0.45;
        r = 124 + (29 - 124) * k;
        g = 192 + (78 - 192) * k;
        b = 244 + (216 - 244) * k;
      }
      ramp[i * 3] = r;
      ramp[i * 3 + 1] = g;
      ramp[i * 3 + 2] = b;
    }

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
    io.observe(canvas);
    const onVis = () => {
      hidden = document.hidden;
      updateRun();
    };
    document.addEventListener("visibilitychange", onVis);

    const draw = (t: number) => {
      const s1x = W * 0.5 + Math.cos(t * 0.7) * W * 0.3;
      const s1y = H * 0.5 + Math.sin(t * 0.5) * H * 0.28;
      const s2x = W * 0.5 + Math.cos(t * 0.44 + 2.1) * W * 0.34;
      const s2y = H * 0.5 + Math.sin(t * 0.61 + 1.2) * H * 0.3;
      const px = pointer.active ? pointer.x : -9999;
      const py = pointer.active ? pointer.y : -9999;

      let di = 0;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const d1 = Math.sqrt((x - s1x) ** 2 + (y - s1y) ** 2);
          const d2 = Math.sqrt((x - s2x) ** 2 + (y - s2y) ** 2);
          const d3 = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
          const v =
            Math.sin(d1 * 0.55 - t * 2.2) +
            Math.sin(d2 * 0.5 - t * 1.7) +
            Math.sin(d3 * 0.6 - t * 2.6) * (pointer.active ? 1 : 0);
          const norm = (v / (pointer.active ? 3 : 2) + 1) * 0.5; // 0..1
          const idx = Math.max(0, Math.min(255, (norm * 255) | 0));
          data[di] = ramp[idx * 3];
          data[di + 1] = ramp[idx * 3 + 1];
          data[di + 2] = ramp[idx * 3 + 2];
          data[di + 3] = 255;
          di += 4;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    let t = 0;
    let prev = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt;
      draw(t);
      if (running) raf = requestAnimationFrame(frame);
    };

    const updateRun = () => {
      const should = inView && !hidden && !reducedMotion;
      if (should && !running) {
        running = true;
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
    updateRun();

    if (reducedMotion) draw(4.2); // one calm static frame

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="h-60 w-full cursor-crosshair"
      role="img"
      aria-label="Interactive interference pattern: overlapping waves that follow the pointer"
    />
  );
}
