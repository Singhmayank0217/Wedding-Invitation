"use client";

import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

type Petal = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  flower: string;
};

const FLOWERS = ["🌸", "🌺", "🌼", "🌷"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [showText, setShowText] = useState(false);
  const [progress, setProgress] = useState(0);
  const [petals, setPetals] = useState<Petal[]>([]);
  const completedRef = useRef(false);

  // 🌸 Generate falling petals ONLY on the client
  useEffect(() => {
    const generated = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 4 + Math.random() * 3,
      flower: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
    }));

    setPetals(generated);
  }, []);

  // ⏳ Loading progress animation
  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 800);

    const start = performance.now();
    const duration = 2600;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const nextProgress = Math.min(
        100,
        Math.round((elapsed / duration) * 100),
      );

      setProgress(nextProgress);

      if (nextProgress >= 100 && !completedRef.current) {
        completedRef.current = true;
        setTimeout(onComplete, 400);
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      clearTimeout(textTimer);
      cancelAnimationFrame(rafId);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#faf8f7] to-[#f5e6e0]">
      {/* 🌸 Falling petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute animate-fall-down opacity-60"
            style={{
              left: `${petal.left}%`,
              top: "-10%",
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
            }}
          >
            <span className="text-xl drop-shadow-md">{petal.flower}</span>
          </div>
        ))}
      </div>

      {/* 🌈 Background ambience */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5e6e0] via-[#f9f1ed] to-[#e8d9f0] opacity-70" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f5d9e8] rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d9e8f5] rounded-full blur-3xl opacity-20 animate-float animation-delay-200" />
      </div>

      {/* 💕 Content */}
      <div className="relative z-10 text-center px-6">
        {/* Heart icon */}
        <div className="mb-10 animate-heartbeat">
          <div className="relative inline-block">
            <div className="text-8xl md:text-9xl drop-shadow-2xl">💕</div>
            <div className="absolute inset-0 blur-2xl bg-pink-300 opacity-30 animate-pulse" />
          </div>
        </div>

        {/* Text */}
        {showText && (
          <div className="animate-fade-in space-y-4">
            <p className="font-lora text-sm uppercase tracking-[0.3em] text-[#8b5a8c]/70">
              Welcome to
            </p>

            <h2 className="font-playfair text-5xl md:text-7xl font-bold text-gradient">
              Our Love Story
            </h2>

            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#8b5a8c]" />
              <span className="text-2xl animate-heartbeat">✨</span>
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#8b5a8c]" />
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="mt-12 flex justify-center">
          <div className="w-48 h-1 bg-[#e8d9f0] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-[#c97ba6] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="mt-4 text-sm font-lora tracking-widest text-muted-foreground">
          Preparing your invitation...
        </p>
      </div>
    </div>
  );
}
