"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LiquidGlass — ConsoleX's signature visual element.
 *
 * A raw-WebGL (no 3D library) fragment shader rendering an organic,
 * translucent blue gel: a metaball field with domain-warped noise,
 * genuine refraction of a procedural environment, fresnel rim light,
 * dual speculars, velocity-based deformation and scroll parallax.
 *
 * Fallback ladder (per brief):
 *  - WebGL unavailable / context lost → layered CSS gel (animated)
 *  - prefers-reduced-motion           → single static shader frame
 *  - offscreen or hidden tab          → render loop paused
 *  - small screens                    → reduced internal buffer resolution
 */

export type FormSignal = "wait" | "go" | "instant";

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform float uForm;     // 0..1 intro formation
uniform float uScroll;   // 0..1 hero scroll progress
uniform vec2  uPointer;  // canvas px, GL orientation (y up)
uniform float uPointerStr; // 0..1
uniform vec2  uVel;      // px/s smoothed

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p = p * 2.03 + vec2(11.7, 5.3);
    a *= 0.5;
  }
  return v;
}

/* ── procedural environment the gel refracts ─────────────────── */
vec3 env(vec2 px, float scroll) {
  vec2 uv = px / uRes; // y up
  vec3 white = vec3(1.0);
  vec3 wash  = vec3(0.957, 0.973, 1.0);   // #F4F8FF
  vec3 dotC  = vec3(0.843, 0.894, 0.973); // #D7E4F8
  vec3 surf  = vec3(0.918, 0.949, 1.0);   // #EAF2FF

  vec3 col = mix(white, wash, smoothstep(0.25, 1.0, uv.y) * 0.85);

  // soft glow, top right
  vec2 gp = (px - vec2(uRes.x * 0.80, uRes.y * 0.86)) / uRes.y;
  col = mix(col, surf, exp(-dot(gp, gp) * 3.2) * 0.85);

  // faint surface tint, bottom left
  vec2 bp = (px - vec2(uRes.x * 0.10, uRes.y * 0.06)) / uRes.y;
  col = mix(col, wash, exp(-dot(bp, bp) * 2.4) * 0.55);

  // dot grid with slight parallax
  vec2 gx = px + vec2(0.0, scroll * 80.0);
  vec2 g = fract(gx / 34.0) - 0.5;
  float d = smoothstep(1.8, 0.5, length(g * 34.0));
  col = mix(col, dotC, d * 0.30);

  return col;
}

/* ── metaball field with analytic gradient ───────────────────── */
float blob(vec2 p, vec2 c, float r, inout vec2 grad) {
  vec2 d = p - c;
  float r2 = r * r;
  float v = exp(-dot(d, d) / r2);
  grad += (-2.0 / r2) * v * d;
  return v;
}

void main() {
  float aspect = uRes.x / uRes.y;
  bool wide = aspect > 1.05;

  // gel anchor (GL coords, y up): right of center on desktop, lower on mobile
  vec2 centerGL = wide
    ? vec2(uRes.x * 0.615, uRes.y * 0.50)
    : vec2(uRes.x * 0.500, uRes.y * 0.26);
  float U = uRes.y;
  float rs = clamp(wide ? U / 780.0 : uRes.x / 480.0, 0.7, 1.25);

  vec2 p = (gl_FragCoord.xy - centerGL) / U;

  // scroll: parallax drift + gentle squash
  vec2 pf = p;
  pf.y += uScroll * 0.22;
  pf.y /= (1.0 - uScroll * 0.10);

  // velocity stretch (gel deformation along pointer motion)
  vec2 vd = uVel + vec2(0.0001, 0.0001);
  float vlen = length(vd);
  vd /= vlen;
  float vl = clamp(vlen / 1400.0, 0.0, 0.38) * uPointerStr;
  mat2 Rm = mat2(vd.x, vd.y, -vd.y, vd.x);
  mat2 Ri = mat2(vd.x, -vd.y, vd.y, vd.x);
  vec2 q = Rm * (pf - vec2(0.0, 0.02));
  q.x /= (1.0 + vl);
  q.y *= (1.0 + vl * 0.55);
  pf = vec2(0.0, 0.02) + Ri * q;

  // domain warp for organic wobble
  float t = uTime;
  vec2 warp = 0.045 * vec2(
    fbm(pf * 2.1 + t * 0.16) - 0.5,
    fbm(pf * 2.1 + vec2(5.2, 1.3) - t * 0.13) - 0.5
  );
  pf += warp * smoothstep(0.0, 1.0, uForm * 0.6 + 0.4);

  // formation scale
  float e = uForm * uForm * (3.0 - 2.0 * uForm); // smoothstep ease
  float s = mix(0.10, 1.0, e) * rs;

  float T = 1.0;
  vec2 grad = vec2(0.0);
  float F = 0.0;

  F += blob(pf, vec2(0.000, 0.020) + 0.045 * vec2(sin(t * 0.32), cos(t * 0.27)), 0.265 * s, grad);
  F += blob(pf, vec2(0.300, 0.205) + 0.100 * vec2(sin(t * 0.55 + 1.7), cos(t * 0.48 + 0.6)), 0.150 * s, grad);
  F += blob(pf, vec2(-0.330, 0.130) + 0.120 * vec2(cos(t * 0.42 + 4.2), sin(t * 0.50 + 2.2)), 0.125 * s, grad);
  F += blob(pf, vec2(0.065, -0.310) + 0.085 * vec2(sin(t * 0.62 + 2.9), cos(t * 0.44 + 1.1)), 0.105 * s, grad);
  F += blob(pf, vec2(-0.165, -0.215) + 0.095 * vec2(cos(t * 0.36 + 0.4), sin(t * 0.31 + 3.4)), 0.095 * s, grad);
  float pStr = uPointerStr;
  if (pStr > 0.003) {
    vec2 pp = (uPointer - centerGL) / U;
    F += blob(pf, pp, (0.100 + 0.028 * sin(t * 0.9)) * s * mix(0.6, 1.0, pStr) + 0.02, grad) * pStr;
  }

  float mask = smoothstep(T - 0.07, T + 0.07, F);
  float edge = 1.0 - smoothstep(T, T + 0.5, F); // proximity to boundary

  vec3 col = env(gl_FragCoord.xy, uScroll);

  // outer glow hugging the silhouette
  float halo = smoothstep(T - 0.7, T, F) * (1.0 - mask);
  col += vec3(0.22, 0.74, 0.97) * halo * 0.12 * e;

  if (mask > 0.0005) {
    vec3 n = normalize(vec3(-grad * 0.62, 1.0));
    float ndz = clamp(n.z, 0.0, 1.0);
    float fres = pow(1.0 - ndz, 3.0);

    // refraction of the environment, strongest where the surface bends
    vec3 refr = env(gl_FragCoord.xy + n.xy * (16.0 + 42.0 * fres), uScroll);

    // internal depth: rich blue core → light cyan edge
    float h = clamp((F - T) / 0.9, 0.0, 1.0);
    vec3 deep = vec3(0.114, 0.306, 0.847);   // #1D4ED8-ish
    vec3 lite = vec3(0.420, 0.760, 0.970);   // cyan-blue
    vec3 inner = mix(deep, lite, pow(h, 0.8));

    vec3 gel = mix(refr * 0.32 + inner * 0.68, refr, fres * 0.5);

    // subtle internal caustics
    float ca = fbm(p * 5.5 + vec2(t * 0.22, -t * 0.18));
    gel += vec3(0.30, 0.55, 0.95) * (ca - 0.5) * 0.08;

    // fresnel rim — bright blue illumination
    gel += vec3(0.220, 0.741, 0.973) * fres * (1.05 + 0.55 * (1.0 - e));

    // dual speculars
    vec3 L1 = normalize(vec3(-0.42, 0.62, 0.66));
    vec3 L2 = normalize(vec3(0.58, -0.18, 0.72));
    float s1 = pow(max(dot(n, L1), 0.0), 64.0);
    float s2 = pow(max(dot(n, L2), 0.0), 28.0);
    gel += vec3(1.0) * (s1 * 0.9 + s2 * 0.22);

    col = mix(col, gel, mask);
  }

  // contact shadow below the gel (cool blue shadow — reduces red most)
  vec2 sp = (p - vec2(0.015, -0.375)) / vec2(0.34, 0.13);
  float sh = exp(-dot(sp, sp)) * (1.0 - mask) * 0.4 * e;
  col *= 1.0 - sh * vec3(0.28, 0.17, 0.06);

  // fine dither against banding
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.006;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

type Props = { className?: string };

export default function LiquidGlass({ className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    // Read once for this effect lifetime — avoids re-init (and a killed
    // WebGL context) when the parent's reduced-motion state flips on mount.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFailed(true);
      return;
    }
    const prog = gl.createProgram();
    if (!prog) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    // fullscreen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uForm = gl.getUniformLocation(prog, "uForm");
    const uScroll = gl.getUniformLocation(prog, "uScroll");
    const uPointer = gl.getUniformLocation(prog, "uPointer");
    const uPointerStr = gl.getUniformLocation(prog, "uPointerStr");
    const uVel = gl.getUniformLocation(prog, "uVel");

    // ── sizing ────────────────────────────────────────────────
    let w = 0;
    let h = 0;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const quality = rect.width < 768 ? 0.66 : 1;
      const bw = Math.max(1, Math.round(rect.width * dpr * quality));
      const bh = Math.max(1, Math.round(rect.height * dpr * quality));
      if (bw !== w || bh !== h) {
        w = bw;
        h = bh;
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ── pointer state ─────────────────────────────────────────
    const ptr = { x: 0, y: 0, tx: 0, ty: 0, str: 0, tStr: 0 };
    const vel = { x: 0, y: 0 };
    let lastMove: { x: number; y: number; t: number } | null = null;

    const toCanvas = (cx: number, cy: number) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((cx - rect.left) / rect.width) * w,
        y: ((1 - (cy - rect.top) / rect.height) * h),
      };
    };
    const onMove = (ev: PointerEvent) => {
      const p = toCanvas(ev.clientX, ev.clientY);
      if (lastMove) {
        const dt = Math.max(8, ev.timeStamp - lastMove.t) / 1000;
        vel.x = vel.x * 0.7 + ((p.x - lastMove.x) / dt) * 0.3;
        vel.y = vel.y * 0.7 + ((p.y - lastMove.y) / dt) * 0.3;
      }
      lastMove = { x: p.x, y: p.y, t: ev.timeStamp };
      ptr.tx = p.x;
      ptr.ty = p.y;
      ptr.tStr = 1;
    };
    const onLeave = () => {
      ptr.tStr = 0;
      lastMove = null;
    };
    const host = wrap.parentElement ?? wrap;
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });

    // ── scroll ────────────────────────────────────────────────
    let scrollT = 0;
    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const total = Math.max(1, rect.height * 0.92);
      scrollT = Math.min(1, Math.max(0, -rect.top / total));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ── visibility control ────────────────────────────────────
    let inView = true;
    let pageHidden = document.hidden;
    let raf = 0;
    let running = false;

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        updateRun();
      },
      { threshold: 0.02 }
    );
    io.observe(canvas);
    const onVis = () => {
      pageHidden = document.hidden;
      updateRun();
    };
    document.addEventListener("visibilitychange", onVis);

    // ── formation timing ──────────────────────────────────────
    // If the intro was skipped (html has .cx-skip-intro), ramp at mount.
    // Otherwise wait for the "cx-gel-form" event dispatched by the
    // opening overlay as it begins to exit — one connected experience.
    const skipIntro = document.documentElement.classList.contains("cx-skip-intro");
    let form = reduced ? 1 : 0;
    let formStart: number | null = reduced ? -1 : skipIntro ? null : -2; // -2 = waiting for intro
    const onFormEvent = () => {
      if (formStart === -2) formStart = performance.now();
    };
    window.addEventListener("cx-gel-form", onFormEvent);

    const start = performance.now();
    let prevT = start;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - prevT) / 1000);
      prevT = now;
      const t = (now - start) / 1000;

      // formation ramp
      if (formStart === -2) {
        form = 0; // intro still playing
      } else if (formStart !== null && formStart !== -1) {
        const k = Math.min(1, (now - formStart) / 1500);
        form = 1 - Math.pow(1 - k, 3);
        if (k >= 1) formStart = -1;
      } else if (formStart === null) {
        // skipped intro → quick confident ramp at mount
        const k = Math.min(1, (now - start) / 900);
        form = 1 - Math.pow(1 - k, 3);
        if (k >= 1) formStart = -1;
      }

      // smooth pointer + velocity decay
      const k = 1 - Math.pow(0.0008, dt);
      ptr.x += (ptr.tx - ptr.x) * k;
      ptr.y += (ptr.ty - ptr.y) * k;
      ptr.str += (ptr.tStr - ptr.str) * Math.min(1, dt * 6);
      vel.x *= Math.pow(0.06, dt);
      vel.y *= Math.pow(0.06, dt);

      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, reduced ? 14.0 : t);
      gl.uniform1f(uForm, form);
      gl.uniform1f(uScroll, scrollT);
      gl.uniform2f(uPointer, ptr.x, ptr.y);
      gl.uniform1f(uPointerStr, reduced ? 0 : ptr.str);
      gl.uniform2f(uVel, reduced ? 0 : vel.x, reduced ? 0 : vel.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (running && !reduced) raf = requestAnimationFrame(frame);
    };

    const renderStatic = () => {
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, 14.0);
      gl.uniform1f(uForm, 1);
      gl.uniform1f(uScroll, scrollT);
      gl.uniform2f(uPointer, 0, 0);
      gl.uniform1f(uPointerStr, 0);
      gl.uniform2f(uVel, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const updateRun = () => {
      const should = inView && !pageHidden && !reduced;
      if (should && !running) {
        running = true;
        prevT = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    if (reduced) {
      renderStatic();
      // re-render the static frame on resize
      const roStatic = new ResizeObserver(() => renderStatic());
      roStatic.observe(wrap);
      return () => {
        roStatic.disconnect();
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("scroll", onScroll);
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
        ro.disconnect();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    updateRun();

    const onLost = (ev: Event) => {
      ev.preventDefault();
      running = false;
      cancelAnimationFrame(raf);
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", onScroll);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("webglcontextlost", onLost);
      window.removeEventListener("cx-gel-form", onFormEvent);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  if (failed) {
    return (
      <div
        ref={wrapRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* CSS gel fallback — deliberate static/lightweight alternative */}
        <div
          className="cx-gel-fallback absolute right-[4%] top-[16%] h-[46vmin] w-[46vmin] opacity-90 blur-[2px]"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, rgba(125,211,252,0.75) 22%, rgba(56,189,248,0.55) 45%, rgba(37,99,235,0.55) 100%)",
            boxShadow:
              "0 40px 90px -20px rgba(37,99,235,0.35), inset 0 -18px 40px rgba(29,78,216,0.35)",
          }}
        />
        <div
          className="absolute right-[2%] top-[52%] h-[18vmin] w-[18vmin] rounded-full opacity-70 blur-md"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(186,230,253,0.9), rgba(56,189,248,0.5) 60%, rgba(37,99,235,0.4))",
          }}
        />
        <div
          className="absolute right-[30%] top-[8%] h-[10vmin] w-[10vmin] rounded-full opacity-60 blur-lg"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.65), rgba(37,99,235,0.35))",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
