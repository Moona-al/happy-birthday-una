'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { birthdayConfig } from '@/data/birthday';
import RoomScene from './RoomScene';

export default function LittleLight() {
  const router = useRouter();

  // Illumination & scene stages:
  // 0: Pitch darkness (0 - 0.9s)
  // 1: Flame only + immediate table pool (0.9s - 2.6s)
  // 2: Table artifacts emerge (2.6s - 4.4s)
  // 3: Room wall, curtain & plant shadow reveal (4.4s - 5.8s)
  // 4: Full balanced candle ambiance (5.8s+)
  const [stage, setStage] = useState(0);
  const [isLit, setIsLit] = useState(false);
  const [textStep, setTextStep] = useState(0);
  const [isExtinguishing, setIsExtinguishing] = useState(false);
  const [cursorTilt, setCursorTilt] = useState(0);
  const [candleFlicker, setCandleFlicker] = useState(1);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const addTimeout = useCallback((cb: () => void, ms: number) => {
    const id = setTimeout(cb, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Motion preference & Main entrance sequence
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      setIsReducedMotion(true);
      setIsLit(true);
      setStage(4);
      setTextStep(5);
      return;
    }

    // STEP 00: Initial Complete Pitch Darkness (0 - 900ms)
    // STEP 01: Tiny Ember / Flame Ignites
    addTimeout(() => {
      setIsLit(true);
      setStage(1);
    }, 900);

    // STEP 02: Tabletop Objects Emerge
    addTimeout(() => {
      setStage(2);
    }, 2800);

    // STEP 03: Room Background & Plant Shadow Reveal
    addTimeout(() => {
      setStage(3);
    }, 4500);

    // STEP 04: Ambient Light Settles
    addTimeout(() => {
      setStage(4);
    }, 5800);

    // STEP 05: Editorial Text Reveal Sequence
    addTimeout(() => setTextStep(1), 6300); // "CHAPTER 05"
    addTimeout(() => setTextStep(2), 7100); // "THE LITTLE LIGHT"

    // Flame gentle breath before quote
    addTimeout(() => {
      setCandleFlicker(0.88);
      setTimeout(() => setCandleFlicker(1.02), 240);
    }, 8100);

    addTimeout(() => setTextStep(3), 8500); // Main Quote
    addTimeout(() => setTextStep(4), 10600); // Personal Blessing + 07 · 10 + Name
    addTimeout(() => setTextStep(5), 12200); // Minimal "Continue →" link
  }, [addTimeout]);

  // Organic Ambient Flame Breathing
  useEffect(() => {
    if (!isLit || isExtinguishing) return;

    const interval = setInterval(() => {
      // Very slight random organic warmth flicker (0.92 to 1.04)
      const randomFlicker = 0.93 + Math.random() * 0.11;
      setCandleFlicker(randomFlicker);
    }, 220);

    return () => clearInterval(interval);
  }, [isLit, isExtinguishing]);

  // Flame Interaction: Cursor Draft Response
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || isExtinguishing || !isLit) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    // Approximate center of candle on screen
    const candleX = rect.left + rect.width * 0.5;
    const candleY = rect.top + rect.height * 0.58;

    const dx = e.clientX - candleX;
    const dy = e.clientY - candleY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 260) {
      // Gentle tilt away from or with cursor breath (-5 to +5 deg)
      const factor = (1 - dist / 260);
      const targetTilt = Math.max(-5, Math.min(5, (dx / 60) * factor));
      setCursorTilt(targetTilt);
    } else {
      setCursorTilt(0);
    }
  };

  const handleMouseLeave = () => {
    setCursorTilt(0);
  };

  // Flame micro-touch click interaction
  const handleCandleClick = () => {
    if (isExtinguishing || !isLit) return;
    // Gentle flame draft dip and rebound
    setCursorTilt(4);
    setCandleFlicker(0.82);
    setTimeout(() => {
      setCursorTilt(-3);
      setCandleFlicker(1.06);
    }, 180);
    setTimeout(() => {
      setCursorTilt(0);
      setCandleFlicker(1);
    }, 380);
  };

  // Transition to Chapter 6 (/final)
  const handleContinue = () => {
    if (isExtinguishing) return;
    setIsExtinguishing(true);

    // Sequence:
    // 1. Room darkens, leaving only flame in center
    // 2. Flame does one intimate flicker then gently extinguishes
    // 3. Screen turns pitch black
    // 4. Navigate to /final
    addTimeout(() => {
      router.push('/final');
    }, 1450);
  };

  const recipientName = birthdayConfig.name || 'Lunaa';

  return (
    <div
      ref={containerRef}
      className={`bd-little-light-stage ${
        stage >= 1 ? 'bd-little-light-stage--lit' : 'bd-little-light-stage--dark'
      } ${isExtinguishing ? 'bd-little-light-stage--extinguishing' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Chapter 05: The Little Light"
    >
      {/* ── Cinematic Camera Tracking Wrapper (Subtle slow film dolly-in) ── */}
      <div
        className={`bd-light-camera ${
          stage >= 1 && !isReducedMotion ? 'bd-light-camera--tracking' : ''
        } ${isExtinguishing ? 'bd-light-camera--zooming-extinguish' : ''}`}
      >
        {/* ── The Quiet Room Scene (Dark room, table, shadows, objects, candle) ── */}
        <RoomScene
          stage={stage}
          isLit={isLit}
          isExtinguishing={isExtinguishing}
          cursorTilt={cursorTilt}
          candleFlicker={candleFlicker}
          onCandleClick={handleCandleClick}
        />
      </div>

      {/* ── Editorial Text Overlay (Revealed quietly after the room lives) ── */}
      <div
        className={`bd-light-editorial ${
          isExtinguishing ? 'bd-light-editorial--fade-out' : ''
        }`}
      >
        {/* Step 1: CHAPTER 05 */}
        <p
          className={`bd-light-eyebrow bd-light-reveal ${
            textStep >= 1 ? 'bd-light-reveal--visible' : ''
          }`}
        >
          CHAPTER 05
        </p>

        {/* Step 2: THE LITTLE LIGHT */}
        <h2
          className={`bd-light-title bd-light-reveal ${
            textStep >= 2 ? 'bd-light-reveal--visible' : ''
          }`}
        >
          THE LITTLE LIGHT
        </h2>

        {/* Delicate divider rule */}
        <div
          className={`bd-light-divider bd-light-reveal ${
            textStep >= 2 ? 'bd-light-reveal--visible' : ''
          }`}
        />

        {/* Step 3: Main Metaphor Quote */}
        <blockquote
          className={`bd-light-quote bd-light-reveal ${
            textStep >= 3 ? 'bd-light-reveal--visible' : ''
          }`}
        >
          “Sometimes, one little light is enough to make everything feel warmer.”
        </blockquote>

        {/* Step 4: Personal Intimate Blessing */}
        <div
          className={`bd-light-personal bd-light-reveal ${
            textStep >= 4 ? 'bd-light-reveal--visible' : ''
          }`}
        >
          <p className="bd-light-personal-text">
            Dan semoga, di tahun yang baru ini, selalu ada hal-hal kecil yang
            membuat harimu terasa lebih hangat.
          </p>

          {/* Subdued birthday tether: 07 · 10 & Name */}
          <div className="bd-light-signature">
            <span className="bd-light-date">07 · 10</span>
            <span className="bd-light-dot" aria-hidden="true">·</span>
            <span className="bd-light-name">{recipientName}</span>
          </div>
        </div>

        {/* Step 5: Minimal Understated Continue Link */}
        <div
          className={`bd-light-continue-wrap bd-light-reveal ${
            textStep >= 5 ? 'bd-light-reveal--visible' : ''
          }`}
        >
          <button
            type="button"
            className="bd-light-continue-btn"
            onClick={handleContinue}
            aria-label="Continue to final chapter"
          >
            <span className="bd-light-continue-text">Continue</span>
            <span className="bd-light-continue-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>

      {/* ── Extinguish Blackout Curtain ── */}
      {isExtinguishing && (
        <div className="bd-light-blackout-veil" aria-hidden="true" />
      )}
    </div>
  );
}
