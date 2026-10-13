type ProjectArtworkProps = { compact?: boolean }

export default function ProjectArtwork({ compact = false }: ProjectArtworkProps) {
  return <div className={`aura-artwork ${compact ? 'aura-artwork-compact' : ''}`} role="img" aria-label="Abstract Aura Player visual study, not a screenshot of the application">
    <div className="aura-art-grid" />
    <div className="aura-ring aura-ring-outer" /><div className="aura-ring aura-ring-middle" /><div className="aura-ring aura-ring-inner" />
    <div className="aura-disc"><span>A</span></div>
    <div className="aura-art-caption">AURA / VISUAL STUDY <span>NOT AN APP SCREENSHOT</span></div>
    <div className="aura-art-index">01 — SOUND IN SPACE</div>
  </div>
}
