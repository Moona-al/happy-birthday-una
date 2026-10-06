'use client';

import React from 'react';

interface RoomObjectsProps {
  stage: number; // 0 to 4
  candleFlicker?: number;
}

/**
 * RoomObjects — Quiet intimate tabletop artifacts illuminated by the candle
 * Features a ceramic candle holder, an antique journal, dried wildflower sprig,
 * handwritten note slip, a quiet matte photo print, and an empty tea cup.
 */
export default function RoomObjects({
  stage,
  candleFlicker = 1,
}: RoomObjectsProps) {
  const showStage2 = stage >= 2;

  return (
    <div className="bd-table-objects-container" aria-hidden="true">
      {/* ── 1. CANDLE HOLDER & TAPER WAX CYLINDER ── */}
      <div className="bd-obj-candle-assembly">
        {/* Soft pool of melted wax at base of wick */}
        <div className="bd-obj-candle-cup">
          {/* Subtle wax melted rim */}
          <div className="bd-obj-wax-pool" />
        </div>

        {/* Taper Candle Pillar Body (Cream/Ivory wax with subtle translucent highlight) */}
        <div className="bd-obj-candle-pillar">
          <div className="bd-obj-wax-highlight" />
          <div className="bd-obj-wax-drip bd-obj-wax-drip--1" />
          <div className="bd-obj-wax-drip bd-obj-wax-drip--2" />
        </div>

        {/* Matte Stoneware / Brass Candle Dish Base */}
        <div className="bd-obj-candle-dish">
          <div className="bd-obj-dish-rim" />
          <div className="bd-obj-dish-shadow" />
        </div>
      </div>

      {/* ── 2. ANTIQUE JOURNAL / SKETCHBOOK (Stage 2+) ── */}
      <div
        className={`bd-table-obj bd-table-obj--journal ${
          showStage2 ? 'bd-table-obj--revealed' : ''
        }`}
      >
        <div className="bd-obj-journal-body">
          {/* Cover texture */}
          <div className="bd-obj-journal-cover" />
          {/* Exposed deckled paper edge stack */}
          <div className="bd-obj-journal-pages" />
          {/* Subtle silk bookmark ribbon trailing onto table */}
          <div className="bd-obj-journal-ribbon" />
        </div>
        <div className="bd-obj-journal-shadow" />
      </div>

      {/* ── 3. HANDWRITTEN LETTER FRAGMENT (Stage 2+) ── */}
      <div
        className={`bd-table-obj bd-table-obj--letter ${
          showStage2 ? 'bd-table-obj--revealed' : ''
        }`}
      >
        <div className="bd-obj-letter-paper">
          {/* Faint script lines evoking 'someone has been here' */}
          <div className="bd-obj-letter-line bd-obj-letter-line--1" />
          <div className="bd-obj-letter-line bd-obj-letter-line--2" />
          <div className="bd-obj-letter-line bd-obj-letter-line--3" />
          <div className="bd-obj-letter-line bd-obj-letter-line--4" />
        </div>
        <div className="bd-obj-letter-shadow" />
      </div>

      {/* ── 4. DRIED BOTANICAL FLOWER SPRIG (Stage 2+) ── */}
      <div
        className={`bd-table-obj bd-table-obj--flower ${
          showStage2 ? 'bd-table-obj--revealed' : ''
        }`}
      >
        <svg
          width="78"
          height="54"
          viewBox="0 0 78 54"
          fill="none"
          className="bd-obj-flower-svg"
        >
          {/* Organic dried stem */}
          <path
            d="M6 48 C22 42, 44 32, 72 8"
            stroke="#635447"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Dried branchlets & petals */}
          <path
            d="M26 38 C32 32, 34 26, 36 22"
            stroke="#635447"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <ellipse cx="37" cy="21" rx="2.4" ry="4.2" transform="rotate(35 37 21)" fill="#8C735D" opacity="0.8" />
          <ellipse cx="33" cy="24" rx="2" ry="3.5" transform="rotate(-15 33 24)" fill="#78614E" opacity="0.75" />

          <path
            d="M48 27 C54 22, 57 16, 61 11"
            stroke="#635447"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <ellipse cx="62" cy="10" rx="2.5" ry="4.5" transform="rotate(40 62 10)" fill="#9E836A" opacity="0.85" />
          <ellipse cx="58" cy="13" rx="2.2" ry="3.8" transform="rotate(-10 58 13)" fill="#856C56" opacity="0.75" />

          {/* Terminal dried buds */}
          <ellipse cx="73" cy="7" rx="2.8" ry="5.2" transform="rotate(50 73 7)" fill="#AB9077" opacity="0.9" />
          <ellipse cx="69" cy="9" rx="2" ry="3.8" transform="rotate(15 69 9)" fill="#856C56" opacity="0.8" />
        </svg>
      </div>

      {/* ── 5. QUIET MATTE PHOTO PRINT (Non-clickable, atmospheric object) (Stage 2+) ── */}
      <div
        className={`bd-table-obj bd-table-obj--photo ${
          showStage2 ? 'bd-table-obj--revealed' : ''
        }`}
      >
        <div className="bd-obj-photo-card">
          <div className="bd-obj-photo-inner">
            {/* Soft monochrome photographic memory silhouette */}
            <div className="bd-obj-photo-landscape" />
          </div>
        </div>
        <div className="bd-obj-photo-shadow" />
      </div>

      {/* ── 6. CERAMIC CUP / EMPTY TUMBLER (Stage 2+) ── */}
      <div
        className={`bd-table-obj bd-table-obj--cup ${
          showStage2 ? 'bd-table-obj--revealed' : ''
        }`}
      >
        <div className="bd-obj-cup-body">
          <div className="bd-obj-cup-rim-glint" />
          <div className="bd-obj-cup-inner-shadow" />
        </div>
        <div className="bd-obj-cup-base-shadow" />
      </div>

      {/* ── 7. DELICATE RIBBON FRAGMENT (Stage 2+) ── */}
      <div
        className={`bd-table-obj bd-table-obj--ribbon ${
          showStage2 ? 'bd-table-obj--revealed' : ''
        }`}
      >
        <svg
          width="48"
          height="22"
          viewBox="0 0 48 22"
          fill="none"
          className="bd-obj-ribbon-svg"
        >
          <path
            d="M4 18 C12 6, 24 20, 36 8 C42 4, 46 9, 44 14"
            stroke="#D98C9B"
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
}
