'use client'

import { useEffect, useRef, useState } from 'react'

export default function NoteFromUs() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 bg-gradient-to-b from-[#faf8f7] to-[#f5e6e0]"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#f0d9e8] rounded-full blur-3xl opacity-25 animate-float animate-delay-100" />
        <div className="absolute bottom-0 left-0 w-52 h-52 bg-[#e8d9f0] rounded-full blur-3xl opacity-25" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Top decoration */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <span className="text-4xl sm:text-5xl">💕</span>
        </div>

        {/* Decorative line */}
        <div
          className={`w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-10 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />

        {/* Main message */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="font-lora text-lg sm:text-2xl text-foreground leading-relaxed mb-8">
            Your love and blessings mean the world to us. We can't wait to begin this new chapter with you by our side.
          </p>

          {/* Signature */}
          <p className="font-playfair text-2xl sm:text-3xl text-primary font-light mt-6">
            Priti & Roshan
          </p>
        </div>

        {/* Bottom decoration */}
        <div
          className={`mt-10 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex justify-center gap-4">
            <span className="text-2xl sm:text-3xl animate-float">✨</span>
            <span className="text-2xl sm:text-3xl animate-float animate-delay-150">💐</span>
            <span className="text-2xl sm:text-3xl animate-float animate-delay-300">✨</span>
          </div>
        </div>
      </div>
    </section>
  )
}
