'use client';

import React from 'react';
import type { Memory } from '@/data/birthday';
import StringLight from './StringLight';
import Polaroid from './Polaroid';

export interface StringPhotoItem {
  memory: Memory;
  originalIndex: number;
  t: number; // 0.0 to 1.0 position across string
  hangerHeight?: number;
}

export interface StringLightItem {
  t: number; // 0.0 to 1.0 position across string
  yOffset?: number;
  idleDelay?: number;
  idleDuration?: number;
}

interface MemoryStringProps {
  stringId: string;
  yBase?: number; // Base Y position in px (default: 20)
  sag?: number; // Dip in the middle in px (default: 28)
  lights: StringLightItem[];
  photos: StringPhotoItem[];
  isDrawn: boolean;
  areLightsOn: boolean;
  arePhotosVisible: boolean;
  className?: string;
}

/**
 * Calculates Y coordinate along quadratic Bézier M 0 yBase Q 500 (yBase + 2*sag) 1000 yBase
 * Exactly matches the SVG string curve at horizontal percentage t (0..1)
 */
export function getCurveY(t: number, yBase: number = 20, sag: number = 28): number {
  return yBase + 4 * sag * t * (1 - t);
}

/**
 * MemoryString — An organic hanging rope with warm fairy lights and suspended Polaroids
 */
export default function MemoryString({
  stringId,
  yBase = 20,
  sag = 28,
  lights,
  photos,
  isDrawn,
  areLightsOn,
  arePhotosVisible,
  className = '',
}: MemoryStringProps) {
  // SVG path control points
  const startY = yBase;
  const controlY = yBase + 2 * sag;
  const endY = yBase;
  const svgPath = `M 0 ${startY} Q 500 ${controlY} 1000 ${endY}`;

  return (
    <div
      className={`bd-memory-string ${isDrawn ? 'bd-memory-string--drawn' : ''} ${className}`}
      id={`memory-string-${stringId}`}
    >
      {/* ── ORGANIC PHYSICAL TWINE / ROPE SVG ── */}
      <svg
        className="bd-memory-string__svg"
        viewBox="0 0 1000 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Soft shadow under rope */}
        <path
          d={`M 0 ${startY + 2.5} Q 500 ${controlY + 2.5} 1000 ${endY + 2.5}`}
          stroke="rgba(0, 0, 0, 0.05)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Physical textured rope (#B5A99C) with draw animation */}
        <path
          d={svgPath}
          stroke="#B5A99C"
          strokeWidth="1.8"
          strokeDasharray="1005"
          strokeDashoffset={isDrawn ? 0 : 1005}
          fill="none"
          strokeLinecap="round"
          className="bd-memory-string__rope-path"
        />
      </svg>

      {/* ── FAIRY LIGHT BULBS ATTACHED ALONG THE STRING ── */}
      <div className="bd-memory-string__lights-layer" aria-hidden="true">
        {lights.map((light, i) => {
          const y = getCurveY(light.t, yBase, sag) + (light.yOffset || 0);
          const xPercent = light.t * 100;
          const turnOnDelay = 0.15 + i * 0.12;

          return (
            <div
              key={`light-${stringId}-${i}`}
              className="bd-memory-string__light-node"
              style={{
                left: `${xPercent}%`,
                top: `${y}px`,
              }}
            >
              <StringLight
                isOn={areLightsOn}
                turnOnDelay={turnOnDelay}
                idleDelay={light.idleDelay ?? (i * 0.4) % 3}
                idleDuration={light.idleDuration ?? 3.8 + (i % 3) * 0.8}
              />
            </div>
          );
        })}
      </div>

      {/* ── POLAROIDS HANGING FROM STRING CLIPS ── */}
      <div className="bd-memory-string__photos-layer">
        {photos.map((item) => {
          const y = getCurveY(item.t, yBase, sag);
          const xPercent = item.t * 100;

          return (
            <div
              key={`photo-${stringId}-${item.originalIndex}`}
              className="bd-memory-string__photo-node"
              style={{
                left: `${xPercent}%`,
                top: `${y}px`,
              }}
            >
              <Polaroid
                memory={item.memory}
                index={item.originalIndex}
                isVisible={arePhotosVisible}
                hangerHeight={item.hangerHeight ?? (item.memory.offsetY || 32)}
                zIndex={10 + item.originalIndex}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
