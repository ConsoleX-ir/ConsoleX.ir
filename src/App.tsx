import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { AudioProvider, useAudio } from './components/audio/AudioProvider'
import AudioControl from './components/audio/AudioControl'
import SiteHeader from './components/navigation/SiteHeader'
import WelcomeIntro from './components/effects/WelcomeIntro'
import { usePageMotion } from './hooks/usePageMotion'
import HomePage from './pages/HomePage'
import AuraPlayerPage from './pages/AuraPlayerPage'
import NotFoundPage from './pages/NotFoundPage'
import SiteFooter from './components/layout/SiteFooter'

function PortfolioShell() {
  const location = useLocation()
  const { startFromGesture } = useAudio()
  const [introOpen, setIntroOpen] = useState(() => {
    try { return sessionStorage.getItem('consolex-intro-seen') !== 'true' }
    catch { return true }
  })

  usePageMotion(location.pathname, location.hash)

  useEffect(() => {
    const title = location.pathname === '/projects/aura-player' ? 'Aura Player — ConsoleX' : location.pathname === '/' ? 'Console — ConsoleX' : 'Page not found — ConsoleX'
    document.title = title
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
  }, [location.pathname])

  const dismissIntro = useCallback(() => {
    try { sessionStorage.setItem('consolex-intro-seen', 'true') } catch { /* storage is optional */ }
    setIntroOpen(false)
    window.requestAnimationFrame(() => document.getElementById('main-content')?.focus())
  }, [])
  const enterWithSound = useCallback(() => { void startFromGesture() }, [startFromGesture])

  return <div className="relative min-h-screen overflow-clip bg-ink text-paper selection:bg-accent selection:text-paper">
    <div className="ambient-grid" aria-hidden="true" />
    <div inert={introOpen ? true : undefined}>
      <a className="absolute left-4 top-[-80px] z-[100] bg-paper px-4 py-3 text-ink focus:top-4" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="relative z-1" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/aura-player" element={<AuraPlayerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
      <AudioControl />
    </div>
    {introOpen && <WelcomeIntro onContinue={dismissIntro} onEnterWithSound={enterWithSound} />}
  </div>
}

export default function App() {
  return <AudioProvider><PortfolioShell /></AudioProvider>
}
