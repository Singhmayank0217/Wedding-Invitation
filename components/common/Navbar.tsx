'use client'

import { useState, useRef, useEffect } from 'react'

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Auto-play music on page load
  useEffect(() => {
  const startMusic = () => {
    if (!audioRef.current) return

    audioRef.current.volume = 1
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {})

    window.removeEventListener('click', startMusic)
    window.removeEventListener('touchstart', startMusic)
    window.removeEventListener('keydown', startMusic)
  }

  window.addEventListener('click', startMusic, { once: true })
  window.addEventListener('touchstart', startMusic, { once: true })
  window.addEventListener('keydown', startMusic, { once: true })

  return () => {
    window.removeEventListener('click', startMusic)
    window.removeEventListener('touchstart', startMusic)
    window.removeEventListener('keydown', startMusic)
  }
}, [])


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      return
    }
    audioRef.current.play().catch(() => {
      console.log('Autoplay prevented')
    })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setShowMenu(false)
    }
  }

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'story', label: 'Our Story', icon: '💕' },
    { id: 'details', label: 'Details', icon: '📅' },
    { id: 'gallery', label: 'Gallery', icon: '📸' },
    { id: 'rsvp', label: 'RSVP', icon: '💌' }
  ]

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/info3.mpeg" type="audio/mpeg" />
      </audio>

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass backdrop-blur-xl shadow-2xl border-b border-white/20 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo/Names */}
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative text-3xl animate-heartbeat">💕</div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-playfair text-2xl font-bold text-gradient">
                  P & R
                </h1>
                <p className="font-lora text-xs text-muted-foreground">21.04.2026</p>
              </div>
            </div>

            {/* Center Navigation - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-2 rounded-full font-lora text-sm text-foreground/80 hover:text-foreground hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Right Side - Music Player & Menu */}
            <div className="flex items-center gap-4">
              {/* Music Player Button */}
              <div className="relative group">
                <button
                  onClick={togglePlay}
                  className="relative glass px-4 py-2 rounded-full border-2 border-white/40 hover:border-white/60 transition-all duration-300 hover:scale-110 flex items-center gap-2 animate-glow-pulse"
                  aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                  <div className="relative">
                    {isPlaying ? (
                      <>
                        <span className="text-xl animate-pulse">🎵</span>
                        <div className="absolute -inset-1 bg-primary/20 rounded-full animate-ping" />
                      </>
                    ) : (
                      <span className="text-xl">🎵</span>
                    )}
                  </div>
                  <span className="hidden sm:inline font-lora text-sm text-foreground font-semibold">
                    {isPlaying ? 'Now Playing' : 'Play Music'}
                  </span>
                </button>
                
                {/* Tooltip */}
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1 glass rounded-lg text-xs font-lora text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {isPlaying ? '♫' : 'Click to play'}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="md:hidden glass p-3 rounded-full border-2 border-white/40 hover:border-white/60 transition-all"
                aria-label="Menu"
              >
                <div className="space-y-1.5">
                  <div className={`w-5 h-0.5 bg-foreground transition-transform ${showMenu ? 'rotate-45 translate-y-2' : ''}`} />
                  <div className={`w-5 h-0.5 bg-foreground transition-opacity ${showMenu ? 'opacity-0' : ''}`} />
                  <div className={`w-5 h-0.5 bg-foreground transition-transform ${showMenu ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ${
              showMenu ? 'max-h-96 mt-6' : 'max-h-0'
            }`}
          >
            <div className="glass rounded-2xl p-4 border border-white/20 space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full px-4 py-3 rounded-xl font-lora text-sm text-foreground hover:bg-white/10 transition-all duration-300 flex items-center gap-3 animate-slide-in-left`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
