'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { Memory } from '@/data/birthday';

interface MemoryLightboxProps {
  memory: Memory | null;
  onClose: () => void;
}

export default function MemoryLightbox({ memory, onClose }: MemoryLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!memory) return;

    document.addEventListener('keydown', handleKeyDown);
    // Lock body scroll while lightbox is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [memory, handleKeyDown]);

  if (!memory) return null;

  return (
    <div
      className="bd-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={memory.caption || 'Enlarged Polaroid photo'}
      onClick={onClose}
    >
      <div className="bd-lightbox__backdrop" aria-hidden="true" />

      {/* Close button */}
      <button
        type="button"
        className="bd-lightbox__close"
        onClick={onClose}
        aria-label="Close enlarged photo"
      >
        <span aria-hidden="true">&times;</span>
      </button>

      {/* Enlarged Polaroid container */}
      <div
        className="bd-lightbox__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bd-polaroid bd-polaroid--lightbox">
          {/* Subtle scrapbook tape accent on top */}
          <div className="bd-polaroid__tape" aria-hidden="true" />

          {/* Photo frame */}
          <div className="bd-polaroid__photo-wrap bd-polaroid__photo-wrap--lightbox">
            <Image
              src={memory.image}
              alt={memory.caption || 'Memory photo'}
              fill
              sizes="(max-width: 768px) 90vw, 550px"
              className="bd-polaroid__photo"
              priority
            />
          </div>

          {/* Caption & Date */}
          <div className="bd-polaroid__footer">
            <p className="bd-polaroid__caption bd-polaroid__caption--lightbox">
              {memory.caption || memory.title}
            </p>
            {memory.date && (
              <time className="bd-polaroid__date">
                {memory.date}
              </time>
            )}
            {memory.description && (
              <p className="bd-polaroid__note">
                {memory.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
