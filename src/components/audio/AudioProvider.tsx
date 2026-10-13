import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import trackUrl from '../../../song/cornfieldChase.mp3'

type AudioContextValue = {
  isPlaying: boolean
  isMuted: boolean
  playbackError: boolean
  togglePlayback: () => Promise<void>
  toggleMute: () => void
  startFromGesture: () => Promise<void>
}

const AudioContext = createContext<AudioContextValue | null>(null)

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(() => {
    try { return localStorage.getItem('consolex-audio-muted') === 'true' } catch { return false }
  })
  const [playbackError, setPlaybackError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const syncPlaying = () => setIsPlaying(!audio.paused)
    const markError = () => { setIsPlaying(false); setPlaybackError(true) }
    audio.addEventListener('play', syncPlaying)
    audio.addEventListener('pause', syncPlaying)
    audio.addEventListener('error', markError)
    audio.volume = 0.16
    audio.muted = isMuted
    return () => {
      audio.removeEventListener('play', syncPlaying)
      audio.removeEventListener('pause', syncPlaying)
      audio.removeEventListener('error', markError)
    }
  }, [isMuted])

  const play = useCallback(async (forceUnmute = false) => {
    const audio = audioRef.current
    if (!audio) return
    if (forceUnmute) {
      audio.muted = false
      setIsMuted(false)
      try { localStorage.setItem('consolex-audio-muted', 'false') } catch { /* preference storage is optional */ }
    }
    setPlaybackError(false)
    try { await audio.play() }
    catch { setIsPlaying(false); setPlaybackError(true) }
  }, [])

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) await play()
    else audio.pause()
  }, [play])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (audio) audio.muted = nextMuted
    try { localStorage.setItem('consolex-audio-muted', String(nextMuted)) } catch { /* preference storage is optional */ }
  }, [isMuted])

  const startFromGesture = useCallback(() => play(true), [play])
  const value = useMemo(() => ({ isPlaying, isMuted, playbackError, togglePlayback, toggleMute, startFromGesture }), [isPlaying, isMuted, playbackError, togglePlayback, toggleMute, startFromGesture])

  return <AudioContext.Provider value={value}>
    {children}
    <audio ref={audioRef} src={trackUrl} preload="none" loop aria-hidden="true" />
  </AudioContext.Provider>
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) throw new Error('useAudio must be used inside AudioProvider')
  return context
}
