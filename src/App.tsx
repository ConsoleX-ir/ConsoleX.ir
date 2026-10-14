import { GooFilters } from './components/fx/GooFilters'
import { GeometricBackground } from './components/fx/GeometricBackground'
import { GrainOverlay } from './components/fx/GrainOverlay'
import { CustomCursor } from './components/fx/CustomCursor'
import { SiteHeader } from './components/site/SiteHeader'
import { HeroSection } from './components/site/HeroSection'
import { IntroSection } from './components/site/IntroSection'
import { ProjectShowcase } from './components/site/ProjectShowcase'
import { TechnologyIndex } from './components/site/TechnologyIndex'
import { ContactSection } from './components/site/ContactSection'
import { SiteFooter } from './components/site/SiteFooter'
import { useSmoothScroll } from './lib/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  return (
    <div id="top" className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-red focus:px-4 focus:py-2.5 focus:font-mono focus:text-label focus:uppercase focus:text-bg"
      >
        Skip to content
      </a>

      {/* effect layers — global mounts */}
      <GooFilters />
      <GeometricBackground />
      <GrainOverlay />
      <CustomCursor />

      <SiteHeader />

      <main id="main" className="flex-1">
        <HeroSection />
        <IntroSection />
        <ProjectShowcase />
        <TechnologyIndex />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  )
}
