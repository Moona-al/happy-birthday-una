'use client';

import React from 'react';

interface StringLightProps {
  isOn: boolean;
  turnOnDelay?: number; // In seconds
  idleDelay?: number; // In seconds
  idleDuration?: number; // In seconds (3-6s)
  className?: string;
  style?: React.CSSProperties;
}

/**
 * StringLight — Warm fairy light bulb connected along the hanging string
 * Features gentle glowing bulb filament, sequential turn-on, and organic idle breathing.
 */
export default function StringLight({
  isOn,
  turnOnDelay = 0.2,
  idleDelay = 0,
  idleDuration = 4.2,
  className = '',
  style = {},
}: StringLightProps) {
  return (
    <div
      className={`bd-string-light ${isOn ? 'bd-string-light--on' : 'bd-string-light--off'} ${className}`}
      style={{
        ...style,
        ['--turn-on-delay' as string]: `${turnOnDelay}s`,
        ['--idle-delay' as string]: `${idleDelay}s`,
        ['--idle-dur' as string]: `${idleDuration}s`,
      }}
      aria-hidden="true"
    >
      {/* Little wire drop connector to string */}
      <span className="bd-string-light__wire" />

      {/* Light fixture cap */}
      <span className="bd-string-light__cap" />

      {/* Glass bulb + warm filament SVG */}
      <svg
        width="16"
        height="22"
        viewBox="0 0 16 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="bd-string-light__bulb-svg"
      >
        {/* Soft radial ambient glow filter/fill */}
        <defs>
          <radialGradient id="fairyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE099" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#FFAA4D" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FF9800" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient halo behind bulb */}
        <circle cx="8" cy="13" r="7.5" fill="url(#fairyGlow)" className="bd-string-light__halo" />

        {/* Glass teardrop bulb body */}
        <path
          d="M 5 2 H 11 L 12.5 7 C 13.8 9.5 13.5 14 11 17.5 C 9.5 19.5 6.5 19.5 5 17.5 C 2.5 14 2.2 9.5 3.5 7 Z"
          fill="rgba(255, 238, 194, 0.72)"
          stroke="rgba(214, 172, 107, 0.6)"
          strokeWidth="0.8"
          className="bd-string-light__glass"
        />

        {/* Inner golden glowing filament wire */}
        <path
          d="M 6.5 5 V 10 L 8 13 L 9.5 10 V 5"
          stroke="#FFE89E"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="bd-string-light__filament"
        />

        {/* Core filament hot spark */}
        <circle cx="8" cy="12.5" r="1.3" fill="#FFFBE6" className="bd-string-light__spark" />
      </svg>
    </div>
  );
}
