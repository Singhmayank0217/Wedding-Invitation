'use client'

import { useEffect, useState } from 'react'

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownSection() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isWeddingDay, setIsWeddingDay] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const calculateTime = () => {
      // Wedding date: 21 April 2026 at 5:00 PM IST
      const weddingDate = new Date('2026-04-21T17:00:00+05:30').getTime()
      const now = new Date().getTime()
      const difference = weddingDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)
        
        setTimeRemaining({
          days,
          hours,
          minutes,
          seconds,
        })
        setIsWeddingDay(false)
      } else {
        // It's the wedding day or past!
        setIsWeddingDay(true)
        setCelebrate(true)
      }
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000) // Update every second

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-20 sm:py-28 px-4 bg-gradient-to-b from-[#faf8f7] to-[#f5e6e0] overflow-hidden">
      {/* Wedding Day Celebration Effect */}
      {isWeddingDay && celebrate && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* Confetti effect */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                fontSize: ['🎉', '🎊', '💕', '💐', '✨', '🌸', '💝'][Math.floor(Math.random() * 7)]
              }}
            >
              {['🎉', '🎊', '💕', '💐', '✨', '🌸', '💝'][i % 7]}
            </div>
          ))}
          
          {/* Center celebration message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass rounded-3xl px-12 py-16 text-center animate-scale-in shadow-2xl">
              <div className="text-8xl mb-6 animate-heartbeat">🎊💕🎉</div>
              <h2 className="font-playfair text-6xl text-gradient font-bold mb-4">Happy Wedding Day!</h2>
              <p className="font-lora text-2xl text-foreground">Priti & Roshan</p>
              <p className="font-lora text-lg text-muted-foreground mt-4">Two hearts, one love, forever together</p>
            </div>
          </div>
        </div>
      )}

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#e8d9f0] rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-52 h-52 bg-[#f0d9e8] rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Section title */}
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-primary" />
          <span className="text-4xl animate-heartbeat">⏳</span>
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-primary" />
        </div>
        <h2
          className={`font-playfair text-5xl sm:text-6xl text-gradient font-bold mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Countdown to Forever
        </h2>
        <p className={`font-lora text-lg text-muted-foreground mb-16 transition-all duration-1000 delay-100 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          Every moment brings us closer to our special day
        </p>

        {/* Countdown timer */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {/* Days */}
            <div className="flex flex-col items-center group">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 glass rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-2xl group-hover:scale-110 transition-all duration-300 animate-glow-pulse">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl" />
                <span className="relative font-playfair text-3xl sm:text-5xl font-bold text-gradient">
                  {timeRemaining.days}
                </span>
              </div>
              <div className="mt-3 space-y-1">
                <p className="font-playfair text-base sm:text-lg font-semibold text-foreground">Days</p>
                <p className="font-lora text-xs text-muted-foreground">💕</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center group">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 glass rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-2xl group-hover:scale-110 transition-all duration-300 animate-glow-pulse" style={{ animationDelay: '0.3s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl" />
                <span className="relative font-playfair text-3xl sm:text-5xl font-bold text-gradient">
                  {timeRemaining.hours}
                </span>
              </div>
              <div className="mt-3 space-y-1">
                <p className="font-playfair text-base sm:text-lg font-semibold text-foreground">Hours</p>
                <p className="font-lora text-xs text-muted-foreground">✨</p>
              </div>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center group">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 glass rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-2xl group-hover:scale-110 transition-all duration-300 animate-glow-pulse" style={{ animationDelay: '0.6s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl" />
                <span className="relative font-playfair text-3xl sm:text-5xl font-bold text-gradient">
                  {timeRemaining.minutes}
                </span>
              </div>
              <div className="mt-3 space-y-1">
                <p className="font-playfair text-base sm:text-lg font-semibold text-foreground">Minutes</p>
                <p className="font-lora text-xs text-muted-foreground">💐</p>
              </div>
            </div>

            {/* Seconds - NEW */}
            <div className="flex flex-col items-center group">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 glass rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-2xl group-hover:scale-110 transition-all duration-300 animate-glow-pulse" style={{ animationDelay: '0.9s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl" />
                <span className="relative font-playfair text-3xl sm:text-5xl font-bold text-gradient">
                  {timeRemaining.seconds}
                </span>
              </div>
              <div className="mt-3 space-y-1">
                <p className="font-playfair text-base sm:text-lg font-semibold text-foreground">Seconds</p>
                <p className="font-lora text-xs text-muted-foreground">⏱️</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative separator */}
        <div className={`mt-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-2xl text-primary animate-bounce" style={{ animationDuration: '3s' }}>
              ♥
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
