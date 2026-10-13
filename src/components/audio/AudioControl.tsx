import { useAudio } from './AudioProvider'

export default function AudioControl() {
  const { isPlaying, isMuted, playbackError, togglePlayback, toggleMute } = useAudio()
  return <div className="fixed bottom-[17px] right-[18px] z-30 flex items-center gap-2 border border-white/25 bg-[#0d0e0e] px-2 py-[5px] max-[520px]:bottom-[10px] max-[520px]:right-[10px] max-[520px]:gap-[3px]" role="group" aria-label="Background music controls">
    <button className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-[5px] font-mono text-[8px] text-neutral-300 max-[520px]:text-[7px]" type="button" onClick={() => void togglePlayback()} aria-label={isPlaying ? 'Pause background music' : 'Play background music'} aria-pressed={isPlaying}>
      <span className={`sound-bars ${isPlaying ? 'is-playing' : ''}`} aria-hidden="true"><i /><i /><i /><i /></span>
      <span>{isPlaying ? 'Music on' : playbackError ? 'Try music' : 'Music off'}</span>
    </button>
    <button className="inline-flex cursor-pointer items-center border-0 border-l border-white/20 bg-transparent py-[5px] pl-[11px] font-mono text-[8px] text-neutral-400 max-[520px]:text-[7px]" type="button" onClick={toggleMute} aria-label={isMuted ? 'Unmute background music' : 'Mute background music'} aria-pressed={isMuted}>{isMuted ? 'Unmute' : 'Mute'}</button>
    {playbackError && <span className="absolute bottom-[calc(100%+8px)] right-0 w-max max-w-[240px] border border-white/25 bg-[#0d0e0e] px-2.5 py-2 font-mono text-[8px] leading-normal text-red-200" role="status">Audio couldn’t start. Try again.</span>}
  </div>
}
