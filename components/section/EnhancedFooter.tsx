'use client'

import { useEffect, useRef, useState } from 'react'

export default function EnhancedFooter() {
  const footerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [textOpacity, setTextOpacity] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Fade in text after section is visible
          const timer = setTimeout(() => setTextOpacity(1), 300)
          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.3 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-br from-[#f5e6e0]/60 via-[#faf8f7]/70 to-[#e8d9f0]/60"
    >
      {/* Subtle animated texture background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22100%22%20height=%22100%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.02%22%20numOctaves=%224%22%20result=%22noise%22%20/%3E%3C/filter%3E%3Crect%20width=%22100%22%20height=%22100%22%20fill=%22rgb(255,255,255)%22%20filter=%22url(%23noiseFilter)%22%20opacity=%220.03%22%20/%3E%3C/svg%3E')] opacity-50" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/20 rounded-full mix-blend-soft-light filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full mix-blend-soft-light filter blur-3xl animate-float animate-delay-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
        {/* Top decorative divider - Animated */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <svg
            viewBox="0 0 400 100"
            className="w-full max-w-2xl mx-auto h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <style>
                {`
                  @keyframes drawLine {
                    from { stroke-dashoffset: 1000; }
                    to { stroke-dashoffset: 0; }
                  }
                  .animated-path {
                    stroke-dasharray: 1000;
                    animation: drawLine 2s ease-out forwards;
                  }
                `}
              </style>
            </defs>
            
            {/* Floral line design */}
            <g strokeWidth="1.5" fill="none" className="text-primary/70">
              {/* Left floral flourish */}
              <path
                d="M 30 50 Q 45 35, 60 50 Q 55 65, 70 60"
                stroke="currentColor"
                className="animated-path"
              />
              
              {/* Left vine curves */}
              <circle cx="80" cy="50" r="5" fill="currentColor" opacity="0.6" />
              <path
                d="M 90 50 Q 100 40, 110 50"
                stroke="currentColor"
                opacity="0.6"
                className="animated-path"
                style={{ animationDelay: '0.2s' }}
              />

              {/* Center decorative line */}
              <line
                x1="130"
                y1="50"
                x2="270"
                y2="50"
                stroke="currentColor"
                opacity="0.4"
                className="animated-path"
                style={{ animationDelay: '0.4s' }}
              />

              {/* Center heart detail */}
              <g transform="translate(200, 50)">
                <path
                  d="M -3 -5 C -3 -7, -1 -9, 1 -9 C 3 -9, 5 -7, 5 -5 C 5 -2, 3 2, 1 3 C -1 2, -3 -2, -3 -5"
                  fill="currentColor"
                  className="animated-path"
                  style={{ animationDelay: '0.6s' }}
                />
              </g>

              {/* Right vine curves */}
              <path
                d="M 290 50 Q 300 40, 310 50"
                stroke="currentColor"
                opacity="0.6"
                className="animated-path"
                style={{ animationDelay: '0.8s' }}
              />
              <circle cx="320" cy="50" r="5" fill="currentColor" opacity="0.6" />

              {/* Right floral flourish */}
              <path
                d="M 330 50 Q 345 35, 360 50 Q 355 65, 370 60"
                stroke="currentColor"
                className="animated-path"
                style={{ animationDelay: '1s' }}
              />
            </g>
          </svg>
          
          {/* P & R initials display with animated separation */}
          <div className={`mt-8 flex items-center justify-center gap-8 md:gap-12 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <span className="font-playfair text-6xl md:text-7xl text-primary font-light">P</span>
            <span
              className="text-5xl md:text-6xl text-primary"
              style={{
                animation: isVisible ? 'bounce 3s infinite' : 'none'
              }}
            >
              ♥
            </span>
            <span className="font-playfair text-6xl md:text-7xl text-primary font-light">R</span>
          </div>
        </div>

        {/* Main invitation text - Fade in */}
        <div
          className="space-y-6 transition-opacity duration-1500"
          style={{ opacity: textOpacity }}
        >
          <p className="font-lora text-xl md:text-2xl text-foreground/80 leading-relaxed italic max-w-2xl mx-auto">
            "With love, laughter, and forever in our hearts…"
          </p>

          {/* Names in calligraphy style */}
          <div className="space-y-2">
            <h2 className="font-playfair text-5xl md:text-6xl text-primary font-semibold">
              Priti & Roshan
            </h2>
            <p className="font-lora text-lg text-foreground/60 tracking-wider">
              United in love, forever grateful
            </p>
          </div>
        </div>

        {/* Animated separator line */}
        <div className={`transition-all duration-1000 ${isVisible ? 'w-32 mx-auto h-1' : 'w-0 mx-auto h-0'} bg-gradient-to-r from-transparent via-primary to-transparent rounded-full`} />

        {/* Final heartfelt message - Soft fade */}
        <div
          className="transition-opacity duration-1500 delay-300"
          style={{ opacity: textOpacity }}
        >
          <p className="font-lora text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Thank you for being part of our love story
          </p>
          <div className="mt-6 flex justify-center gap-3 text-3xl">
            <span className="animate-sparkle">✨</span>
            <span className="animate-sparkle animate-delay-200">💕</span>
            <span className="animate-sparkle animate-delay-400">✨</span>
          </div>
        </div>


      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </footer>
  )
}
