'use client'

import { useState } from 'react'

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const galleryImages = [
    { src: '/gallery/1.jpg', alt: 'Wedding Photo 1', emoji: '💕' },
    { src: '/gallery/2.jpg', alt: 'Wedding Photo 2', emoji: '💐' },
    { src: '/gallery/3.jpg', alt: 'Wedding Photo 3', emoji: '🌸' },
    { src: '/gallery/4.jpg', alt: 'Wedding Photo 4', emoji: '✨' },
    { src: '/gallery/5.jpg', alt: 'Wedding Photo 5', emoji: '💍' },
    { src: '/gallery/6.jpg', alt: 'Wedding Photo 6', emoji: '💖' },
  ]

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-[#fdf5f1]">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-4xl animate-heartbeat">📸</span>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="font-playfair text-5xl sm:text-6xl text-gradient font-bold mb-4">
            Our Gallery
          </h2>
          <p className="text-muted-foreground font-lora text-lg">
            Cherished moments captured in time
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl shadow-xl cursor-pointer group aspect-square glass border-2 border-white/40 hover:border-white/60 transition-all-smooth hover:scale-105"
              onClick={() => setSelectedImage(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-7xl mb-4 group-hover:scale-110 transition-transform animate-float">
                  {image.emoji}
                </span>
                <p className="font-playfair text-white text-xl font-semibold drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  View Photo
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-12 text-center">
          <div className="flex justify-center gap-3 text-2xl">
            <span className="animate-float">🌸</span>
            <span className="animate-heartbeat">💕</span>
            <span className="animate-float animation-delay-200">🌸</span>
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white text-5xl hover:scale-110 transition-transform w-12 h-12 flex items-center justify-center rounded-full glass"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <div className="max-w-4xl max-h-full">
              <div className="glass rounded-3xl aspect-square flex flex-col items-center justify-center p-12 border-2 border-white/20">
                <span className="text-9xl mb-6 animate-heartbeat">{galleryImages[selectedImage].emoji}</span>
                <p className="font-playfair text-white text-2xl">Beautiful Memory</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
