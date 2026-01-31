'use client'

import { useEffect, useState } from 'react'

export default function RSVPSection() {
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

    const element = document.getElementById('rsvp-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleRSVPClick = () => {
    // WhatsApp RSVP - update with your actual number
    const phoneNumber = '+919876543210' // Replace with actual WhatsApp number
    const message = 'Hi Priti & Roushan! 💕 I would love to RSVP for your beautiful wedding on 21st April, 2026! Looking forward to celebrating with you both! '
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappLink, '_blank')
  }

  return (
    <section
      id="rsvp-section"
      className="relative py-20 px-4 sm:py-32 bg-gradient-to-b from-background to-[#fdf5f1]"
    >
      <div className="max-w-3xl mx-auto">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#f0d9e8] rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/2 -right-40 w-80 h-80 bg-[#e8d9f0] rounded-full blur-3xl opacity-20" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Section title */}
          <div className={`text-center mb-12 transition-all duration-1000 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="mb-6 text-6xl animate-heartbeat inline-block">💌</div>
            <h2 className="font-playfair text-5xl sm:text-6xl text-gradient font-bold mb-4">
              Join Our Celebration
            </h2>
            <p className="font-lora text-xl text-muted-foreground italic">
              Your presence would mean the world to us
            </p>
          </div>

          {/* Main CTA card */}
          <div className={`transition-all duration-1000 delay-200 ${
            animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="relative overflow-hidden rounded-3xl">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f0d9e8] via-[#e8d9f0] to-[#d4a5d9] opacity-40" />
              
              <div className="relative glass rounded-3xl p-12 sm:p-16 border-2 border-white/60 shadow-2xl text-center backdrop-blur-lg">
                {/* Icon with animation */}
                <div className="mb-8 flex justify-center gap-4">
                  <span className="text-5xl animate-float">💍</span>
                  <span className="text-5xl animate-heartbeat">💕</span>
                  <span className="text-5xl animate-float animation-delay-200">💐</span>
                </div>

                {/* Message */}
                <h3 className="font-playfair text-3xl sm:text-4xl text-foreground mb-4 font-bold">
                  We would be honored by your presence!
                </h3>
                <p className="font-lora text-foreground/80 text-lg sm:text-xl mb-6 max-w-xl mx-auto leading-relaxed">
                  Join us as we begin our forever together
                </p>
                <p className="font-lora text-muted-foreground text-base mb-10 max-w-lg mx-auto">
                  Please confirm your attendance by <span className="font-semibold text-primary">10th April</span> via WhatsApp
                </p>

                {/* RSVP Button */}
                <button
                  onClick={handleRSVPClick}
                  className="group relative inline-flex items-center gap-3 px-10 sm:px-14 py-5 bg-gradient-to-r from-primary via-[#d4a5d9] to-[#c97ba6] text-white rounded-full font-lora font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 animate-glow-pulse"
                >
                  <span>RSVP via WhatsApp</span>
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.2-5.002 5.885-5.002 9.794 0 1.528.235 3.034.691 4.479l-1.086 3.965 4.097-1.35c1.358.742 2.877 1.134 4.471 1.134h.004c5.569 0 10.086-4.543 10.086-10.117 0-2.699-1.088-5.235-3.066-7.132-1.977-1.897-4.505-2.94-7.061-2.94" />
                  </svg>
                </button>

                {/* Additional note */}
                <p className="mt-8 font-lora text-sm text-muted-foreground">
                  Quick & easy - no forms to fill!
                </p>
              </div>
            </div>
          </div>

          {/* Bottom decoration */}
          <div className={`mt-12 text-center transition-all duration-1000 delay-300 ${
            animate ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex justify-center gap-3 text-2xl">
              <span className="animate-float">🌸</span>
              <span className="animate-float animation-delay-100">✨</span>
              <span className="animate-float animation-delay-200">🌸</span>
            </div>
            <p className="font-playfair text-primary text-2xl italic font-light mt-6">
              We can&apos;t wait to celebrate with you!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
