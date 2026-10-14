/**
 * Original, project-specific artwork for the Selected Work section.
 * Pure SVG, derived from each project's category — deliberately
 * illustrative, never pretending to be a product screenshot.
 */

export function AuraArt() {
  return (
    <svg
      viewBox="0 0 560 350"
      className="h-full w-full"
      role="img"
      aria-label="Abstract illustration of a music player: a spinning disc, equalizer bars and a progress line"
    >
      <defs>
        <radialGradient id="cx-aura-disc" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="55%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#2563EB" />
        </radialGradient>
      </defs>
      {/* disc */}
      <g className="cx-spin" style={{ transformOrigin: "200px 150px" }}>
        <circle cx="200" cy="150" r="92" fill="url(#cx-aura-disc)" />
        <circle cx="200" cy="150" r="60" fill="none" stroke="#ffffff" strokeOpacity="0.35" />
        <circle cx="200" cy="150" r="34" fill="none" stroke="#ffffff" strokeOpacity="0.5" />
        <circle cx="200" cy="150" r="10" fill="#ffffff" fillOpacity="0.9" />
      </g>
      {/* equalizer */}
      <g>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect
            key={i}
            className="cx-eq-bar"
            style={{ "--d": `${i * 120}ms`, transformOrigin: `center ${330 - (i % 3) * 14}px` } as React.CSSProperties}
            x={340 + i * 26}
            y={330 - (22 + (i % 3) * 14) * 2}
            width="10"
            height={(22 + (i % 3) * 14) * 2}
            rx="5"
            fill={i === 3 ? "#2563EB" : "#A9CBEF"}
          />
        ))}
      </g>
      {/* progress line */}
      <line x1="330" y1="118" x2="540" y2="118" stroke="#DCE5F0" strokeWidth="4" strokeLinecap="round" />
      <line x1="330" y1="118" x2="452" y2="118" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <circle cx="452" cy="118" r="6" fill="#38BDF8" stroke="#ffffff" strokeWidth="2" />
      {/* track lines */}
      <rect x="330" y="140" width="150" height="8" rx="4" fill="#DCE5F0" />
      <rect x="330" y="158" width="96" height="8" rx="4" fill="#EAF2FF" />
    </svg>
  );
}

export function VeloArt() {
  return (
    <svg
      viewBox="0 0 560 350"
      className="h-full w-full"
      role="img"
      aria-label="Abstract illustration of a download manager: an arrow descending into a tray above segmented progress bars"
    >
      {/* descending arrow */}
      <g stroke="#2563EB" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="280" y1="52" x2="280" y2="172" />
        <polyline points="236,128 280,172 324,128" />
      </g>
      {/* tray */}
      <path
        d="M180 196 h200 l36 44 h-272 Z"
        fill="#EAF2FF"
        stroke="#A9CBEF"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* segmented progress */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x="148"
          y="266"
          width="66"
          height="12"
          rx="6"
          fill={i < 3 ? "#2563EB" : i === 3 ? "#7CC0F4" : "#EAF2FF"}
          stroke={i === 4 ? "#DCE5F0" : "none"}
          strokeWidth="2"
        />
      ))}
      <rect x="346" y="266" width="66" height="12" rx="6" fill="#EAF2FF" stroke="#DCE5F0" strokeWidth="2" />
      {/* speed marks */}
      <g stroke="#A9CBEF" strokeWidth="4" strokeLinecap="round">
        <line x1="148" y1="306" x2="216" y2="306" />
        <line x1="232" y1="306" x2="268" y2="306" />
      </g>
    </svg>
  );
}

export function NexusArt() {
  return (
    <svg
      viewBox="0 0 560 350"
      className="h-full w-full"
      role="img"
      aria-label="Abstract illustration of a messaging client: a paper plane following a dashed flight path between bubbles"
    >
      {/* dashed flight path */}
      <path
        d="M90 250 C 170 190, 240 240, 320 170 S 470 90, 500 78"
        fill="none"
        stroke="#A9CBEF"
        strokeWidth="3"
        strokeDasharray="2 12"
        strokeLinecap="round"
      />
      {/* paper plane */}
      <g transform="translate(428 92) rotate(-12)">
        <path d="M0 44 L96 0 L54 62 L38 44 Z" fill="#2563EB" />
        <path d="M38 44 L96 0 L44 76 Z" fill="#38BDF8" />
        <path d="M0 44 L38 44 L44 76 Z" fill="#1D4ED8" />
      </g>
      {/* bubbles */}
      <rect x="80" y="70" width="120" height="42" rx="21" fill="#EAF2FF" stroke="#DCE5F0" strokeWidth="2" />
      <rect x="98" y="84" width="66" height="8" rx="4" fill="#A9CBEF" />
      <rect x="220" y="252" width="140" height="42" rx="21" fill="#FFFFFF" stroke="#DCE5F0" strokeWidth="2" />
      <rect x="240" y="266" width="84" height="8" rx="4" fill="#DCE5F0" />
      <circle cx="150" cy="200" r="7" fill="#38BDF8" />
      <circle cx="180" cy="200" r="7" fill="#C7D8F0" />
      <circle cx="210" cy="200" r="7" fill="#C7D8F0" />
    </svg>
  );
}

export function VeilArt() {
  return (
    <svg
      viewBox="0 0 560 350"
      className="h-full w-full"
      role="img"
      aria-label="Abstract illustration of a 3D social deduction game: capsule figures in a foggy arena, one highlighted"
    >
      {/* arena ellipse */}
      <ellipse cx="280" cy="238" rx="216" ry="74" fill="#EAF2FF" />
      <ellipse cx="280" cy="238" rx="216" ry="74" fill="none" stroke="#DCE5F0" strokeWidth="2" strokeDasharray="4 10" />
      {/* capsule figures */}
      <g>
        <g opacity="0.85">
          <rect x="176" y="128" width="42" height="88" rx="21" fill="#C7D8F0" />
          <circle cx="197" cy="112" r="24" fill="#C7D8F0" />
          <rect x="185" y="130" width="8" height="3" rx="1.5" fill="#7FA8D9" />
          <rect x="202" y="130" width="8" height="3" rx="1.5" fill="#7FA8D9" />
        </g>
        <g opacity="0.9">
          <rect x="330" y="120" width="42" height="88" rx="21" fill="#A9CBEF" />
          <circle cx="351" cy="104" r="24" fill="#A9CBEF" />
          <rect x="339" y="122" width="8" height="3" rx="1.5" fill="#5E8CC7" />
          <rect x="356" y="122" width="8" height="3" rx="1.5" fill="#5E8CC7" />
        </g>
        {/* highlighted figure */}
        <g>
          <rect x="252" y="104" width="48" height="100" rx="24" fill="#2563EB" />
          <circle cx="276" cy="86" r="27" fill="#2563EB" />
          <circle cx="276" cy="86" r="27" fill="url(#cx-veil-glow)" />
          <rect x="262" y="104" width="9" height="4" rx="2" fill="#ffffff" opacity="0.9" />
          <rect x="281" y="104" width="9" height="4" rx="2" fill="#ffffff" opacity="0.9" />
          <ellipse cx="276" cy="238" rx="34" ry="8" fill="#38BDF8" opacity="0.25" />
        </g>
      </g>
      <defs>
        <radialGradient id="cx-veil-glow" cx="35%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* fog */}
      <rect x="60" y="216" width="200" height="26" rx="13" fill="#F4F8FF" opacity="0.85" />
      <rect x="320" y="228" width="180" height="22" rx="11" fill="#F4F8FF" opacity="0.85" />
    </svg>
  );
}

export type ProjectArtKind = "aura" | "velo" | "nexus" | "veil";

export function ProjectArt({ kind }: { kind: ProjectArtKind }) {
  switch (kind) {
    case "aura":
      return <AuraArt />;
    case "velo":
      return <VeloArt />;
    case "nexus":
      return <NexusArt />;
    case "veil":
      return <VeilArt />;
  }
}
