'use client'

import { useEffect, useState } from 'react'

export default function WeddingDetails() {
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
      { threshold: 0.2 }
    )

    const element = document.getElementById('wedding-details')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const details = [
    {
      icon: '📅',
      label: 'Date',
      value: '21st April, 2026',
      subtitle: 'Save the Date',
      delay: 0
    },
    {
      icon: '⏰',
      label: 'Time',
      value: '5:00 PM Onwards',
      subtitle: 'Ceremony & Reception',
      delay: 100
    },
    {
      icon: '📍',
      label: 'Venue',
      value: 'Grand Wedding Hall',
      subtitle: 'Celebration & Dinner',
      delay: 200
    }
  ]

  return (
    <section
      id="wedding-details"
      className="relative py-20 px-4 sm:py-32 bg-gradient-to-b from-background to-[#fdf5f1]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-3xl animate-heartbeat">💍</span>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="font-playfair text-4xl sm:text-6xl text-gradient font-bold mb-4">
            Wedding Details
          </h2>
          <p className="font-lora text-muted-foreground text-lg">
            Mark your calendars for our special day
          </p>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {details.map((detail, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-1000 ${
                animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${detail.delay}ms` }}
            >
              {/* Enhanced Card with gradient border and glass effect */}
              <div className="relative group h-full">
                <div className="glass rounded-3xl p-10 border-2 border-white/40 hover:border-white/60 shadow-xl hover:shadow-2xl transition-all-smooth hover:scale-105 h-full animate-glow-pulse">
                  {/* Icon with background glow */}
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl" />
                    <div className="relative text-6xl group-hover:scale-110 transition-transform animate-float">
                      {detail.icon}
                    </div>
                  </div>

                  {/* Label */}
                  <p className="text-xs font-lora text-muted-foreground uppercase tracking-[0.2em] mb-3">
                    {detail.label}
                  </p>

                  {/* Value */}
                  <p className="font-playfair text-2xl sm:text-3xl text-foreground font-bold mb-2">
                    {detail.value}
                  </p>

                  {/* Subtitle */}
                  <p className="font-lora text-sm text-muted-foreground/80 italic">
                    {detail.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info with elegant styling */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-300 ${
          animate ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto border border-white/40">
            <div className="flex justify-center gap-2 mb-4 text-2xl">
              <span className="animate-float">🥂</span>
              <span className="animate-float animation-delay-100">🍾</span>
              <span className="animate-float animation-delay-200">🍰</span>
            </div>
            <p className="font-lora text-foreground/90 leading-relaxed text-lg">
              Cocktail hour and reception to follow
            </p>
            <p className="font-lora text-muted-foreground mt-2">
              Dress code: Festive attire • Dinner will be served
            </p>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f0d9e8] rounded-full blur-3xl opacity-20 pointer-events-none -z-10" />
    </section>
  )
}
