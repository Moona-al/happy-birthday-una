'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { birthdayConfig } from '@/data/birthday';

// Ambient star definition
interface AmbientStar {
  id: number;
  x: number; // 0 - 100%
  y: number; // 0 - 100%
  size: number; // px
  opacity: number;
  duration: number; // seconds
  delay: number; // seconds
  layer: 'back' | 'mid';
}

// Astronomical & artistic definition of the stars of Libra (The Scales)
interface LibraStar {
  id: string;
  name: string;
  x: number; // ViewBox coordinates (0 - 460)
  y: number; // ViewBox coordinates (0 - 280)
  size: number;
  baseOpacity: number;
  hasHalo?: boolean;
  hasGlint?: boolean;
}

const LIBRA_STARS: LibraStar[] = [
  // 1. Apex / Fulcrum Star (Zubeneschamali - Beta Librae): Brightest northern claw / top beam
  {
    id: 'beta',
    name: 'Zubeneschamali',
    x: 230,
    y: 55,
    size: 3.8,
    baseOpacity: 0.95,
    hasHalo: true,
    hasGlint: true,
  },

  // 2. Upper Western Beam Star (Delta Librae)
  {
    id: 'delta',
    name: 'Delta Librae',
    x: 180,
    y: 95,
    size: 2.2,
    baseOpacity: 0.55,
  },

  // 3. Western Balance Scale Pivot (Zubenelgenubi - Alpha Librae): Prominent western star
  {
    id: 'alpha',
    name: 'Zubenelgenubi',
    x: 125,
    y: 145,
    size: 3.4,
    baseOpacity: 0.88,
    hasHalo: true,
  },

  // 4. Lower Western Scale Pan Anchor (Brachium - Sigma Librae): Western pan base
  {
    id: 'sigma',
    name: 'Brachium',
    x: 175,
    y: 225,
    size: 2.8,
    baseOpacity: 0.72,
  },

  // 5. Center Stem Star (Theta Librae): Center plumb line of the balance
  {
    id: 'theta',
    name: 'Theta Librae',
    x: 230,
    y: 148,
    size: 2.2,
    baseOpacity: 0.52,
  },

  // 6. Eastern Balance Arm Star (Zubenelakrab - Gamma Librae): Eastern arm pivot
  {
    id: 'gamma',
    name: 'Zubenelakrab',
    x: 335,
    y: 110,
    size: 3.2,
    baseOpacity: 0.82,
    hasHalo: true,
  },

  // 7. Eastern Hanging Weight Star (Tau Librae)
  {
    id: 'tau',
    name: 'Tau Librae',
    x: 365,
    y: 175,
    size: 2.3,
    baseOpacity: 0.6,
  },

  // 8. Lower Eastern Pan Base Star (Upsilon Librae): Eastern pan base
  {
    id: 'upsilon',
    name: 'Upsilon Librae',
    x: 295,
    y: 220,
    size: 2.6,
    baseOpacity: 0.68,
  },
];

// Connecting lines forming the classic balance beam and hanging pans of Libra
const LIBRA_LINES = [
  // Upper balance beam
  { from: 'delta', to: 'beta' },
  { from: 'beta', to: 'gamma' },

  // Western hanging scale pan
  { from: 'delta', to: 'alpha' },
  { from: 'alpha', to: 'sigma' },
  { from: 'sigma', to: 'theta' },
  { from: 'theta', to: 'beta' },

  // Eastern hanging scale pan
  { from: 'gamma', to: 'tau' },
  { from: 'tau', to: 'upsilon' },
  { from: 'upsilon', to: 'theta' },

  // Subtle bottom baseline connecting the two scale pans
  { from: 'sigma', to: 'upsilon', isSubtle: true },
];

type CosmicPhase =
  | 'quiet'             // 01: Sky goes quiet, few faint stars
  | 'stars_appear'      // 02: Full star field gently awakens
  | 'libra_awaken'      // 03: Primary Libra stars ignite sequentially
  | 'forming'           // 04: SVG lines draw, Libra shape appears
  | 'symbol_reveal'     // 05: "LIBRA · THE SCALES" subtle symbol reveals
  | 'alignment_pulse'   // 06: Sequential star rhythm + cosmic pulse
  | 'date_reveal'       // 07: "07 / OCTOBER" reveals, gentle camera proximity
  | 'shooting_star'     // 08: Single diagonal shooting star streaks
  | 'message'           // 09: Main poetic message & signature reveal
  | 'idle'              // 10: Living atmospheric idle state
  | 'transitioning';    // 11: Chapter 6 transition sequence

export default function CosmicChapter() {
  const router = useRouter();

  const [phase, setPhase] = useState<CosmicPhase>('quiet');
  const [shootingStarActive, setShootingStarActive] = useState(false);
  const [finalShooterActive, setFinalShooterActive] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const [alignmentWaveIndex, setAlignmentWaveIndex] = useState(-1);
  const [hoveredStarId, setHoveredStarId] = useState<string | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const addTimeout = useCallback((cb: () => void, ms: number) => {
    const id = setTimeout(cb, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Ambient Stars data generator: natural non-grid celestial scatter
  const ambientStars: AmbientStar[] = useMemo(() => {
    const coords = [
      { x: 6, y: 14 }, { x: 15, y: 22 }, { x: 26, y: 10 }, { x: 38, y: 18 },
      { x: 50, y: 8 }, { x: 62, y: 16 }, { x: 74, y: 12 }, { x: 86, y: 20 },
      { x: 94, y: 10 }, { x: 4, y: 36 }, { x: 14, y: 45 }, { x: 22, y: 32 },
      { x: 34, y: 42 }, { x: 65, y: 38 }, { x: 78, y: 44 }, { x: 88, y: 34 },
      { x: 96, y: 48 }, { x: 8, y: 62 }, { x: 18, y: 72 }, { x: 28, y: 56 },
      { x: 44, y: 66 }, { x: 58, y: 60 }, { x: 72, y: 72 }, { x: 82, y: 64 },
      { x: 92, y: 76 }, { x: 6, y: 86 }, { x: 16, y: 92 }, { x: 36, y: 84 },
      { x: 52, y: 94 }, { x: 66, y: 86 }, { x: 78, y: 92 }, { x: 90, y: 88 },
      { x: 12, y: 28 }, { x: 48, y: 26 }, { x: 82, y: 28 }, { x: 86, y: 56 },
      { x: 24, y: 88 }, { x: 60, y: 22 }, { x: 38, y: 74 }, { x: 76, y: 78 },
      { x: 10, y: 96 }, { x: 95, y: 18 }, { x: 5, y: 54 }, { x: 70, y: 10 },
      { x: 64, y: 80 }, { x: 42, y: 88 }, { x: 98, y: 66 }, { x: 32, y: 15 },
      { x: 56, y: 48 }, { x: 84, y: 85 },
    ];

    return coords.map((c, i) => ({
      id: i,
      x: c.x,
      y: c.y,
      size: i % 8 === 0 ? 2.5 : i % 3 === 0 ? 1.7 : 1.1,
      opacity: i % 6 === 0 ? 0.72 : i % 2 === 0 ? 0.52 : 0.32,
      duration: 4.8 + (i % 5) * 0.8,
      delay: (i * 0.32) % 4.5,
      layer: i % 2 === 0 ? 'back' : 'mid',
    }));
  }, []);

  // MASTER ORCHESTRATION SEQUENCE
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      setIsReducedMotion(true);
      setPhase('idle');
      return;
    }

    // SEQUENCE TIMELINE:
    // 01: The sky goes quiet (0 - 2000ms)
    // 02: Ambient star field awakens (2000ms)
    addTimeout(() => setPhase('stars_appear'), 2000);

    // 03: Primary Libra stars ignite sequentially (3800ms)
    addTimeout(() => setPhase('libra_awaken'), 3800);

    // 04: SVG constellation lines connect (5600ms)
    addTimeout(() => setPhase('forming'), 5600);

    // 05: "LIBRA · THE SCALES" subtle symbol reveals (7800ms)
    addTimeout(() => setPhase('symbol_reveal'), 7800);

    // 06: Cosmic alignment moment (9600ms):
    // Sequential wave across Libra stars, followed by a unified pulse
    addTimeout(() => {
      setPhase('alignment_pulse');
      // Wave rhythm across stars: star -> star -> star
      LIBRA_STARS.forEach((_, sIdx) => {
        addTimeout(() => setAlignmentWaveIndex(sIdx), sIdx * 140);
      });

      // Unified cosmic pulse after wave finishes (~1200ms)
      addTimeout(() => {
        setAlignmentWaveIndex(-1);
        setPulseActive(true);
        addTimeout(() => setPulseActive(false), 1400);
      }, LIBRA_STARS.length * 140 + 100);
    }, 9600);

    // 07: 07 / OCTOBER reveals, subtle camera zoom (11800ms)
    addTimeout(() => setPhase('date_reveal'), 11800);

    // 08: Single shooting star streaks diagonally (13400ms)
    addTimeout(() => {
      setPhase('shooting_star');
      setShootingStarActive(true);
      addTimeout(() => setShootingStarActive(false), 1100);
    }, 13400);

    // 09: Main poetic message & signature reveals (14800ms)
    addTimeout(() => setPhase('message'), 14800);

    // 10: Smooth transition into living idle cosmic state (16600ms)
    addTimeout(() => setPhase('idle'), 16600);
  }, [addTimeout]);

  // Subtle 4-layer mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || phase === 'transitioning') return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setParallax({
      x: Math.max(-1, Math.min(1, deltaX)),
      y: Math.max(-1, Math.min(1, deltaY)),
    });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
    setHoveredStarId(null);
  };

  // Chapter 6 Transition Sequence
  const handleContinue = () => {
    if (phase === 'transitioning') return;

    if (isReducedMotion) {
      router.push('/final');
      return;
    }

    setPhase('transitioning');
    setFinalShooterActive(true);

    // Sequence: constellation brightens -> stars drift upwards ->
    // final star trail sweeps -> screen darkens -> navigate
    addTimeout(() => {
      router.push('/final');
    }, 850);
  };

  // Visibility states
  const showStars = phase !== 'quiet';
  const showAwakened = phase !== 'quiet' && phase !== 'stars_appear';
  const showLines = showAwakened && phase !== 'libra_awaken';
  const showSymbol =
    phase === 'symbol_reveal' ||
    phase === 'alignment_pulse' ||
    phase === 'date_reveal' ||
    phase === 'shooting_star' ||
    phase === 'message' ||
    phase === 'idle' ||
    phase === 'transitioning';
  const showDate =
    phase === 'date_reveal' ||
    phase === 'shooting_star' ||
    phase === 'message' ||
    phase === 'idle' ||
    phase === 'transitioning';
  const showMessage =
    phase === 'message' || phase === 'idle' || phase === 'transitioning';

  return (
    <div
      ref={containerRef}
      className={`bd-cosmic-stage ${
        phase === 'transitioning' ? 'bd-cosmic-stage--transitioning' : ''
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Chapter 05: A Date Written in the Sky — Libra Constellation"
    >
      {/* Deep atmospheric night sky gradient */}
      <div className="bd-cosmic-atmosphere" aria-hidden="true" />

      {/* Subtle organic sky grain */}
      <div className="bd-cosmic-grain" aria-hidden="true" />

      {/* Layer 4 (Foreground atmospheric stardust specks: 6 particles) */}
      <div
        className="bd-cosmic-dust-layer"
        style={{
          transform: !isReducedMotion
            ? `translate3d(${parallax.x * 5}px, ${parallax.y * 5}px, 0)`
            : undefined,
        }}
        aria-hidden="true"
      >
        {[...Array(6)].map((_, i) => (
          <span key={i} className={`bd-cosmic-dust bd-cosmic-dust--${i + 1}`} />
        ))}
      </div>

      {/* ========================================================
          PARALLAX LAYER 1: DISTANT BACKGROUND STARS (1-2px)
         ======================================================== */}
      <div
        className="bd-cosmic-starfield bd-cosmic-starfield--back"
        style={{
          transform: !isReducedMotion
            ? `translate3d(${parallax.x * 1.5}px, ${parallax.y * 1.5}px, 0)`
            : undefined,
        }}
        aria-hidden="true"
      >
        {ambientStars
          .filter((s) => s.layer === 'back')
          .map((star) => (
            <span
              key={star.id}
              className={`bd-cosmic-star ${showStars ? 'bd-cosmic-star--visible' : ''}`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: showStars ? star.opacity : 0,
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
      </div>

      {/* ========================================================
          PARALLAX LAYER 2: MIDGROUND STARS (2-3px)
         ======================================================== */}
      <div
        className="bd-cosmic-starfield bd-cosmic-starfield--mid"
        style={{
          transform: !isReducedMotion
            ? `translate3d(${parallax.x * 2.8}px, ${parallax.y * 2.8}px, 0)`
            : undefined,
        }}
        aria-hidden="true"
      >
        {ambientStars
          .filter((s) => s.layer === 'mid')
          .map((star) => (
            <span
              key={star.id}
              className={`bd-cosmic-star bd-cosmic-star--mid ${
                showStars ? 'bd-cosmic-star--visible' : ''
              }`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: showStars ? star.opacity : 0,
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
      </div>

      {/* ========================================================
          SINGLE SHOOTING STAR (Diagonal upper-right -> bottom-left)
         ======================================================== */}
      {shootingStarActive && (
        <div className="bd-cosmic-shooting-star" aria-hidden="true">
          <div className="bd-cosmic-shooting-trail" />
        </div>
      )}

      {/* Final transition star trail */}
      {finalShooterActive && (
        <div
          className="bd-cosmic-shooting-star bd-cosmic-shooting-star--final"
          aria-hidden="true"
        >
          <div className="bd-cosmic-shooting-trail" />
        </div>
      )}

      {/* ========================================================
          PARALLAX LAYER 3: LIBRA CONSTELLATION (The Scales) (3-5px)
         ======================================================== */}
      <div
        className={`bd-libra-constellation-container ${
          pulseActive ? 'bd-libra-constellation-container--pulse' : ''
        } ${showDate ? 'bd-libra-constellation-container--zoom' : ''} ${
          phase === 'transitioning'
            ? 'bd-libra-constellation-container--transitioning'
            : ''
        }`}
        style={{
          transform: !isReducedMotion
            ? `translate3d(${parallax.x * 4}px, ${parallax.y * 4}px, 0)`
            : undefined,
        }}
      >
        <svg
          viewBox="0 0 460 280"
          className="bd-libra-constellation-svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="libraStarGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="libraLineGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Sequential Libra Connecting Lines */}
          {showLines &&
            LIBRA_LINES.map((line, idx) => {
              const start = LIBRA_STARS.find((s) => s.id === line.from);
              const end = LIBRA_STARS.find((s) => s.id === line.to);
              if (!start || !end) return null;

              const isNearbyHovered =
                hoveredStarId === line.from || hoveredStarId === line.to;

              return (
                <line
                  key={`${line.from}-${line.to}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  className={`bd-libra-line ${
                    line.isSubtle ? 'bd-libra-line--subtle' : ''
                  } ${isNearbyHovered ? 'bd-libra-line--hovered' : ''}`}
                  filter="url(#libraLineGlow)"
                  style={{
                    animationDelay: `${idx * 0.18}s`,
                  }}
                />
              );
            })}

          {/* Primary Libra Stars */}
          {LIBRA_STARS.map((star, idx) => {
            const isHovered = hoveredStarId === star.id;
            const isWaveActive = alignmentWaveIndex === idx;

            return (
              <g
                key={star.id}
                className={`bd-libra-star-group ${
                  showAwakened ? 'bd-libra-star-group--awake' : ''
                } ${isWaveActive ? 'bd-libra-star-group--wave' : ''} ${
                  isHovered ? 'bd-libra-star-group--hovered' : ''
                }`}
                style={{
                  transitionDelay: `${idx * 0.14}s`,
                }}
                onMouseEnter={() => setHoveredStarId(star.id)}
                onMouseLeave={() => setHoveredStarId(null)}
              >
                {/* Outer soft aura (only on prominent stars or when hovered) */}
                {star.hasHalo && (
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={showAwakened ? (isHovered ? 13 : 9) : 0}
                    className="bd-libra-star-aura"
                  />
                )}

                {/* Core bright star */}
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={showAwakened ? (isHovered ? star.size + 1.2 : star.size) : 1.2}
                  className="bd-libra-star-core"
                  filter="url(#libraStarGlow)"
                />

                {/* 4-point subtle star glint on the fulcrum apex star (Beta) */}
                {star.hasGlint && showAwakened && (
                  <path
                    d={`M${star.x} ${star.y - 7}L${star.x} ${star.y + 7}M${star.x - 7} ${star.y}L${star.x + 7} ${star.y}`}
                    stroke="#D8C59A"
                    strokeWidth="0.8"
                    className="bd-libra-star-glint"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* ========================================================
            LIBRA AS A SYMBOL (Subtle & Editorial, NOT Horoscope)
           ======================================================== */}
        <div
          className={`bd-libra-symbol-caption ${
            showSymbol ? 'bd-libra-symbol-caption--visible' : ''
          }`}
        >
          <span className="bd-libra-symbol-title">LIBRA</span>
          <span className="bd-libra-symbol-sep">·</span>
          <span className="bd-libra-symbol-sub">THE SCALES</span>
        </div>

        {/* ========================================================
            THE DATE: 07 / OCTOBER
           ======================================================== */}
        <div
          className={`bd-cosmic-date-display ${
            showDate ? 'bd-cosmic-date-display--visible' : ''
          }`}
        >
          <p className="bd-cosmic-numeral">07</p>
          <p className="bd-cosmic-month">OCTOBER</p>
        </div>
      </div>

      {/* ========================================================
          MAIN EDITORIAL MESSAGE & SIGNATURE
         ======================================================== */}
      <div
        className={`bd-cosmic-content ${
          showMessage ? 'bd-cosmic-content--visible' : ''
        }`}
        style={{
          transform: !isReducedMotion
            ? `translate3d(${parallax.x * 2}px, ${parallax.y * 2}px, 0)`
            : undefined,
        }}
      >
        <div className="bd-cosmic-message-block">
          <p className="bd-cosmic-line bd-cosmic-line--1">
            Some dates are written<br />
            in calendars.
          </p>

          <p className="bd-cosmic-line bd-cosmic-line--2">
            Others are written<br />
            in the sky.
          </p>

          <div className="bd-cosmic-signature">
            <span className="bd-cosmic-date-tag">07 · 10</span>
            <span className="bd-cosmic-name">
              {birthdayConfig.name.toUpperCase()}
            </span>
          </div>

          {/* Emotional detail: Libra · The Scales */}
          <p className="bd-cosmic-astral-detail">
            LIBRA · THE SCALES
          </p>
        </div>

        {/* Minimal Editorial Continue Button */}
        <div className="bd-cosmic-action">
          <button
            type="button"
            className="bd-cosmic-continue-btn"
            onClick={handleContinue}
            aria-label="Continue to Chapter 6 finale"
          >
            <span className="bd-cosmic-continue-text">
              Continue to the finale
            </span>
            <span className="bd-cosmic-continue-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
