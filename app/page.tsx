'use client'

import { useState } from 'react'
import LoadingScreen from '@/components/section/LoadingScreen'
import Navbar from '@/components/common/Navbar'

import ScrollProgress from '@/components/common/ScrollProgress'
import Hero from '@/components/section/Hero'
import LoveStorySection from '@/components/section/LoveStorySection'
import WeddingDetails from '@/components/section/WeddingDetails'
import CountdownSection from '@/components/section/CountdownSection'
import VenuePeekSection from '@/components/section/VenuePeekSection'
import GallerySection from '@/components/section/GallerySection'
import InvitationMessage from '@/components/section/InvitationMessage'
import RSVPSection from '@/components/section/RSVPSection'
import Decorations from '@/components/common/Decorations'
import EnhancedFooter from '@/components/section/EnhancedFooter'
import NoteFromUs from '@/components/section/NoteFromUs'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* =========================
          INTRO → VIDEO
      ========================= */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* =========================
          MAIN PAGE
      ========================= */}
      {!isLoading && (
        <main className="relative w-full bg-background text-foreground overflow-x-hidden animate-fade-in">
          <Navbar />
          <ScrollProgress />
          <Decorations />

          {/* Cinematic sections */}
          <Hero />
          <div id="story">
            <LoveStorySection />
          </div>
          <div id="details">
            <WeddingDetails />
          </div>
          <CountdownSection />
          <VenuePeekSection />
          <div id="gallery">
            <GallerySection />
          </div>
          <InvitationMessage />
          <NoteFromUs />
          <div id="rsvp">
            <RSVPSection />
          </div>
          <EnhancedFooter />
        </main>
      )}
    </>
  )
}
