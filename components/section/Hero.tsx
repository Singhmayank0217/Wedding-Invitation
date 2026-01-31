'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [animate, setAnimate] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [fallingFlowers, setFallingFlowers] = useState<
    Array<{ id: number; left: number; delay: number; duration: number; flower: string }>
  >([])

  useEffect(() => {
    setAnimate(true)

    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }))
    setParticles(newParticles)

    // Generate falling flowers
    const flowers = ['🌸', '🌺', '🌼', '🌷', '💐', '🌹']
    const newFallingFlowers = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 6 + Math.random() * 4,
      flower: flowers[Math.floor(Math.random() * flowers.length)]
    }))
    setFallingFlowers(newFallingFlowers)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 py-32 sm:py-40 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f7] via-[#f9f1ed] to-[#f5e6e0]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(240,217,232,0.3),transparent_50%)]" />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float-rotate blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        />
      ))}

      {/* Falling flowers at start */}
      {fallingFlowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute pointer-events-none animate-fall-down"
          style={{
            left: `${flower.left}%`,
            top: '-10%',
            animationDelay: `${flower.delay}s`,
            animationDuration: `${flower.duration}s`
          }}
        >
          <span className="text-2xl sm:text-3xl drop-shadow-md">{flower.flower}</span>
        </div>
      ))}

      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 w-64 h-64 bg-[#f0d9e8] rounded-full blur-3xl opacity-40 animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#e8d9f0] rounded-full blur-3xl opacity-40 animate-float animation-delay-200" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-[#d4a5d9] rounded-full blur-3xl opacity-20 animate-float-rotate" />
        {/* Floating hearts */}
        <div className="absolute top-20 right-20 text-4xl opacity-20 animate-float-rotate">💝</div>
        <div className="absolute bottom-40 left-20 text-3xl opacity-15 animate-float animation-delay-400">🌸</div>
        <div className="absolute top-40 right-1/4 text-2xl opacity-20 animate-float animation-delay-300">💫</div>
        <div className="absolute bottom-1/3 right-1/3 text-3xl opacity-15 animate-float animation-delay-500">✨</div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Decorative top element */}
        <div className={`mb-8 transition-all duration-1000 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="text-4xl sm:text-5xl animate-float animation-delay-100">🌹</div>
            <div className="text-5xl sm:text-6xl animate-heartbeat inline-block">✨</div>
            <div className="text-4xl sm:text-5xl animate-float animation-delay-200">🌹</div>
          </div>
        </div>

        {/* Romantic tagline */}
        <div className={`transition-all duration-1000 delay-100 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <p className="font-lora text-sm sm:text-base text-muted-foreground/80 uppercase tracking-[0.3em] mb-8">
            ✦ A Celebration of Love ✦
          </p>
        </div>

        {/* Main heading with enhanced styling */}
        <div className={`transition-all duration-1000 delay-200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block mb-8">
            <h1 className="font-playfair text-7xl sm:text-8xl lg:text-9xl font-bold text-gradient leading-none">
              You&apos;re Invited
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-2xl -z-10" />
          </div>
        </div>

        {/* Decorative ornamental line */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className={`h-[2px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-primary to-primary transition-all duration-1000 delay-300 ${
            animate ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
          <div className={`transition-all duration-1000 delay-400 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
            <div className="flex gap-2">
              <span className="text-3xl animate-heartbeat">💕</span>
            </div>
          </div>
          <div className={`h-[2px] w-16 sm:w-24 bg-gradient-to-l from-transparent via-primary to-primary transition-all duration-1000 delay-300 ${
            animate ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
        </div>

        {/* Couple names with ultra elegant styling */}
        <div className={`transition-all duration-1000 delay-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass rounded-3xl px-8 sm:px-16 py-12 border-2 border-white/60 shadow-2xl backdrop-blur-xl inline-block">
            <div className="mb-4">
              <h2 className="font-playfair text-6xl sm:text-8xl text-primary mb-2 tracking-wide drop-shadow-lg">
                Priti
              </h2>
              <div className="flex items-center justify-center gap-6 my-6">
                <div className="h-[2px] w-20 bg-gradient-to-r from-transparent to-muted-foreground/30" />
                <span className="text-4xl font-light text-gradient animate-heartbeat">&</span>
                <div className="h-[2px] w-20 bg-gradient-to-l from-transparent to-muted-foreground/30" />
              </div>
              <h2 className="font-playfair text-6xl sm:text-8xl text-primary tracking-wide drop-shadow-lg">
                Roshan
              </h2>
            </div>
            
            {/* Save the date badge */}
            <div className="mt-8 inline-flex items-center gap-3 glass px-6 py-3 rounded-full border border-white/40">
              <span className="text-2xl animate-pulse">💍</span>
              <div>
                <p className="font-lora text-xs text-muted-foreground uppercase tracking-widest">Save the Date</p>
                <p className="font-playfair text-2xl font-bold text-foreground">21 • 04 • 2026</p>
              </div>
              <span className="text-2xl animate-pulse">💍</span>
            </div>
          </div>
        </div>

        {/* Romantic quote */}
        <div className={`mt-12 transition-all duration-1000 delay-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-playfair text-xl sm:text-2xl text-foreground/80 italic mb-6 max-w-3xl mx-auto leading-relaxed">
            "In all the world, there is no heart for me like yours.<br />In all the world, there is no love for you like mine."
          </p>
          <p className="font-lora text-sm text-muted-foreground">— Maya Angelou</p>
        </div>

        {/* Bottom decoration with more romance */}
        <div className={`mt-16 transition-all duration-1000 delay-800 ${animate ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-center gap-4 sm:gap-6 text-4xl sm:text-5xl mb-8">
            <span className="animate-float">🌸</span>
            <span className="animate-float animation-delay-100">💐</span>
            <span className="animate-heartbeat">💕</span>
            <span className="animate-float animation-delay-200">💐</span>
            <span className="animate-float animation-delay-300">🌸</span>
          </div>
          <p className="font-lora text-sm text-muted-foreground/70 italic">
            &ldquo;Two hearts, one love, forever together&rdquo;
          </p>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-900 ${
        animate ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex flex-col items-center gap-3">
          <p className="font-lora text-xs text-muted-foreground uppercase tracking-widest">Scroll to Explore</p>
          <div className="animate-bounce text-muted-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}