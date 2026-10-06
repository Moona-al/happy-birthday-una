'use client';

import React from 'react';

interface CandleFlameProps {
  isLit: boolean;
  isExtinguishing: boolean;
  cursorTilt?: number; // degrees of tilt based on nearby cursor (-6 to 6)
  intensity?: number;  // 0 to 1
}

/**
 * CandleFlame — Realistic, multi-layered SVG candle flame with natural draft physics
 * Consists of glowing wick, blue base aura, core flame, luminous inner tear, and smoke wisp on extinguish.
 */
export default function CandleFlame({
  isLit,
  isExtinguishing,
  cursorTilt = 0,
  intensity = 1,
}: CandleFlameProps) {
  return (
    <div
      className={`bd-candle-flame-wrapper ${
        isLit ? 'bd-candle-flame-wrapper--lit' : 'bd-candle-flame-wrapper--dark'
      } ${isExtinguishing ? 'bd-candle-flame-wrapper--extinguishing' : ''}`}
      style={{
        transform: `rotate(${cursorTilt}deg)`,
        opacity: isLit && !isExtinguishing ? intensity : isExtinguishing ? 0 : 0,
      }}
      aria-hidden="true"
    >
      {/* ── Extinguish Smoke Wisp ── */}
      {isExtinguishing && (
        <div className="bd-candle-smoke" aria-hidden="true">
          <svg
            width="24"
            height="52"
            viewBox="0 0 24 52"
            fill="none"
            className="bd-candle-smoke-svg"
          >
            <path
              d="M12 48 C13 40, 9 32, 13 22 C17 12, 10 6, 12 0"
              stroke="rgba(235, 230, 222, 0.45)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {/* ── Multi-Layer Flame SVG ── */}
      <svg
        width="44"
        height="76"
        viewBox="0 0 44 76"
        fill="none"
        className="bd-candle-flame-svg"
      >
        <defs>
          {/* Main outer warm aura gradient */}
          <radialGradient
            id="flameOuterAura"
            cx="50%"
            cy="70%"
            r="50%"
            fx="50%"
            fy="70%"
          >
            <stop offset="0%" stopColor="#FFA640" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#E26D28" stopOpacity="0.4" />
            <stop offset="85%" stopColor="#9C3B12" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Main flame body gradient */}
          <linearGradient id="flameBodyGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#2A4B7C" stopOpacity="0.85" />
            <stop offset="12%" stopColor="#DE7B24" />
            <stop offset="45%" stopColor="#F5B348" />
            <stop offset="80%" stopColor="#FDE18A" />
            <stop offset="100%" stopColor="#FFF9E6" />
          </linearGradient>

          {/* Hot inner core gradient */}
          <linearGradient id="flameCoreGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F39C2F" stopOpacity="0" />
            <stop offset="35%" stopColor="#FFF0B3" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Soft blur for outer warmth */}
          <filter id="flameHaloBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
        </defs>

        {/* 1. Outer Soft Glow Halo */}
        <ellipse
          cx="22"
          cy="42"
          rx="18"
          ry="26"
          fill="url(#flameOuterAura)"
          filter="url(#flameHaloBlur)"
          className="bd-flame-layer bd-flame-layer--halo"
        />

        {/* 2. Main Outer Teardrop */}
        <path
          d="M22 6
             C24 16, 33 32, 33 46
             C33 58, 28 66, 22 66
             C16 66, 11 58, 11 46
             C11 32, 20 16, 22 6 Z"
          fill="url(#flameBodyGrad)"
          className="bd-flame-layer bd-flame-layer--body"
        />

        {/* 3. Luminous Inner Core Flame */}
        <path
          d="M22 18
             C23.2 24, 28.5 36, 28.5 48
             C28.5 56, 25.5 62, 22 62
             C18.5 62, 15.5 56, 15.5 48
             C15.5 36, 20.8 24, 22 18 Z"
          fill="url(#flameCoreGrad)"
          className="bd-flame-layer bd-flame-layer--core"
        />

        {/* 4. Deep Indigo/Blue Flame Foot (Oxygenation zone) */}
        <ellipse
          cx="22"
          cy="64"
          rx="5.5"
          ry="3.2"
          fill="#315A9E"
          opacity="0.75"
          className="bd-flame-layer bd-flame-layer--blue-foot"
        />

        {/* 5. Burning Wick inside flame */}
        <path
          d="M22 68 Q21.4 58 22.8 52"
          stroke="#1F1B18"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Hot incandescent red tip of wick */}
        <circle cx="22.7" cy="52" r="1.1" fill="#FF5722" />
      </svg>
    </div>
  );
}
