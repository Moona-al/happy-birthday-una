'use client';

import React, { useState } from 'react';

interface GiftBoxProps {
  revealMessage: string;
  onOpened?: () => void;
}

export default function GiftBox({ revealMessage, onOpened }: GiftBoxProps) {
  const [stage, setStage] = useState<'closed' | 'opening' | 'opened'>('closed');

  const handleClick = () => {
    if (stage !== 'closed') return;
    setStage('opening');

    setTimeout(() => {
      setStage('opened');
      onOpened?.();
    }, 700);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStage('closed');
  };

  return (
    <div className="bd-gift-stage">
      {/* Interactive Gift Container */}
      <div
        className={`bd-gift-physical bd-gift-physical--${stage}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={stage === 'closed' ? 'Click to open gift box' : 'Gift is open'}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && stage === 'closed') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {/* Soft magical glow inside box */}
        <div className="bd-gift-glow" aria-hidden="true" />

        {/* Ambient sparkle particles when opened */}
        {stage === 'opened' && (
          <div className="bd-gift-sparkles" aria-hidden="true">
            {[...Array(8)].map((_, i) => (
              <span key={i} className={`bd-gift-sparkle bd-gift-sparkle--${i + 1}`}>
                ✦
              </span>
            ))}
          </div>
        )}

        {/* Physical Gift Box SVG */}
        <svg
          viewBox="0 0 240 240"
          className="bd-gift-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground shadow */}
          <ellipse
            cx="120"
            cy="216"
            rx="75"
            ry="14"
            fill="rgba(23, 21, 21, 0.08)"
            className="bd-gift-shadow"
          />

          {/* BOX BASE */}
          <g className="bd-gift-base-group">
            {/* Box Body */}
            <rect
              x="55"
              y="110"
              width="130"
              height="95"
              rx="4"
              fill="#F4EAE6"
              stroke="#E2D0CB"
              strokeWidth="2"
            />
            {/* Body vertical silk ribbon */}
            <rect
              x="110"
              y="110"
              width="20"
              height="95"
              fill="var(--bd-accent)"
              opacity="0.9"
            />
            {/* Ribbon silk highlight */}
            <rect
              x="116"
              y="110"
              width="4"
              height="95"
              fill="rgba(255, 255, 255, 0.45)"
            />
          </g>

          {/* BOX LID (Lifts and floats up when opening) */}
          <g className="bd-gift-lid-group">
            {/* Lid shape */}
            <rect
              x="48"
              y="88"
              width="144"
              height="28"
              rx="4"
              fill="#FAF5F2"
              stroke="#E2D0CB"
              strokeWidth="2"
            />
            {/* Lid ribbon vertical */}
            <rect
              x="110"
              y="88"
              width="20"
              height="28"
              fill="var(--bd-accent)"
              opacity="0.9"
            />
            <rect
              x="116"
              y="88"
              width="4"
              height="28"
              fill="rgba(255, 255, 255, 0.45)"
            />
            {/* Lid ribbon horizontal */}
            <rect
              x="48"
              y="97"
              width="144"
              height="10"
              fill="var(--bd-accent)"
              opacity="0.9"
            />

            {/* Silk Bow on top */}
            <g className="bd-gift-bow">
              {/* Left loop */}
              <path
                d="M 120 88 C 100 68 76 72 82 86 C 88 96 112 90 120 88 Z"
                fill="var(--bd-accent)"
              />
              {/* Right loop */}
              <path
                d="M 120 88 C 140 68 164 72 158 86 C 152 96 128 90 120 88 Z"
                fill="var(--bd-accent)"
              />
              {/* Center knot */}
              <circle
                cx="120"
                cy="88"
                r="7"
                fill="var(--flower-petal-dark)"
              />
              {/* Ribbon tails */}
              <path
                d="M 117 92 C 105 106 96 118 92 128"
                stroke="var(--bd-accent)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 123 92 C 135 106 144 118 148 128"
                stroke="var(--bd-accent)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          </g>
        </svg>

        {/* Prompt label before opening */}
        {stage === 'closed' && (
          <p className="bd-gift-prompt">
            tap the box to unwrap
          </p>
        )}
      </div>

      {/* REVEAL CARD (Floats up from box when opened) */}
      {stage === 'opened' && (
        <div className="bd-gift-card" role="status" aria-live="polite">
          <div className="bd-gift-card__inner">
            <span className="bd-gift-card__icon" aria-hidden="true">💌</span>
            <p className="bd-gift-card__text">{revealMessage}</p>
            <button
              type="button"
              onClick={handleReset}
              className="bd-gift-reclose-btn"
              title="Close box and wrap again"
            >
              ↻ Close again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
