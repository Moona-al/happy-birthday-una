'use client';

import { useEffect, useRef } from 'react';

interface AnimatedFlowerProps {
  onBloomComplete?: () => void;
}

const OUTER_ANGLES = [0, 60, 120, 180, 240, 300] as const;
const INNER_ANGLES = [30, 90, 150, 210, 270, 330] as const;

const PARTICLES = [
  { x: 66, y: 118, r: 2.5, delay: 3.85 },
  { x: 136, y: 113, r: 2,   delay: 4.0  },
  { x: 58,  y: 158, r: 1.8, delay: 3.95 },
  { x: 143, y: 170, r: 2,   delay: 4.1  },
  { x: 100, y: 101, r: 2.5, delay: 3.9  },
  { x: 54,  y: 138, r: 1.5, delay: 4.15 },
  { x: 145, y: 140, r: 1.8, delay: 4.05 },
] as const;

export default function AnimatedFlower({ onBloomComplete }: AnimatedFlowerProps) {
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    // Bloom is complete ~3.8s after mount (last inner petal at 3.12 + 5*0.085 + 0.75 = ~4.3s)
    // We call slightly earlier for a smoother text transition
    const t = setTimeout(() => onBloomComplete?.(), 3800);
    return () => clearTimeout(t);
  }, [onBloomComplete]);

  return (
    <div className="bd-flower-wrap" aria-hidden="true">
      <svg
        viewBox="0 0 200 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="bd-flower-svg"
        role="img"
        aria-label="Flower blooming animation"
      >
        {/* ── Everything that sways together ── */}
        <g className="bd-f-group">

          {/* Seed — first thing to appear */}
          <circle
            className="bd-f-seed"
            cx="100"
            cy="408"
            r="4"
            fill="var(--flower-stem)"
          />

          {/* Stem — grows upward from seed */}
          <path
            className="bd-f-stem"
            d="M 100 408 C 98 360 102 306 99 268 C 96 238 101 208 100 184"
            stroke="var(--flower-stem)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Leaf left */}
          <path
            className="bd-f-leaf bd-f-leaf-1"
            d="M 100 282 C 82 270 62 266 54 251 C 68 261 87 272 100 279 Z"
            fill="var(--flower-leaf)"
          />

          {/* Leaf right */}
          <path
            className="bd-f-leaf bd-f-leaf-2"
            d="M 100 245 C 118 232 138 228 148 214 C 132 225 114 236 100 242 Z"
            fill="var(--flower-leaf)"
          />

          {/* Outer petals — 6, every 60° */}
          {OUTER_ANGLES.map((angle, i) => (
            <g key={`op-${i}`} transform={`rotate(${angle} 100 170)`}>
              <ellipse
                className="bd-f-petal"
                cx="100"
                cy="132"
                rx="17"
                ry="40"
                fill="var(--flower-petal)"
                opacity="0.88"
                style={{ animationDelay: `${3.0 + i * 0.085}s` }}
              />
            </g>
          ))}

          {/* Inner petals — 6, offset 30° for depth */}
          {INNER_ANGLES.map((angle, i) => (
            <g key={`ip-${i}`} transform={`rotate(${angle} 100 170)`}>
              <ellipse
                className="bd-f-petal bd-f-petal--inner"
                cx="100"
                cy="149"
                rx="10"
                ry="25"
                fill="var(--flower-petal-dark)"
                opacity="0.72"
                style={{ animationDelay: `${3.12 + i * 0.085}s` }}
              />
            </g>
          ))}

          {/* Bud / center — appears before petals to "seed" the bloom */}
          <circle
            className="bd-f-bud"
            cx="100"
            cy="170"
            r="16"
            fill="var(--flower-center)"
          />

          {/* Inner center dot — reveals after bloom */}
          <circle
            className="bd-f-center-dot"
            cx="100"
            cy="170"
            r="8"
            fill="var(--flower-center-dark)"
          />
        </g>

        {/* ── Pollen particles (outside sway group so they float freely) ── */}
        {PARTICLES.map((p, i) => (
          <circle
            key={`par-${i}`}
            className="bd-f-particle"
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="var(--flower-petal)"
            style={{ animationDelay: `${p.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
