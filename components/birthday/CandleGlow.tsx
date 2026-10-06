'use client';

import React from 'react';

interface CandleGlowProps {
  stage: number;           // 0: darkness, 1: flame only, 2: objects, 3: room, 4: full ambient
  isExtinguishing: boolean;
  extraFlicker?: number;   // 0 to 1 subtle breath
}

/**
 * CandleGlow — Realistic dynamic multi-layered radial lighting system
 * Casts warm light onto the tabletop and surrounding room shadows without washed-out gradients.
 */
export default function CandleGlow({
  stage,
  isExtinguishing,
  extraFlicker = 1,
}: CandleGlowProps) {
  const isVisible = stage >= 1 && !isExtinguishing;

  return (
    <div
      className={`bd-candle-glow-container ${
        isVisible ? 'bd-candle-glow-container--active' : 'bd-candle-glow-container--dark'
      } ${isExtinguishing ? 'bd-candle-glow-container--extinguishing' : ''}`}
      style={{
        opacity: isVisible ? extraFlicker : 0,
      }}
      aria-hidden="true"
    >
      {/* ── Layer 1: Immediate Flame Core Radiance (Small, intense warmth) ── */}
      <div
        className={`bd-glow-layer bd-glow-layer--core bd-glow-layer--stage-${stage}`}
      />

      {/* ── Layer 2: Tabletop Golden Pool (Warms the wood and personal objects) ── */}
      <div
        className={`bd-glow-layer bd-glow-layer--table bd-glow-layer--stage-${stage}`}
      />

      {/* ── Layer 3: Soft Atmospheric Ambient Room Wash (Very faint, moody perimeter) ── */}
      <div
        className={`bd-glow-layer bd-glow-layer--room bd-glow-layer--stage-${stage}`}
      />

      {/* ── Layer 4: Deep Moody Vignette (Guarantees edges stay quiet & dark) ── */}
      <div className="bd-glow-vignette" />
    </div>
  );
}
