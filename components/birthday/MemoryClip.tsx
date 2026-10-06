'use client';

import React from 'react';

interface MemoryClipProps {
  className?: string;
  isAttached?: boolean;
}

/**
 * MemoryClip — Miniature physical wooden clothespin / clip
 * Clamps onto the hanging string above and grips the top border of the Polaroid.
 */
export default function MemoryClip({ className = '', isAttached = true }: MemoryClipProps) {
  return (
    <div
      className={`bd-memory-clip ${isAttached ? 'bd-memory-clip--attached' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        width="16"
        height="32"
        viewBox="0 0 16 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="bd-memory-clip__svg"
      >
        {/* Soft shadow under clip */}
        <ellipse cx="8" cy="29" rx="4.5" ry="1.5" fill="rgba(0,0,0,0.12)" />

        {/* Left wooden arm */}
        <rect
          x="3.2"
          y="2"
          width="4"
          height="25"
          rx="1"
          fill="#C2A888"
          stroke="#9E8569"
          strokeWidth="0.8"
        />
        {/* Left arm wood grain highlight */}
        <line x1="4.8" y1="4" x2="4.8" y2="24" stroke="#D8C2A7" strokeWidth="0.8" strokeLinecap="round" />

        {/* Right wooden arm */}
        <rect
          x="8.8"
          y="2"
          width="4"
          height="25"
          rx="1"
          fill="#BA9F7E"
          stroke="#937A5E"
          strokeWidth="0.8"
        />
        {/* Right arm wood grain shadow */}
        <line x1="10.8" y1="4" x2="10.8" y2="24" stroke="#8A6E53" strokeWidth="0.6" strokeLinecap="round" />

        {/* Metal spring coil in center */}
        <circle cx="8" cy="14" r="3.2" fill="#756B60" stroke="#4F473E" strokeWidth="0.8" />
        <circle cx="8" cy="14" r="1.5" fill="#B5ADA3" />
        {/* Spring wire hook crossing */}
        <path
          d="M 5 11 L 11 17"
          stroke="#403A34"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* Top pinch notch */}
        <line x1="4.5" y1="2" x2="11.5" y2="2" stroke="#6F5B47" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
}
