'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Memory } from '@/data/birthday';
import MemoryClip from './MemoryClip';

interface PolaroidProps {
  memory: Memory;
  index: number;
  isVisible: boolean;
  zIndex?: number;
  hangerHeight?: number; // Distance in px from the string down to the clip
}

/**
 * Polaroid — Tactile physical Polaroid photo hanging from the string
 * Micro-interaction on click (tilt/wiggle and settle) with NO lightbox or modal.
 */
export default function Polaroid({
  memory,
  index,
  isVisible,
  zIndex = 1,
  hangerHeight = 36,
}: PolaroidProps) {
  const [isWiggling, setIsWiggling] = useState(false);

  // Staggered drop delays for sequential entrance
  const dropDelay = `${0.65 + index * 0.22}s`;
  const floatDuration = memory.floatDuration || 8 + (index % 4) * 1.2;
  const floatDelay = memory.floatDelay || (index * 0.45) % 2;

  // Handle subtle wiggle micro-interaction on click/tap
  const handlePhotoClick = () => {
    if (isWiggling) return;
    setIsWiggling(true);
    setTimeout(() => {
      setIsWiggling(false);
    }, 600);
  };

  // Scrapbook accents (subtle paper tape, stamps, doodles)
  const hasWashiTape = index % 3 === 0;
  const idleVariant = (index % 5) + 1;

  return (
    <div
      className={`bd-polaroid-anchor bd-polaroid-anchor--${index + 1}${
        isVisible ? ' bd-polaroid-anchor--dropped' : ''
      }`}
      style={{
        zIndex,
        animationDelay: dropDelay,
        ['--target-rot' as string]: `${memory.rotation}deg`,
        ['--hover-rot' as string]: `${memory.rotation * 0.3}deg`,
        ['--sway-dur' as string]: `${floatDuration}s`,
        ['--sway-delay' as string]: `${floatDelay}s`,
        ['--hanger-len' as string]: `${hangerHeight}px`,
      }}
    >
      {/* ── VERTICAL HANGING TWINE (from main string down to clip) ── */}
      <div className="bd-polaroid__twine" aria-hidden="true" />

      {/* ── WOODEN CLOTHESPIN CLIP ── */}
      <MemoryClip className="bd-polaroid__clip-mount" />

      {/* ── POLAROID CARD CONTAINER (Sways with gentle room breeze) ── */}
      <div
        className={`bd-polaroid bd-polaroid--sway bd-polaroid--idle-${idleVariant}${
          isWiggling ? ' bd-polaroid--wiggling' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={handlePhotoClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePhotoClick();
          }
        }}
        aria-label={`Polaroid photo ${index + 1}. Tap for slight bounce.`}
      >
        {/* Optional decorative washi tape accent */}
        {hasWashiTape && (
          <div
            className={`bd-polaroid__tape bd-polaroid__tape--${(index % 3) + 1}`}
            aria-hidden="true"
          />
        )}

        {/* Photo frame */}
        <div className="bd-polaroid__photo-wrap">
          <Image
            src={memory.image}
            alt={`Memory photo ${index + 1}`}
            fill
            sizes="(max-width: 768px) 80vw, 300px"
            className="bd-polaroid__photo"
          />
          {/* Analog film glare overlay */}
          <div className="bd-polaroid__photo-glare" aria-hidden="true" />
        </div>

        {/* Clean Polaroid bottom chin without text */}
        <div className="bd-polaroid__footer" aria-hidden="true" />
      </div>
    </div>
  );
}
