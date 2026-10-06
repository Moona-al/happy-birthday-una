'use client';

import React from 'react';
import CandleGlow from './CandleGlow';
import CandleFlame from './CandleFlame';
import RoomObjects from './RoomObjects';

interface RoomSceneProps {
  stage: number; // 0 to 4
  isLit: boolean;
  isExtinguishing: boolean;
  cursorTilt: number;
  candleFlicker: number;
  onCandleClick?: () => void;
}

/**
 * RoomScene — The quiet dark room at night
 * Deep warm black palette with gentle wood table reflection, wavering plant shadow on wall,
 * delicate curtain silhouette, floating dust motes, and dynamic candlelight.
 */
export default function RoomScene({
  stage,
  isLit,
  isExtinguishing,
  cursorTilt,
  candleFlicker,
  onCandleClick,
}: RoomSceneProps) {
  // Ambient dust motes (5 tiny slow drifting specks in the warm beam)
  const dustMotes = [
    { top: '42%', left: '46%', dur: '18s', delay: '0s', size: 2.2 },
    { top: '35%', left: '54%', dur: '24s', delay: '3s', size: 1.8 },
    { top: '52%', left: '51%', dur: '21s', delay: '7s', size: 2.5 },
    { top: '28%', left: '48%', dur: '26s', delay: '12s', size: 1.6 },
    { top: '48%', left: '58%', dur: '19s', delay: '4s', size: 2.0 },
  ];

  return (
    <div
      className={`bd-room-scene ${
        isLit ? 'bd-room-scene--lit' : 'bd-room-scene--dark'
      } ${isExtinguishing ? 'bd-room-scene--extinguishing' : ''}`}
      aria-hidden="true"
    >
      {/* ── 1. Film grain texture overlay ── */}
      <div className="bd-room-grain" />

      {/* ── 2. Background Room Wall (Soft umber, revealed in stages 3-4) ── */}
      <div
        className={`bd-room-wall ${
          stage >= 3 ? 'bd-room-wall--visible' : ''
        }`}
      >
        {/* Soft Window Sill Frame & Curtain Drape Silhouette */}
        <div className="bd-room-curtain-drape" />
        <div className="bd-room-window-frame" />

        {/* Dynamic Wavering Plant Shadow on Wall (Reacts to flame flicker) */}
        <div
          className="bd-room-plant-shadow"
          style={{
            transform: `rotate(${cursorTilt * 0.4}deg) scale(${
              0.98 + candleFlicker * 0.04
            })`,
            opacity: stage >= 3 ? 0.35 + candleFlicker * 0.15 : 0,
          }}
        >
          <svg
            width="280"
            height="340"
            viewBox="0 0 280 340"
            fill="none"
            className="bd-plant-shadow-svg"
          >
            {/* Organic branching shadow silhouette */}
            <path
              d="M140 330 C138 240, 110 160, 60 70"
              stroke="#040303"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Leaves */}
            <ellipse cx="65" cy="85" rx="36" ry="18" transform="rotate(-35 65 85)" fill="#040303" />
            <ellipse cx="95" cy="130" rx="42" ry="20" transform="rotate(-25 95 130)" fill="#040303" />
            <ellipse cx="120" cy="180" rx="46" ry="22" transform="rotate(25 120 180)" fill="#040303" />
            <ellipse cx="80" cy="210" rx="48" ry="24" transform="rotate(-40 80 210)" fill="#040303" />
            <ellipse cx="150" cy="245" rx="44" ry="22" transform="rotate(30 150 245)" fill="#040303" />
            <ellipse cx="45" cy="50" rx="30" ry="16" transform="rotate(-45 45 50)" fill="#040303" />
          </svg>
        </div>
      </div>

      {/* ── 3. Table Horizon & Deep Wood Surface ── */}
      <div
        className={`bd-room-table ${
          stage >= 1 ? 'bd-room-table--visible' : ''
        }`}
      >
        {/* Subtle wood grain texture & edge highlight */}
        <div className="bd-table-wood-grain" />
        <div className="bd-table-edge-light" />

        {/* Soft specular candle light pool reflected onto table varnish */}
        <div
          className="bd-table-varnish-reflection"
          style={{
            opacity: stage >= 1 ? 0.65 * candleFlicker : 0,
          }}
        />
      </div>

      {/* ── 4. Dynamic Multi-Layer Candle Lighting System ── */}
      <CandleGlow
        stage={stage}
        isExtinguishing={isExtinguishing}
        extraFlicker={candleFlicker}
      />

      {/* ── 5. Tabletop Artifacts (Journal, flower, letter, cup, photo) ── */}
      <RoomObjects stage={stage} candleFlicker={candleFlicker} />

      {/* ── 6. The Candle Flame Assembly ── */}
      <div
        className="bd-candle-interactive-zone"
        onClick={onCandleClick}
        role="button"
        tabIndex={0}
        aria-label="A quiet candle flame"
      >
        <CandleFlame
          isLit={isLit}
          isExtinguishing={isExtinguishing}
          cursorTilt={cursorTilt}
          intensity={candleFlicker}
        />
      </div>

      {/* ── 7. Ambient Dust Motes (drifting through candle beam) ── */}
      {stage >= 2 && !isExtinguishing && (
        <div className="bd-room-dust-container" aria-hidden="true">
          {dustMotes.map((m, idx) => (
            <span
              key={`mote-${idx}`}
              className="bd-room-dust-mote"
              style={{
                top: m.top,
                left: m.left,
                width: `${m.size}px`,
                height: `${m.size}px`,
                animationDuration: m.dur,
                animationDelay: m.delay,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
