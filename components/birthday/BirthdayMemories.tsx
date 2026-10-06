'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Memory } from '@/data/birthday';
import MemoryString, { type StringLightItem, type StringPhotoItem } from './MemoryString';

interface BirthdayMemoriesProps {
  memories: Memory[];
  heading?: string;
  subtitle?: string;
  transitionText?: string;
}

export default function BirthdayMemories({
  memories,
  heading = 'A collection\nof little moments.',
  subtitle = '',
  transitionText = "Before we look ahead,\nlet's remember a few moments.",
}: BirthdayMemoriesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isStringDrawn, setIsStringDrawn] = useState(false);
  const [areLightsOn, setAreLightsOn] = useState(false);
  const [arePhotosVisible, setArePhotosVisible] = useState(false);

  // IntersectionObserver to trigger cinematic entrance sequence
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Orchestrate Entrance Sequence:
  // Page in view -> String draws (1.4s) -> Lights turn on 1-by-1 -> Polaroids drop & settle
  useEffect(() => {
    if (!isInView) return;

    // 1. String begins drawing
    const timer1 = setTimeout(() => {
      setIsStringDrawn(true);
    }, 150);

    // 2. Lights start turning on sequentially
    const timer2 = setTimeout(() => {
      setAreLightsOn(true);
    }, 700);

    // 3. Polaroids drop from above with gentle spring
    const timer3 = setTimeout(() => {
      setArePhotosVisible(true);
    }, 1550);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isInView]);

  const headingLines = heading.split('\n');
  const transitionLines = transitionText.split('\n');

  // ── DESKTOP STRING CONFIGURATION ──
  // Tier 1 (Upper rope): 2 Polaroids, 6 fairy lights
  const tier1Photos: StringPhotoItem[] = [];
  if (memories[0]) {
    tier1Photos.push({
      memory: memories[0],
      originalIndex: 0,
      t: 0.28,
      hangerHeight: memories[0].offsetY || 24,
    });
  }
  if (memories[1]) {
    tier1Photos.push({
      memory: memories[1],
      originalIndex: 1,
      t: 0.72,
      hangerHeight: memories[1].offsetY || 42,
    });
  }

  const tier1Lights: StringLightItem[] = [
    { t: 0.07, idleDelay: 0.2, idleDuration: 4.2 },
    { t: 0.20, idleDelay: 1.1, idleDuration: 5.1 },
    { t: 0.40, idleDelay: 0.7, idleDuration: 3.9 },
    { t: 0.58, idleDelay: 1.8, idleDuration: 4.7 },
    { t: 0.78, idleDelay: 0.4, idleDuration: 5.4 },
    { t: 0.93, idleDelay: 1.5, idleDuration: 4.1 },
  ];

  // Tier 2 (Lower rope): 2 Polaroids, 6 fairy lights
  const tier2Photos: StringPhotoItem[] = [];
  if (memories[2]) {
    tier2Photos.push({
      memory: memories[2],
      originalIndex: 2,
      t: 0.32,
      hangerHeight: memories[2].offsetY || 28,
    });
  }
  if (memories[3]) {
    tier2Photos.push({
      memory: memories[3],
      originalIndex: 3,
      t: 0.68,
      hangerHeight: memories[3].offsetY || 38,
    });
  }

  const tier2Lights: StringLightItem[] = [
    { t: 0.06, idleDelay: 0.9, idleDuration: 4.6 },
    { t: 0.22, idleDelay: 1.4, idleDuration: 3.8 },
    { t: 0.36, idleDelay: 0.3, idleDuration: 5.2 },
    { t: 0.52, idleDelay: 1.9, idleDuration: 4.4 },
    { t: 0.67, idleDelay: 0.8, idleDuration: 4.9 },
    { t: 0.82, idleDelay: 1.2, idleDuration: 3.7 },
    { t: 0.95, idleDelay: 0.5, idleDuration: 5.0 },
  ];

  // Subtle ambient dust particles (3 to 6 particles, very slow organic movement)
  const dustParticles = [
    { top: '15%', left: '12%', duration: '22s', delay: '0s', size: 3 },
    { top: '35%', left: '88%', duration: '28s', delay: '4s', size: 4 },
    { top: '65%', left: '8%', duration: '25s', delay: '8s', size: 2.5 },
    { top: '80%', left: '82%', duration: '30s', delay: '2s', size: 3.5 },
    { top: '48%', left: '52%', duration: '26s', delay: '12s', size: 3 },
  ];

  return (
    <section
      ref={sectionRef}
      className="bd-memories bd-memories--memory-wall"
      aria-label="Wall of Memories"
    >
      {/* ── AMBIENT WARM BEDROOM DUST PARTICLES ── */}
      <div className="bd-memories__dust-container" aria-hidden="true">
        {dustParticles.map((p, i) => (
          <span
            key={`dust-${i}`}
            className="bd-memories__dust-particle"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="bd-memories__inner">
        {/* ── SECTION TRANSITION COPY ── */}
        <div
          className={`bd-memories__transition bd-fade-up${
            isInView ? ' bd-fade-up--in' : ''
          }`}
        >
          {transitionLines.map((line, i) => (
            <p key={i} className="bd-memories__transition-line">
              {line}
            </p>
          ))}
        </div>

        {/* ── SECTION HEADER ── */}
        <div
          className={`bd-memories__header bd-fade-up${
            isInView ? ' bd-fade-up--in' : ''
          }`}
          style={{ transitionDelay: '0.15s' }}
        >
          <p className="bd-eyebrow">chapter 03</p>
          <h2 className="bd-memories__heading">
            {headingLines.map((line, i) => (
              <span key={i} className="bd-memories__heading-line">
                {line}
              </span>
            ))}
          </h2>
          {subtitle ? <p className="bd-memories__subtitle">{subtitle}</p> : null}
        </div>


        {/* ── DESKTOP MEMORY WALL (2 CURVED STRING TIERS) ── */}
        <div
          className="bd-memory-wall bd-memory-wall--desktop"
          role="region"
          aria-label="Desktop memory wall with hanging polaroid photos"
        >
          {/* Upper String Section */}
          <div className="bd-memory-wall__tier bd-memory-wall__tier--1">
            <MemoryString
              stringId="desktop-tier-1"
              yBase={22}
              sag={30}
              lights={tier1Lights}
              photos={tier1Photos}
              isDrawn={isStringDrawn}
              areLightsOn={areLightsOn}
              arePhotosVisible={arePhotosVisible}
            />
          </div>

          {/* Lower String Section */}
          <div className="bd-memory-wall__tier bd-memory-wall__tier--2">
            <MemoryString
              stringId="desktop-tier-2"
              yBase={20}
              sag={26}
              lights={tier2Lights}
              photos={tier2Photos}
              isDrawn={isStringDrawn}
              areLightsOn={areLightsOn}
              arePhotosVisible={arePhotosVisible}
            />
          </div>
        </div>

        {/* ── MOBILE MEMORY WALL (VERTICAL / ZIG-ZAG SECTIONS) ── */}
        <div
          className="bd-memory-wall bd-memory-wall--mobile"
          role="region"
          aria-label="Mobile memory wall with polaroid photo segments"
        >
          {memories.map((memory, index) => {
            const rot = Math.max(-4, Math.min(4, memory.rotation));
            const clampedMemory = { ...memory, rotation: rot };
            const isAlt = index % 2 === 1;

            return (
              <div
                key={`mobile-seg-${index}`}
                className={`bd-memory-wall__mobile-segment bd-memory-wall__mobile-segment--${
                  isAlt ? 'right' : 'left'
                }`}
              >
                <MemoryString
                  stringId={`mobile-${index}`}
                  yBase={16}
                  sag={18}
                  lights={[
                    { t: 0.16, idleDelay: 0.3 * index, idleDuration: 4.2 },
                    { t: 0.50, idleDelay: 0.6 * index, idleDuration: 4.8 },
                    { t: 0.84, idleDelay: 0.9 * index, idleDuration: 3.9 },
                  ]}
                  photos={[
                    {
                      memory: clampedMemory,
                      originalIndex: index,
                      t: isAlt ? 0.56 : 0.44,
                      hangerHeight: 28,
                    },
                  ]}
                  isDrawn={isStringDrawn}
                  areLightsOn={areLightsOn}
                  arePhotosVisible={arePhotosVisible}
                />
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
