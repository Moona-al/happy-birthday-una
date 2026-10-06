'use client';

import React, { useState, useCallback, useEffect } from 'react';
import BloomingGarden from './BloomingGarden';

interface BirthdayHeroProps {
  name: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  showReplay?: boolean;
}

export default function BirthdayHero({
  name,
  eyebrow = 'for someone special',
  subtitle = 'Today is your day.',
  showReplay = true,
}: BirthdayHeroProps) {
  const [bloomKey, setBloomKey] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);
  const [isGardenInteracting, setIsGardenInteracting] = useState(false);
  const [isTextRevealed, setIsTextRevealed] = useState(false);

  // Reveal text after hero flower finishes blooming and secondary garden emerges
  useEffect(() => {
    setIsTextRevealed(false);
    // Sequence: Hero flower blooms (~1.2s) -> secondary flowers emerge (~1.8s) -> text reveals smoothly (~2.2s)
    const timer = setTimeout(() => {
      setIsTextRevealed(true);
    }, 2100);

    return () => clearTimeout(timer);
  }, [bloomKey]);

  // Replay bloom animation cleanly without page reload
  const handleBloomAgain = useCallback(() => {
    setIsReplaying(true);
    setIsTextRevealed(false);
    setBloomKey((k) => k + 1);

    setTimeout(() => {
      setIsReplaying(false);
    }, 800);
  }, []);

  // Ripple interaction when hero flower or garden is tapped/clicked
  const handleGardenInteraction = useCallback(() => {
    if (isGardenInteracting) return;
    setIsGardenInteracting(true);
    setTimeout(() => {
      setIsGardenInteracting(false);
    }, 1600);
  }, [isGardenInteracting]);

  return (
    <section
      className={`bd-hero bd-hero--garden${isGardenInteracting ? ' bd-hero--interactive-sway' : ''}`}
      aria-label="Blooming Birthday Garden Hero"
      onClick={handleGardenInteraction}
    >
      <div className="bd-grain" aria-hidden="true" />

      {/* ── EXPANDED LIVING BLOOMING GARDEN (Depth Layers & Focal Point) ── */}
      <BloomingGarden
        bloomKey={bloomKey}
        isInteracting={isGardenInteracting}
        onHeroClick={handleGardenInteraction}
      />

      {/* ── HERO TYPOGRAPHY CONTENT (Focal Point — Always clearly visible & prominent) ── */}
      <div className="bd-hero__inner bd-hero__inner--garden">
        {/* Soft radial scrim to ensure 100% typography contrast over garden */}
        <div className="bd-hero__text-scrim" aria-hidden="true" />

        <div
          className={`bd-hero__text bd-hero__text--revealed-${isTextRevealed ? 'yes' : 'no'}`}
        >
          {/* Eyebrow with sparkling breathing */}
          <div className="bd-hero__eyebrow-wrap">
            <span className="bd-hero__sparkle" aria-hidden="true">✦</span>
            <p className="bd-hero__eyebrow">{eyebrow}</p>
            <span className="bd-hero__sparkle" aria-hidden="true">✦</span>
          </div>

          {/* Main Title: HAPPY BIRTHDAY with subtle ambient breathing (opacity 1 -> 0.97 -> 1) */}
          <h1 className="bd-hero__title bd-hero__title--breathe">
            <span className="bd-hero__title-line bd-hero__title-top">HAPPY</span>
            <span className="bd-hero__title-line bd-hero__title-bottom">BIRTHDAY</span>
          </h1>

          {/* Honoree Name */}
          <p className="bd-hero__name bd-hero__name--breathe">
            {name}
          </p>

          {/* Subtitle / Personal Greeting */}
          <p className="bd-hero__subtitle">
            {subtitle}
          </p>

          {/* Replay Button ("↻ Bloom again") */}
          {showReplay && (
            <div className="bd-hero__replay-wrap" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={handleBloomAgain}
                className={`bd-replay-btn${isReplaying ? ' bd-replay-btn--active' : ''}`}
                aria-label="Play flower garden blooming animation again"
                title="Watch the garden bloom again"
              >
                <svg
                  className="bd-replay-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19" />
                </svg>
                <span>Bloom again</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
