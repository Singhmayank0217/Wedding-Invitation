'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function VenuePeekSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [fallingFlowers, setFallingFlowers] = useState<Array<{ id: number; left: number; delay: number; duration: number; flower: string }>>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Venue images data with real images
  const venueImages = [
    {
      src: '/image1.png',
      title: 'Grand Entrance Hall', 
      description: 'A magnificent welcome awaits',
      icon: '🏛️'
    },
    {
      src: '/image2.png',
      title: 'Sacred Ceremony Space', 
      description: 'Where two souls unite forever',
      icon: '💒'
    },
    {
      src: '/image3.png',
      title: 'Royal Reception Hall', 
      description: 'Elegance meets celebration',
      icon: '👑'
    },
    {
      src: '/image4.png',
      title: 'Romantic Garden Venue', 
      description: 'Nature\'s beauty for your special moments',
      icon: '🌺'
    },
    {
      src: '/image5.png',
      title: 'Crystal Ballroom', 
      description: 'Dance the night away in splendor',
      icon: '✨'
    },
    {
      src: '/image6.png',
      title: 'Intimate Celebration Space', 
      description: 'Perfect for cherished memories',
      icon: '💝'
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Generate falling flowers when section becomes visible
  useEffect(() => {
    if (isVisible) {
      const flowers = ['🌸', '🌺', '🌼', '🌻', '🌷', '🏵️', '💐', '🌹']
      const newFlowers = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 8 + Math.random() * 4,
        flower: flowers[Math.floor(Math.random() * flowers.length)]
      }))
      setFallingFlowers(newFlowers)
    }
  }, [isVisible])

  // Auto-scroll images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % venueImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [venueImages.length])

  // Smooth scroll to current image
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth
      const containerWidth = scrollContainerRef.current.clientWidth
      const scrollPosition = (scrollWidth / venueImages.length) * currentImageIndex
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }, [currentImageIndex, venueImages.length])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 bg-gradient-to-b from-[#f5e6e0] to-[#faf8f7] overflow-hidden"
    >
      {/* Falling Flowers Animation */}
      {fallingFlowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute text-3xl pointer-events-none opacity-70 animate-float"
          style={{
            left: `${flower.left}%`,
            top: '-50px',
            animationDelay: `${flower.delay}s`,
            animationDuration: `${flower.duration}s`,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}
        >
          {flower.flower}
        </div>
      ))}

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 w-40 h-40 bg-[#e8d9f0] rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-52 h-52 bg-[#f0d9e8] rounded-full blur-3xl opacity-20 animate-float animation-delay-200" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-12">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-4xl animate-heartbeat">🏛️</span>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2
            className={`font-playfair text-4xl sm:text-5xl lg:text-6xl text-gradient font-bold mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Grand Wedding Hall
          </h2>
          <p className={`font-lora text-lg sm:text-xl text-muted-foreground mb-2 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            A romantic setting for unforgettable moments
          </p>
          <p className={`font-playfair text-2xl sm:text-3xl text-foreground/80 italic transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            Where Our Forever Begins ✨
          </p>
        </div>

        {/* Scrolling Image Gallery */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative">
            {/* Images container */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {venueImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center"
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 hover:border-white/90 transition-all duration-500 group cursor-pointer hover:scale-105">
                    {/* Real Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 2}
                      />
                    </div>
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    {/* Icon overlay */}
                    <div className="absolute top-4 right-4 text-5xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                      {image.icon}
                    </div>
                    
                    {/* Text overlay */}
                    <div className="absolute inset-0 flex items-end p-6">
                      <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-2 drop-shadow-2xl">
                          {image.title}
                        </h3>
                        <p className="font-lora text-sm sm:text-base text-white/90 drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity">
                          {image.description}
                        </p>
                      </div>
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-8">
              {venueImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentImageIndex 
                      ? 'bg-primary w-10 h-3' 
                      : 'bg-primary/30 w-3 h-3 hover:bg-primary/60'
                  }`}
                  aria-label={`View ${venueImages[index].title}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements below images */}
        <div className={`mt-12 flex justify-center gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-3xl sm:text-4xl animate-float">✨</span>
          <span className="text-3xl sm:text-4xl animate-float animation-delay-100">💐</span>
          <span className="text-3xl sm:text-4xl animate-heartbeat">💕</span>
          <span className="text-3xl sm:text-4xl animate-float animation-delay-200">💐</span>
          <span className="text-3xl sm:text-4xl animate-float animation-delay-300">✨</span>
        </div>
      </div>
    </section>
  )
}
