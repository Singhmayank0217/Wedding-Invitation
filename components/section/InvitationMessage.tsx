'use client'

import { useEffect, useState } from 'react'

export default function InvitationMessage() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('invitation-message')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="invitation-message"
      className="relative py-20 px-4 sm:py-32 bg-gradient-to-b from-[#fdf5f1] to-background"
    >
      <div className="max-w-3xl mx-auto">
        {/* Main message card */}
        <div className={`transition-all duration-1000 ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm rounded-3xl border-2 border-white/80 shadow-xl" />

            {/* Content */}
            <div className="relative p-8 sm:p-12 md:p-16">
              {/* Opening decoration */}
              <div className="flex justify-center items-center gap-3 mb-8">
                <span className="text-4xl animate-float">🌸</span>
                <span className="text-5xl animate-heartbeat">✨</span>
                <span className="text-4xl animate-float animation-delay-200">🌸</span>
              </div>

              {/* Main text */}
              <div className="text-center space-y-6">
                <h3 className="font-playfair text-4xl sm:text-5xl text-gradient font-bold">
                  Together with our families
                </h3>

                <p className="font-playfair text-2xl sm:text-3xl text-foreground font-light italic leading-relaxed">
                  We joyfully invite you to witness and celebrate the union of our hearts
                </p>

                <div className="py-6">
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-primary" />
                    <span className="text-2xl animate-heartbeat">💕</span>
                    <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-primary" />
                  </div>
                </div>

                <p className="font-lora text-lg sm:text-xl text-foreground/90 leading-relaxed max-w-2xl mx-auto">
                  As we embark on this beautiful journey together, your presence and blessings would mean the world to us. Join us for an evening filled with love, laughter, joy, and cherished moments as we unite our hearts and families in celebration.
                </p>

                <div className="py-6 space-y-4 glass rounded-2xl p-6 mt-8">
                  <p className="font-lora text-base text-foreground">
                    <span className="font-bold text-primary">✨ Dress Code:</span> Festive & Elegant Attire
                  </p>
                  <p className="font-lora text-base text-foreground">
                    <span className="font-bold text-primary">🍰 Reception:</span> Dinner & Dance to follow the ceremony
                  </p>
                </div>
              </div>

              {/* Bottom decoration */}
              <div className="flex justify-center gap-4 mt-8 text-2xl">
                <span className="animate-float animate-delay-100">💕</span>
                <span className="animate-float animate-delay-200">💐</span>
                <span className="animate-float animate-delay-300">💕</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar decorations */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-6xl opacity-20 pointer-events-none animate-float">
          🌸
        </div>
        <div className="absolute right-0 top-1/4 text-5xl opacity-20 pointer-events-none animate-float animate-delay-300">
          🌺
        </div>
      </div>
    </section>
  )
}
