'use client';

import React from 'react';
import {
  gardenFlowers,
  gardenLeaves,
  floatingPetals,
  groundPetals,
  groundVegetation,
  type GardenFlower,
  type GardenLeaf,
} from './gardenData';

interface BloomingGardenProps {
  bloomKey?: number;
  isInteracting?: boolean;
  onHeroClick?: () => void;
}

export default function BloomingGarden({
  bloomKey = 0,
  isInteracting = false,
  onHeroClick,
}: BloomingGardenProps) {
  // Ambient warm light dust motes (5-8 motes)
  const dustMotes = [
    { id: 1, left: '16%', bottom: '38%', dur: '18s', delay: '0s', size: 3.5 },
    { id: 2, left: '28%', bottom: '52%', dur: '22s', delay: '3s', size: 4 },
    { id: 3, left: '48%', bottom: '28%', dur: '16s', delay: '6s', size: 3 },
    { id: 4, left: '72%', bottom: '45%', dur: '24s', delay: '2s', size: 4.5 },
    { id: 5, left: '84%', bottom: '34%', dur: '20s', delay: '8s', size: 3.2 },
    { id: 6, left: '38%', bottom: '65%', dur: '26s', delay: '4s', size: 3.8 },
    { id: 7, left: '62%', bottom: '58%', dur: '19s', delay: '7s', size: 3 },
  ];

  const bgFlowers = gardenFlowers.filter((f) => f.layer === 'background');
  const midFlowers = gardenFlowers.filter((f) => f.layer === 'midground');
  const foreFlowers = gardenFlowers.filter((f) => f.layer === 'foreground');

  const bgLeaves = gardenLeaves.filter((l) => l.layer === 'background');
  const midLeaves = gardenLeaves.filter((l) => l.layer === 'midground');
  const foreLeaves = gardenLeaves.filter((l) => l.layer === 'foreground');

  return (
    <div
      key={bloomKey}
      className={`bd-garden${isInteracting ? ' bd-garden--ripple' : ''}`}
      aria-hidden="true"
    >
      {/* ── 1. AMBIENT WARM GARDEN GLOW & HALO ── */}
      <div className="bd-garden__halo bd-garden__halo--breathe" />

      {/* ── 2. AMBIENT LIGHT DUST MOTES (5–8 warm motes) ── */}
      <div className="bd-garden__dust-layer">
        {dustMotes.map((mote) => (
          <span
            key={mote.id}
            className="bd-garden__dust-mote"
            style={{
              left: mote.left,
              bottom: mote.bottom,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
              animationDuration: mote.dur,
              animationDelay: mote.delay,
            }}
          />
        ))}
      </div>

      {/* ── 3. FLOATING / DRIFTING PETALS LAYER (8–12 Petals) ── */}
      <div className="bd-garden__petals-layer">
        {floatingPetals.map((petal) => (
          <div
            key={petal.id}
            className="bd-drifting-petal"
            style={{
              left: petal.left,
              top: petal.top,
              animationDelay: petal.delay,
              animationDuration: petal.dur,
              transform: `scale(${petal.scale})`,
              ['--drift-x' as string]: `${petal.driftX}px`,
              ['--drift-y' as string]: `${petal.driftY}px`,
            }}
          >
            <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
              <path
                d="M 11 0 C 18 8 22 17 19 24 C 16 29 6 29 3 24 C 0 17 4 8 11 0 Z"
                fill={petal.color}
                opacity="0.82"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* ── 4. BACKGROUND LAYER (Depth 1: soft, scale 0.35–0.5, gentle wind) ── */}
      <div className="bd-garden__layer bd-garden__layer--bg">
        {bgLeaves.map((leaf) => (
          <GardenLeafItem key={leaf.id} leaf={leaf} isInteracting={isInteracting} />
        ))}
        {bgFlowers.map((flower) => (
          <GardenFlowerItem key={flower.id} flower={flower} isInteracting={isInteracting} />
        ))}
      </div>

      {/* ── 5. MIDGROUND LAYER (Depth 2: framing left & right, scale 0.5–0.68) ── */}
      <div className="bd-garden__layer bd-garden__layer--mid">
        {midLeaves.map((leaf) => (
          <GardenLeafItem key={leaf.id} leaf={leaf} isInteracting={isInteracting} />
        ))}
        {midFlowers.map((flower) => (
          <GardenFlowerItem key={flower.id} flower={flower} isInteracting={isInteracting} />
        ))}
      </div>

      {/* ── 6. FOREGROUND LAYER (Depth 3: HERO FLOWER + closest accents) ── */}
      <div className="bd-garden__layer bd-garden__layer--fore">
        {/* Ground vegetation & grass (grounding the stems) */}
        <div className="bd-garden__ground-vegetation">
          {groundVegetation.map((veg) => (
            <div
              key={veg.id}
              className={`bd-garden__grass bd-garden__grass--${veg.type}`}
              style={{
                left: `${veg.x}%`,
                bottom: `${veg.y}px`,
                transform: `rotate(${veg.rotation}deg)`,
              }}
            >
              <svg width="12" height={veg.height} viewBox={`0 0 12 ${veg.height}`} fill="none">
                <path
                  d={`M 6 ${veg.height} Q ${veg.rotation > 0 ? 10 : 2} ${veg.height / 2} 6 0 Q ${veg.rotation > 0 ? 8 : 4} ${veg.height / 2} 6 ${veg.height}`}
                  fill="var(--flower-stem)"
                  opacity="0.75"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Fallen petals resting on the ground with subtle breathing */}
        <div className="bd-garden__ground-petals">
          {groundPetals.map((gp) => (
            <div
              key={gp.id}
              className="bd-garden__ground-petal"
              style={{
                left: `${gp.x}%`,
                bottom: `${gp.y}px`,
                transform: `rotate(${gp.rotation}deg) scale(${gp.scale})`,
              }}
            >
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <path
                  d="M 8 0 C 13 6 16 13 14 17 C 12 21 4 21 2 17 C 0 13 3 6 8 0 Z"
                  fill={`var(--flower-petal${gp.colorTone === 'main' ? '' : `-${gp.colorTone}`})`}
                  opacity="0.65"
                />
              </svg>
            </div>
          ))}
        </div>

        {foreLeaves.map((leaf) => (
          <GardenLeafItem key={leaf.id} leaf={leaf} isInteracting={isInteracting} />
        ))}

        {foreFlowers.map((flower) => (
          <GardenFlowerItem
            key={flower.id}
            flower={flower}
            isInteracting={isInteracting}
            onHeroClick={flower.type === 'hero' ? onHeroClick : undefined}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// COMPONENT: GardenFlowerItem (Orchestrator for individual flowers)
// ============================================================
function GardenFlowerItem({
  flower,
  isInteracting,
  onHeroClick,
}: {
  flower: GardenFlower;
  isInteracting: boolean;
  onHeroClick?: () => void;
}) {
  const isHero = flower.type === 'hero';

  return (
    <div
      className={`bd-garden__flower bd-garden__flower--${flower.layer} bd-pos-flower-${flower.id}${
        !flower.mobileVisible ? ' bd-garden__flower--desktop-only' : ''
      }${isHero ? ' bd-garden__flower--hero' : ''}`}
      style={{
        left: `${flower.x}%`,
        bottom: `${flower.y}px`,
        transform: `translateX(-50%) scale(${flower.scale}) rotate(${flower.rotation}deg)`,
        ['--mobile-left' as string]: flower.mobileX !== undefined ? `${flower.mobileX}%` : `${flower.x}%`,
        ['--mobile-bottom' as string]: flower.mobileY !== undefined ? `${flower.mobileY}px` : `${flower.y}px`,
        ['--mobile-scale' as string]: flower.mobileScale ?? flower.scale * 0.85,
        ['--bloom-delay' as string]: `${flower.bloomDelay}s`,
        ['--sway-dur' as string]: `${flower.swayDuration}s`,
        ['--sway-delay' as string]: `${flower.swayDelay}s`,
        cursor: isHero ? 'pointer' : undefined,
        pointerEvents: isHero ? 'auto' : undefined,
      }}
      onClick={onHeroClick}
      title={isHero ? 'Click to make the garden sway' : undefined}
    >
      {isHero ? (
        <HeroFlower delay={flower.bloomDelay} swayDur={`${flower.swayDuration}s`} />
      ) : flower.type === 'tulip' ? (
        <TulipFlower delay={flower.bloomDelay} swayDur={`${flower.swayDuration}s`} height={270} />
      ) : flower.type === 'wildflower' ? (
        <LavenderSpire delay={flower.bloomDelay} swayDur={`${flower.swayDuration}s`} height={260} />
      ) : flower.type === 'rosebud' ? (
        <RosebudFlower delay={flower.bloomDelay} swayDur={`${flower.swayDuration}s`} height={260} />
      ) : (
        <BlossomFlower
          delay={flower.bloomDelay}
          swayDur={`${flower.swayDuration}s`}
          height={260}
          petalTone={flower.id.includes('right') ? 'warm' : 'main'}
        />
      )}
    </div>
  );
}

// ============================================================
// COMPONENT: GardenLeafItem (Orchestrator for standalone leaves/ferns)
// ============================================================
function GardenLeafItem({
  leaf,
  isInteracting,
}: {
  leaf: GardenLeaf;
  isInteracting: boolean;
}) {
  return (
    <div
      className={`bd-garden__leaf-node bd-garden__leaf--${leaf.layer}${
        !leaf.mobileVisible ? ' bd-garden__leaf--desktop-only' : ''
      }`}
      style={{
        left: `${leaf.x}%`,
        bottom: `${leaf.y}px`,
        transform: `translateX(-50%) scale(${leaf.scale}) rotate(${leaf.rotation}deg)`,
        ['--grow-delay' as string]: `${leaf.growDelay}s`,
        ['--sway-dur' as string]: `${leaf.swayDuration}s`,
        ['--sway-delay' as string]: `${leaf.swayDelay}s`,
      }}
    >
      {leaf.type === 'fern' ? (
        <FernBranch delay={leaf.growDelay} swayDur={`${leaf.swayDuration}s`} height={230} />
      ) : (
        <BotanicalLeaf
          delay={leaf.growDelay}
          swayDur={`${leaf.swayDuration}s`}
          type={leaf.type}
          height={210}
        />
      )}
    </div>
  );
}

// ============================================================
// 1. HERO FLOWER (The Grand Focal Centerpiece, Blooms First)
// ============================================================
interface HeroFlowerProps {
  delay: number;
  swayDur: string;
}

export function HeroFlower({ delay, swayDur }: HeroFlowerProps) {
  // 8 Outer petals radiating at 45deg intervals
  const outerAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  // 8 Inner petals radiating at 22.5deg offset
  const innerAngles = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

  return (
    <svg
      viewBox="0 0 240 400"
      className="bd-garden-svg bd-svg-hero-flower"
      style={{ height: '335px' }}
    >
      <g
        className="bd-sway-group bd-sway-group--hero"
        style={{
          animationDuration: swayDur,
          animationDelay: `${delay + 2.2}s`,
        }}
      >
        {/* Seed */}
        <circle
          className="bd-grow-seed"
          cx="120"
          cy="388"
          r="4.5"
          fill="var(--flower-stem)"
          style={{ animationDelay: `${delay}s` }}
        />

        {/* Strong curved stem */}
        <path
          className="bd-grow-stem bd-stem-hero"
          d="M 120 388 C 117 315 124 235 119 165 C 117 140 121 120 120 100"
          stroke="var(--flower-stem)"
          strokeWidth="4.2"
          strokeLinecap="round"
          style={{ animationDelay: `${delay + 0.25}s` }}
        />

        {/* Lower Left Majestic Leaf */}
        <path
          className="bd-grow-leaf bd-leaf-left"
          d="M 120 265 C 85 248 55 240 38 215 C 62 232 92 250 120 260 Z"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 0.8}s` }}
        />
        {/* Lower Right Majestic Leaf */}
        <path
          className="bd-grow-leaf bd-leaf-right"
          d="M 120 230 C 152 212 182 205 198 180 C 175 198 145 215 120 225 Z"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 1.0}s` }}
        />
        {/* Mid Left Tender Leaf */}
        <path
          className="bd-grow-leaf bd-leaf-left"
          d="M 120 180 C 98 168 78 162 65 145 C 80 156 102 168 120 176 Z"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 1.15}s` }}
        />

        {/* Outer Radiant Petals (Grand unfolding crown) */}
        {outerAngles.map((angle, i) => (
          <g key={`hero-out-${i}`} transform={`rotate(${angle} 120 95)`}>
            <ellipse
              className="bd-grow-petal bd-hero-petal"
              cx="120"
              cy="52"
              rx="18"
              ry="42"
              fill="var(--flower-petal)"
              opacity="0.92"
              style={{ animationDelay: `${delay + 1.3 + i * 0.05}s` }}
            />
          </g>
        ))}

        {/* Inner Warm Petals */}
        {innerAngles.map((angle, i) => (
          <g key={`hero-in-${i}`} transform={`rotate(${angle} 120 95)`}>
            <ellipse
              className="bd-grow-petal bd-petal-inner bd-hero-petal-inner"
              cx="120"
              cy="66"
              rx="13"
              ry="27"
              fill="var(--flower-petal-dark)"
              opacity="0.82"
              style={{ animationDelay: `${delay + 1.5 + i * 0.05}s` }}
            />
          </g>
        ))}

        {/* Center Disc with Warm Golden Aura */}
        <circle
          className="bd-grow-bud"
          cx="120"
          cy="95"
          r="19"
          fill="var(--flower-center)"
          style={{ animationDelay: `${delay + 1.25}s` }}
        />
        <circle
          className="bd-grow-center"
          cx="120"
          cy="95"
          r="9.5"
          fill="var(--flower-center-dark)"
          style={{ animationDelay: `${delay + 1.9}s` }}
        />

        {/* Radiating Golden Stamen Specks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <circle
            key={`hero-st-${i}`}
            className="bd-grow-center"
            cx={120 + Math.cos((deg * Math.PI) / 180) * 13}
            cy={95 + Math.sin((deg * Math.PI) / 180) * 13}
            r="2"
            fill="var(--flower-center-dark)"
            style={{ animationDelay: `${delay + 2.0}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

// ============================================================
// 2. BLOSSOM FLOWER (Radiating rounded petals)
// ============================================================
interface BlossomProps {
  delay: number;
  swayDur: string;
  height: number;
  petalTone?: 'main' | 'soft' | 'warm';
}

export function BlossomFlower({
  delay,
  swayDur,
  height,
  petalTone = 'main',
}: BlossomProps) {
  const outerAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  const innerAngles = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

  const petalFill =
    petalTone === 'soft'
      ? 'var(--flower-petal-soft)'
      : petalTone === 'warm'
      ? 'var(--flower-petal-warm)'
      : 'var(--flower-petal)';

  return (
    <svg
      viewBox="0 0 180 360"
      className="bd-garden-svg bd-svg-blossom"
      style={{ height: `${height}px` }}
    >
      <g
        className="bd-sway-group"
        style={{
          animationDuration: swayDur,
          animationDelay: `${delay + 2.2}s`,
        }}
      >
        <circle
          className="bd-grow-seed"
          cx="90"
          cy="352"
          r="3.5"
          fill="var(--flower-stem)"
          style={{ animationDelay: `${delay}s` }}
        />
        <path
          className="bd-grow-stem"
          d="M 90 352 C 88 290 93 220 89 160 C 87 135 91 115 90 95"
          stroke="var(--flower-stem)"
          strokeWidth="3.2"
          strokeLinecap="round"
          style={{ animationDelay: `${delay + 0.3}s` }}
        />
        <path
          className="bd-grow-leaf bd-leaf-left"
          d="M 90 220 C 68 208 48 204 38 188 C 52 198 72 210 90 217 Z"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 0.85}s` }}
        />
        <path
          className="bd-grow-leaf bd-leaf-right"
          d="M 90 185 C 110 172 130 168 142 152 C 128 164 108 176 90 182 Z"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 1.05}s` }}
        />

        {outerAngles.map((angle, i) => (
          <g key={`out-${i}`} transform={`rotate(${angle} 90 90)`}>
            <ellipse
              className="bd-grow-petal"
              cx="90"
              cy="58"
              rx="13"
              ry="30"
              fill={petalFill}
              opacity="0.88"
              style={{ animationDelay: `${delay + 1.35 + i * 0.05}s` }}
            />
          </g>
        ))}

        {innerAngles.map((angle, i) => (
          <g key={`in-${i}`} transform={`rotate(${angle} 90 90)`}>
            <ellipse
              className="bd-grow-petal bd-petal-inner"
              cx="90"
              cy="68"
              rx="9"
              ry="19"
              fill="var(--flower-petal-dark)"
              opacity="0.75"
              style={{ animationDelay: `${delay + 1.5 + i * 0.05}s` }}
            />
          </g>
        ))}

        <circle
          className="bd-grow-bud"
          cx="90"
          cy="90"
          r="14"
          fill="var(--flower-center)"
          style={{ animationDelay: `${delay + 1.25}s` }}
        />
        <circle
          className="bd-grow-center"
          cx="90"
          cy="90"
          r="7"
          fill="var(--flower-center-dark)"
          style={{ animationDelay: `${delay + 1.9}s` }}
        />
      </g>
    </svg>
  );
}

// ============================================================
// 3. TULIP FLOWER (Opening cup bloom)
// ============================================================
interface TulipProps {
  delay: number;
  swayDur: string;
  height: number;
}

export function TulipFlower({ delay, swayDur, height }: TulipProps) {
  return (
    <svg
      viewBox="0 0 160 360"
      className="bd-garden-svg bd-svg-tulip"
      style={{ height: `${height}px` }}
    >
      <g
        className="bd-sway-group"
        style={{
          animationDuration: swayDur,
          animationDelay: `${delay + 2.3}s`,
        }}
      >
        <circle
          className="bd-grow-seed"
          cx="80"
          cy="352"
          r="3.5"
          fill="var(--flower-stem)"
          style={{ animationDelay: `${delay}s` }}
        />
        <path
          className="bd-grow-stem"
          d="M 80 352 C 78 285 85 210 78 145 C 76 125 80 105 80 85"
          stroke="var(--flower-stem)"
          strokeWidth="3.4"
          strokeLinecap="round"
          style={{ animationDelay: `${delay + 0.3}s` }}
        />
        <path
          className="bd-grow-leaf bd-leaf-left"
          d="M 80 265 C 52 235 38 190 35 135 C 45 175 64 220 80 255 Z"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 0.8}s` }}
        />
        <path
          className="bd-grow-leaf bd-leaf-right"
          d="M 80 235 C 104 210 122 170 126 115 C 117 158 100 200 80 228 Z"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 1.0}s` }}
        />
        <path
          className="bd-tulip-petal bd-tulip-petal--back"
          d="M 80 85 C 65 62 68 38 80 30 C 92 38 95 62 80 85 Z"
          fill="var(--flower-petal-dark)"
          opacity="0.85"
          style={{ animationDelay: `${delay + 1.3}s` }}
        />
        <path
          className="bd-tulip-petal bd-tulip-petal--left"
          d="M 80 90 C 62 85 50 66 50 48 C 60 38 75 52 80 90 Z"
          fill="var(--flower-petal)"
          opacity="0.9"
          style={{ animationDelay: `${delay + 1.45}s` }}
        />
        <path
          className="bd-tulip-petal bd-tulip-petal--right"
          d="M 80 90 C 98 85 110 66 110 48 C 100 38 85 52 80 90 Z"
          fill="var(--flower-petal)"
          opacity="0.9"
          style={{ animationDelay: `${delay + 1.55}s` }}
        />
        <path
          className="bd-tulip-petal bd-tulip-petal--center"
          d="M 80 95 C 69 80 65 58 80 44 C 95 58 91 80 80 95 Z"
          fill="var(--flower-petal-warm)"
          opacity="0.95"
          style={{ animationDelay: `${delay + 1.65}s` }}
        />
      </g>
    </svg>
  );
}

// ============================================================
// 4. LAVENDER / WILDFLOWER SPIRE (Ascending florets)
// ============================================================
interface LavenderProps {
  delay: number;
  swayDur: string;
  height: number;
}

export function LavenderSpire({ delay, swayDur, height }: LavenderProps) {
  const florets = [
    { y: 145, xOff: -10, r: 5.5, rot: -25 },
    { y: 140, xOff: 10, r: 5.5, rot: 25 },
    { y: 125, xOff: -11, r: 5, rot: -30 },
    { y: 120, xOff: 11, r: 5, rot: 30 },
    { y: 105, xOff: -9, r: 4.8, rot: -25 },
    { y: 100, xOff: 9, r: 4.8, rot: 25 },
    { y: 85, xOff: -8, r: 4.4, rot: -20 },
    { y: 80, xOff: 8, r: 4.4, rot: 20 },
    { y: 66, xOff: -6, r: 4, rot: -15 },
    { y: 62, xOff: 6, r: 4, rot: 15 },
    { y: 50, xOff: 0, r: 3.8, rot: 0 },
    { y: 40, xOff: 0, r: 3, rot: 0 },
  ];

  return (
    <svg
      viewBox="0 0 100 360"
      className="bd-garden-svg bd-svg-lavender"
      style={{ height: `${height}px` }}
    >
      <g
        className="bd-sway-group"
        style={{
          animationDuration: swayDur,
          animationDelay: `${delay + 2.0}s`,
        }}
      >
        <circle
          className="bd-grow-seed"
          cx="50"
          cy="352"
          r="3"
          fill="var(--flower-stem)"
          style={{ animationDelay: `${delay}s` }}
        />
        <path
          className="bd-grow-stem"
          d="M 50 352 C 49 265 52 170 50 38"
          stroke="var(--flower-stem)"
          strokeWidth="2.8"
          strokeLinecap="round"
          style={{ animationDelay: `${delay + 0.25}s` }}
        />
        <path
          className="bd-grow-leaf bd-leaf-left"
          d="M 50 275 C 36 265 26 248 22 220 C 29 238 41 256 50 270 Z"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 0.7}s` }}
        />
        <path
          className="bd-grow-leaf bd-leaf-right"
          d="M 50 248 C 64 238 74 220 78 192 C 70 210 59 229 50 243 Z"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 0.9}s` }}
        />
        {florets.map((f, i) => (
          <ellipse
            key={`floret-${i}`}
            className="bd-floret"
            cx={50 + f.xOff}
            cy={f.y}
            rx={f.r}
            ry={f.r * 1.5}
            fill={i % 2 === 0 ? 'var(--flower-petal-soft)' : 'var(--flower-petal)'}
            transform={`rotate(${f.rot} ${50 + f.xOff} ${f.y})`}
            opacity="0.9"
            style={{ animationDelay: `${delay + 1.2 + i * 0.07}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

// ============================================================
// 5. ROSEBUD FLOWER (Layered swirling petals)
// ============================================================
interface RosebudProps {
  delay: number;
  swayDur: string;
  height: number;
}

export function RosebudFlower({ delay, swayDur, height }: RosebudProps) {
  return (
    <svg
      viewBox="0 0 160 360"
      className="bd-garden-svg bd-svg-rosebud"
      style={{ height: `${height}px` }}
    >
      <g
        className="bd-sway-group"
        style={{
          animationDuration: swayDur,
          animationDelay: `${delay + 2.3}s`,
        }}
      >
        <circle
          className="bd-grow-seed"
          cx="80"
          cy="352"
          r="3.5"
          fill="var(--flower-stem)"
          style={{ animationDelay: `${delay}s` }}
        />
        <path
          className="bd-grow-stem"
          d="M 80 352 C 82 285 76 210 81 140 C 83 120 80 100 80 80"
          stroke="var(--flower-stem)"
          strokeWidth="3.2"
          strokeLinecap="round"
          style={{ animationDelay: `${delay + 0.3}s` }}
        />
        <path
          className="bd-grow-leaf bd-leaf-left"
          d="M 80 230 C 60 218 45 208 40 188 C 50 200 66 212 80 226 Z"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 0.85}s` }}
        />
        <path
          className="bd-grow-leaf bd-leaf-right"
          d="M 80 195 C 100 184 115 174 120 154 C 110 166 94 178 80 190 Z"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 1.0}s` }}
        />
        <path
          className="bd-rose-petal bd-rose-outer-left"
          d="M 80 84 C 60 80 50 60 56 42 C 65 35 77 48 80 84 Z"
          fill="var(--flower-petal)"
          opacity="0.88"
          style={{ animationDelay: `${delay + 1.35}s` }}
        />
        <path
          className="bd-rose-petal bd-rose-outer-right"
          d="M 80 84 C 100 80 110 60 104 42 C 95 35 83 48 80 84 Z"
          fill="var(--flower-petal)"
          opacity="0.88"
          style={{ animationDelay: `${delay + 1.45}s` }}
        />
        <path
          className="bd-rose-petal bd-rose-mid-left"
          d="M 80 82 C 66 76 62 58 70 44 C 77 41 82 53 80 82 Z"
          fill="var(--flower-petal-dark)"
          opacity="0.85"
          style={{ animationDelay: `${delay + 1.6}s` }}
        />
        <path
          className="bd-rose-petal bd-rose-mid-right"
          d="M 80 82 C 94 76 98 58 90 44 C 83 41 78 53 80 82 Z"
          fill="var(--flower-petal-dark)"
          opacity="0.85"
          style={{ animationDelay: `${delay + 1.7}s` }}
        />
        <circle
          className="bd-grow-bud"
          cx="80"
          cy="50"
          r="12"
          fill="var(--flower-petal-warm)"
          style={{ animationDelay: `${delay + 1.8}s` }}
        />
      </g>
    </svg>
  );
}

// ============================================================
// 6. BOTANICAL LEAF (Single, Paired, or Curved greenery branch)
// ============================================================
interface BotanicalLeafProps {
  delay: number;
  swayDur: string;
  type: 'single' | 'curved' | 'paired';
  height: number;
}

export function BotanicalLeaf({
  delay,
  swayDur,
  type,
  height,
}: BotanicalLeafProps) {
  return (
    <svg
      viewBox="0 0 100 320"
      className="bd-garden-svg bd-svg-botanical-leaf"
      style={{ height: `${height}px` }}
    >
      <g
        className="bd-sway-group"
        style={{
          animationDuration: swayDur,
          animationDelay: `${delay + 2.0}s`,
        }}
      >
        <circle
          className="bd-grow-seed"
          cx="50"
          cy="312"
          r="3"
          fill="var(--flower-stem)"
          style={{ animationDelay: `${delay}s` }}
        />
        <path
          className="bd-grow-stem"
          d={type === 'curved' ? 'M 50 312 C 45 240 65 160 48 60' : 'M 50 312 C 52 230 48 150 50 70'}
          stroke="var(--flower-stem)"
          strokeWidth="2.8"
          strokeLinecap="round"
          style={{ animationDelay: `${delay + 0.25}s` }}
        />

        {/* Lower Leaf */}
        <path
          className="bd-grow-leaf bd-leaf-left"
          d="M 50 230 C 30 216 15 200 12 175 C 24 190 38 208 50 224 Z"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 0.75}s` }}
        />

        {/* Opposite Leaf if paired */}
        {type === 'paired' && (
          <path
            className="bd-grow-leaf bd-leaf-right"
            d="M 50 210 C 70 196 85 180 88 155 C 76 170 62 188 50 204 Z"
            fill="var(--flower-leaf)"
            style={{ animationDelay: `${delay + 0.9}s` }}
          />
        )}

        {/* Tip Leaf */}
        <path
          className="bd-grow-leaf"
          d="M 50 140 C 40 115 42 85 50 60 C 58 85 60 115 50 140 Z"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 1.15}s` }}
        />
      </g>
    </svg>
  );
}

// ============================================================
// 7. FERN BRANCH (Lush arching frond leaves)
// ============================================================
interface FernProps {
  delay: number;
  swayDur: string;
  height: number;
}

export function FernBranch({ delay, swayDur, height }: FernProps) {
  const leafPairs = [
    { y: 190, lx: 38, rx: 62, lw: 14, rotL: -30, rotR: 30 },
    { y: 160, lx: 36, rx: 64, lw: 15, rotL: -35, rotR: 35 },
    { y: 130, lx: 36, rx: 64, lw: 14, rotL: -40, rotR: 40 },
    { y: 100, lx: 39, rx: 61, lw: 12, rotL: -45, rotR: 45 },
    { y: 70, lx: 43, rx: 57, lw: 10, rotL: -48, rotR: 48 },
  ];

  return (
    <svg
      viewBox="0 0 100 320"
      className="bd-garden-svg bd-svg-fern"
      style={{ height: `${height}px` }}
    >
      <g
        className="bd-sway-group"
        style={{
          animationDuration: swayDur,
          animationDelay: `${delay + 2.2}s`,
        }}
      >
        <circle
          className="bd-grow-seed"
          cx="50"
          cy="312"
          r="3"
          fill="var(--flower-stem)"
          style={{ animationDelay: `${delay}s` }}
        />
        <path
          className="bd-grow-stem"
          d="M 50 312 C 52 240 46 160 52 45"
          stroke="var(--flower-stem)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ animationDelay: `${delay + 0.3}s` }}
        />
        {leafPairs.map((pair, i) => (
          <g key={`frond-${i}`}>
            <ellipse
              className="bd-grow-leaf"
              cx={pair.lx}
              cy={pair.y}
              rx={pair.lw}
              ry="5"
              fill="var(--flower-leaf)"
              transform={`rotate(${pair.rotL} ${pair.lx} ${pair.y})`}
              style={{ animationDelay: `${delay + 0.75 + i * 0.1}s` }}
            />
            <ellipse
              className="bd-grow-leaf"
              cx={pair.rx}
              cy={pair.y}
              rx={pair.lw}
              ry="5"
              fill="var(--flower-leaf)"
              transform={`rotate(${pair.rotR} ${pair.rx} ${pair.y})`}
              style={{ animationDelay: `${delay + 0.8 + i * 0.1}s` }}
            />
          </g>
        ))}
        <ellipse
          className="bd-grow-leaf"
          cx="52"
          cy="38"
          rx="5.5"
          ry="11"
          fill="var(--flower-leaf)"
          style={{ animationDelay: `${delay + 1.5}s` }}
        />
      </g>
    </svg>
  );
}
