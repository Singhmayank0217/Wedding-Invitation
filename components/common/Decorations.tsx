'use client'

import { useEffect, useState } from 'react'

type Flower = {
  id: number
  left: number
  delay: number
  duration: number
  flower: string
}

const FLOWERS = ['🌸', '🌺', '🌼', '🌷', '💐', '🌹']

export default function Decorations() {
  const [fallingFlowers, setFallingFlowers] = useState<Flower[]>([])

  useEffect(() => {
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 8 + Math.random() * 6,
      flower: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
    }))

    setFallingFlowers(generated)
  }, [])

  return (
    <>
      {/* Falling flower rain */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {fallingFlowers.map((flower) => (
          <div
            key={flower.id}
            className="absolute animate-fall-down opacity-70"
            style={{
              left: `${flower.left}%`,
              top: '-10%',
              animationDelay: `${flower.delay}s`,
              animationDuration: `${flower.duration}s`,
            }}
          >
            <span className="text-2xl drop-shadow-md">
              {flower.flower}
            </span>
          </div>
        ))}
      </div>

      {/* Static decorations below are SAFE */}
      {/* (no randomness = no hydration issues) */}

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">🌸</div>
        <div className="absolute top-40 right-10 text-5xl opacity-10 animate-float animate-delay-200">💐</div>
        <div className="absolute bottom-32 left-20 text-5xl opacity-10 animate-float animate-delay-300">🌺</div>
        <div className="absolute bottom-20 right-32 text-6xl opacity-10 animate-float animate-delay-400">🌸</div>

        <div className="absolute top-1/3 left-1/4 text-lg opacity-20 animate-sparkle">✨</div>
        <div className="absolute top-1/4 right-1/3 text-lg opacity-20 animate-sparkle animate-delay-200">✨</div>
        <div className="absolute bottom-1/3 right-1/4 text-lg opacity-20 animate-sparkle animate-delay-300">✨</div>
        <div className="absolute bottom-1/4 left-1/3 text-lg opacity-20 animate-sparkle animate-delay-400">✨</div>

        <div className="absolute top-1/2 left-5 text-2xl opacity-10 animate-float">💕</div>
        <div className="absolute top-2/3 right-8 text-2xl opacity-10 animate-float animate-delay-300">💕</div>
      </div>

      {/* Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#f0d9e8] to-transparent rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-[#e8d9f0] to-transparent rounded-full blur-3xl opacity-10" />
      </div>
    </>
  )
}
