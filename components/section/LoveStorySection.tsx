'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface StoryStep {
  id: number
  title: string
  description: string
  image: string
  emoji: string
}

const storySteps: StoryStep[] = [
  {
    id: 1,
    title: 'When Two Hearts Met...',
    description: 'In the perfect moment orchestrated by fate, two souls crossed paths. What started as a simple hello blossomed into endless conversations, shared dreams, and the realization that we had found something truly special.',
    image: '/couple-1.jpg',
    emoji: '✨'
  },
  {
    id: 2,
    title: 'Forever Begins Today',
    description: 'From coffee dates to sunset walks, from shared laughter to comforting silences - every moment led us here. Now, surrounded by love, we\'re ready to write the greatest chapter of our story: Forever Together.',
    image: '/couple-2.jpg',
    emoji: '💍'
  }
]

export default function LoveStorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height
      
      // Calculate how much of the element is visible in the viewport
      // When element is just entering (top of element at bottom of window), progress = 0
      // When element is fully visible, progress increases
      // When element leaves viewport, progress = 1
      
      const totalDistance = windowHeight + elementHeight
      const distanceScrolled = windowHeight - elementTop
      
      // Clamp progress between 0 and 1
      const progress = Math.max(0, Math.min(1, distanceScrolled / totalDistance))
      
      setScrollProgress(progress)
      
      // Change step based on scroll progress - smoother transitions
      const step = Math.floor(progress * 2)
      setCurrentStep(Math.min(step, storySteps.length - 1))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Call once on mount to set initial state
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-background to-[#faf8f7]">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-4xl animate-heartbeat">💕</span>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="font-playfair text-5xl sm:text-6xl text-gradient font-bold mb-4">
            Our Love Story
          </h2>
          <p className="font-lora text-muted-foreground text-lg">
            The journey that brought us together
          </p>
        </div>

        {/* Story grid - image and text side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image side - with parallax effect */}
          <div className="relative h-96 lg:h-screen flex items-center justify-center">
            <div className="relative w-full h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/90 animate-glow-pulse">
              {storySteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    currentStep === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f0d9e8]/30 to-[#e8d9f0]/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4 animate-heartbeat">{step.emoji}</div>
                      <p className="font-playfair text-2xl text-white drop-shadow-lg">Beautiful Moments</p>
                    </div>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              ))}
            </div>
          </div>

          {/* Text side - with fade and slide animations */}
          <div className="space-y-8">
            {storySteps.map((step, index) => (
              <div
                key={step.id}
                className={`transition-all duration-700 ${
                  currentStep === index
                    ? 'opacity-100 translate-x-0'
                    : currentStep > index
                      ? 'opacity-50 translate-x-[-20px]'
                      : 'opacity-30 translate-x-[20px]'
                }`}
              >
                <div className="glass rounded-3xl p-8 border-2 border-white/40">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl mt-1 animate-float">{step.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-playfair text-3xl sm:text-4xl text-gradient font-bold mb-4">
                        {step.title}
                      </h3>
                      <p className="font-lora text-lg text-foreground/90 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Progress indicator */}
                      <div className="mt-6 flex gap-2">
                        {storySteps.map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 rounded-full transition-all duration-500 ${
                              i <= currentStep ? 'w-12 bg-gradient-to-r from-primary to-secondary' : 'w-3 bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
