'use client'

import { useState, useRef, useEffect } from 'react'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [show, setShow] = useState(false)
  const [volume, setVolume] = useState(1)
  const [hasInteracted, setHasInteracted] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  // Show player smoothly
  useEffect(() => {
    setShow(true)
  }, [])

  // 🔊 Attempt autoplay (muted — allowed)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = true
    audio.volume = 0
    audio.play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        // ignored — browser blocked
      })
  }, [])

  // 🎯 Unmute on first user interaction
  useEffect(() => {
    const unlockAudio = () => {
      if (!audioRef.current) return

      audioRef.current.muted = false
      audioRef.current.volume = volume
      setHasInteracted(true)

      window.removeEventListener('click', unlockAudio)
      window.removeEventListener('touchstart', unlockAudio)
      window.removeEventListener('scroll', unlockAudio)
    }

    window.addEventListener('click', unlockAudio, { once: true })
    window.addEventListener('touchstart', unlockAudio, { once: true })
    window.addEventListener('scroll', unlockAudio, { once: true })

    return () => {
      window.removeEventListener('click', unlockAudio)
      window.removeEventListener('touchstart', unlockAudio)
      window.removeEventListener('scroll', unlockAudio)
    }
  }, [volume])

  // 📉 Fade out near footer
  useEffect(() => {
    const handleScroll = () => {
      if (!audioRef.current) return

      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      if (scrollTop + windowHeight > documentHeight * 0.8) {
        const fade =
          1 -
          (scrollTop + windowHeight - documentHeight * 0.8) /
            (documentHeight * 0.2)

        const clamped = Math.max(0, Math.min(1, fade))
        setVolume(clamped)
        audioRef.current.volume = clamped
      } else {
        setVolume(1)
        audioRef.current.volume = 1
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <section
      className={`sticky top-0 z-40 py-6 px-4 transition-opacity duration-500 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center gap-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm border border-[#f0d9e8]/50">
          <button
            onClick={togglePlay}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white hover:shadow-md transition-shadow"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="flex-1">
            <p className="text-sm font-playfair font-semibold">
              {isPlaying ? '♫ Playing' : '♪ Tap to play'}
            </p>
            <p className="text-xs text-muted-foreground">
              Romantic instrumental
            </p>
          </div>

          <div className="flex-shrink-0 text-lg animate-float">
            {isPlaying ? '🎵' : '🎶'}
          </div>
        </div>
      </div>

      {/* 🎵 Audio element */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2703/2703-preview.mp3"
        loop
        preload="auto"
      />
    </section>
  )
}
