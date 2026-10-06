export interface GardenFlower {
  id: string;
  type: 'hero' | 'blossom' | 'tulip' | 'wildflower' | 'rosebud';
  x: number; // percentage (0 - 100)
  y: number; // px from bottom
  scale: number;
  rotation: number;
  layer: 'background' | 'midground' | 'foreground';
  bloomDelay: number; // in seconds
  swayDuration: number; // in seconds
  swayDelay: number;
  mobileVisible?: boolean;
  mobileX?: number;
  mobileY?: number;
  mobileScale?: number;
}

export interface GardenLeaf {
  id: string;
  type: 'single' | 'fern' | 'curved' | 'paired';
  x: number; // percentage
  y: number; // px from bottom
  rotation: number;
  scale: number;
  layer: 'background' | 'midground' | 'foreground';
  growDelay: number;
  swayDuration: number;
  swayDelay: number;
  mobileVisible?: boolean;
}

export interface GroundPetal {
  id: string;
  x: number; // percentage
  y: number; // px from bottom
  rotation: number;
  scale: number;
  colorTone: 'main' | 'soft' | 'dark' | 'warm';
}

export interface FloatingPetal {
  id: string;
  left: string;
  top: string;
  delay: string;
  dur: string;
  scale: number;
  driftX: number; // px
  driftY: number; // px
  color: string;
}

export interface GroundVegetation {
  id: string;
  x: number; // percentage
  y: number; // px from bottom
  height: number;
  rotation: number;
  type: 'grass' | 'sprout';
}

// ─── 1. FLOWERS DATA (1 Hero + 12 Secondary Flowers) ───
export const gardenFlowers: GardenFlower[] = [
  // ── HERO FLOWER (Focal Point, Center, Scale 1.0) ──
  {
    id: 'hero-flower',
    type: 'hero',
    x: 50,
    y: -25,
    scale: 1.05,
    rotation: 0,
    layer: 'foreground',
    bloomDelay: 0.2, // Blooms first!
    swayDuration: 5.6,
    swayDelay: 0,
    mobileVisible: true,
    mobileX: 50,
    mobileY: -30,
    mobileScale: 0.88,
  },

  // ── BACKGROUND LAYER FLOWERS (Soft, slightly blurred, scale 0.35–0.5) ──
  {
    id: 'bg-flower-left-1',
    type: 'wildflower',
    x: 5,
    y: 10,
    scale: 0.42,
    rotation: -12,
    layer: 'background',
    bloomDelay: 1.6,
    swayDuration: 7.2,
    swayDelay: 0.3,
    mobileVisible: false,
  },
  {
    id: 'bg-flower-left-2',
    type: 'blossom',
    x: 20,
    y: 35,
    scale: 0.45,
    rotation: -6,
    layer: 'background',
    bloomDelay: 1.8,
    swayDuration: 6.8,
    swayDelay: 0.8,
    mobileVisible: true,
    mobileX: 14,
    mobileY: 20,
    mobileScale: 0.38,
  },
  {
    id: 'bg-flower-center-back',
    type: 'blossom',
    x: 50,
    y: 70,
    scale: 0.38,
    rotation: 2,
    layer: 'background',
    bloomDelay: 1.7,
    swayDuration: 6.5,
    swayDelay: 1.1,
    mobileVisible: true,
    mobileX: 50,
    mobileY: 60,
    mobileScale: 0.34,
  },
  {
    id: 'bg-flower-right-1',
    type: 'wildflower',
    x: 82,
    y: 30,
    scale: 0.44,
    rotation: 8,
    layer: 'background',
    bloomDelay: 1.85,
    swayDuration: 7.0,
    swayDelay: 0.5,
    mobileVisible: true,
    mobileX: 84,
    mobileY: 20,
    mobileScale: 0.38,
  },
  {
    id: 'bg-flower-right-2',
    type: 'blossom',
    x: 95,
    y: 12,
    scale: 0.40,
    rotation: 14,
    layer: 'background',
    bloomDelay: 1.95,
    swayDuration: 7.4,
    swayDelay: 1.4,
    mobileVisible: false,
  },

  // ── MIDGROUND LAYER FLOWERS (Framing Left & Right, scale 0.5–0.68) ──
  {
    id: 'mid-flower-left-1',
    type: 'tulip',
    x: 14,
    y: -5,
    scale: 0.62,
    rotation: -8,
    layer: 'midground',
    bloomDelay: 1.45,
    swayDuration: 5.8,
    swayDelay: 0.4,
    mobileVisible: true,
    mobileX: 8,
    mobileY: -10,
    mobileScale: 0.52,
  },
  {
    id: 'mid-flower-left-2',
    type: 'blossom',
    x: 28,
    y: 15,
    scale: 0.56,
    rotation: -4,
    layer: 'midground',
    bloomDelay: 1.55,
    swayDuration: 6.0,
    swayDelay: 0.9,
    mobileVisible: true,
    mobileX: 24,
    mobileY: 10,
    mobileScale: 0.48,
  },
  {
    id: 'mid-flower-right-1',
    type: 'rosebud',
    x: 72,
    y: 15,
    scale: 0.58,
    rotation: 6,
    layer: 'midground',
    bloomDelay: 1.5,
    swayDuration: 5.5,
    swayDelay: 0.6,
    mobileVisible: true,
    mobileX: 76,
    mobileY: 10,
    mobileScale: 0.50,
  },
  {
    id: 'mid-flower-right-2',
    type: 'tulip',
    x: 86,
    y: -5,
    scale: 0.64,
    rotation: 9,
    layer: 'midground',
    bloomDelay: 1.6,
    swayDuration: 5.9,
    swayDelay: 1.2,
    mobileVisible: true,
    mobileX: 92,
    mobileY: -10,
    mobileScale: 0.52,
  },

  // ── FOREGROUND LAYER FLOWERS (Accents near base, scale 0.65–0.8) ──
  {
    id: 'fore-flower-left-edge',
    type: 'rosebud',
    x: 3,
    y: -15,
    scale: 0.68,
    rotation: -10,
    layer: 'foreground',
    bloomDelay: 1.35,
    swayDuration: 5.1,
    swayDelay: 0.2,
    mobileVisible: false,
  },
  {
    id: 'fore-flower-left-accent',
    type: 'blossom',
    x: 38,
    y: -10,
    scale: 0.62,
    rotation: -5,
    layer: 'foreground',
    bloomDelay: 1.4,
    swayDuration: 5.3,
    swayDelay: 0.7,
    mobileVisible: true,
    mobileX: 35,
    mobileY: -15,
    mobileScale: 0.52,
  },
  {
    id: 'fore-flower-right-accent',
    type: 'rosebud',
    x: 62,
    y: -10,
    scale: 0.64,
    rotation: 5,
    layer: 'foreground',
    bloomDelay: 1.42,
    swayDuration: 5.2,
    swayDelay: 0.5,
    mobileVisible: true,
    mobileX: 65,
    mobileY: -15,
    mobileScale: 0.52,
  },
  {
    id: 'fore-flower-right-edge',
    type: 'blossom',
    x: 96,
    y: -15,
    scale: 0.68,
    rotation: 10,
    layer: 'foreground',
    bloomDelay: 1.38,
    swayDuration: 5.0,
    swayDelay: 1.0,
    mobileVisible: false,
  },
];

// ─── 2. BOTANICAL LEAVES & FERNS (22 Leaves / Greenery Stems) ───
export const gardenLeaves: GardenLeaf[] = [
  // Background ferns & branches
  { id: 'leaf-bg-1', type: 'fern', x: 8, y: -10, rotation: -22, scale: 0.55, layer: 'background', growDelay: 0.6, swayDuration: 7.2, swayDelay: 0.2, mobileVisible: false },
  { id: 'leaf-bg-2', type: 'single', x: 18, y: 15, rotation: -18, scale: 0.5, layer: 'background', growDelay: 0.8, swayDuration: 6.8, swayDelay: 0.5, mobileVisible: true },
  { id: 'leaf-bg-3', type: 'fern', x: 33, y: 40, rotation: -12, scale: 0.45, layer: 'background', growDelay: 1.0, swayDuration: 6.5, swayDelay: 0.9, mobileVisible: true },
  { id: 'leaf-bg-4', type: 'single', x: 44, y: 55, rotation: -6, scale: 0.42, layer: 'background', growDelay: 1.1, swayDuration: 7.0, swayDelay: 1.2, mobileVisible: true },
  { id: 'leaf-bg-5', type: 'single', x: 56, y: 55, rotation: 6, scale: 0.42, layer: 'background', growDelay: 1.1, swayDuration: 6.9, swayDelay: 0.4, mobileVisible: true },
  { id: 'leaf-bg-6', type: 'fern', x: 67, y: 40, rotation: 12, scale: 0.45, layer: 'background', growDelay: 1.0, swayDuration: 6.6, swayDelay: 0.7, mobileVisible: true },
  { id: 'leaf-bg-7', type: 'single', x: 82, y: 15, rotation: 18, scale: 0.5, layer: 'background', growDelay: 0.8, swayDuration: 7.1, swayDelay: 1.0, mobileVisible: true },
  { id: 'leaf-bg-8', type: 'fern', x: 92, y: -10, rotation: 22, scale: 0.55, layer: 'background', growDelay: 0.6, swayDuration: 7.3, swayDelay: 0.3, mobileVisible: false },

  // Midground paired leaves & curved greenery
  { id: 'leaf-mid-1', type: 'paired', x: 12, y: -2, rotation: -16, scale: 0.65, layer: 'midground', growDelay: 0.9, swayDuration: 5.8, swayDelay: 0.3, mobileVisible: true },
  { id: 'leaf-mid-2', type: 'curved', x: 22, y: 8, rotation: -10, scale: 0.62, layer: 'midground', growDelay: 1.0, swayDuration: 5.5, swayDelay: 0.8, mobileVisible: true },
  { id: 'leaf-mid-3', type: 'single', x: 32, y: 12, rotation: -8, scale: 0.58, layer: 'midground', growDelay: 1.1, swayDuration: 5.9, swayDelay: 0.5, mobileVisible: true },
  { id: 'leaf-mid-4', type: 'paired', x: 42, y: 18, rotation: -4, scale: 0.55, layer: 'midground', growDelay: 1.2, swayDuration: 5.6, swayDelay: 1.1, mobileVisible: true },
  { id: 'leaf-mid-5', type: 'paired', x: 58, y: 18, rotation: 4, scale: 0.55, layer: 'midground', growDelay: 1.2, swayDuration: 5.6, swayDelay: 0.6, mobileVisible: true },
  { id: 'leaf-mid-6', type: 'single', x: 68, y: 12, rotation: 8, scale: 0.58, layer: 'midground', growDelay: 1.1, swayDuration: 5.7, swayDelay: 0.9, mobileVisible: true },
  { id: 'leaf-mid-7', type: 'curved', x: 78, y: 8, rotation: 10, scale: 0.62, layer: 'midground', growDelay: 1.0, swayDuration: 5.4, swayDelay: 0.4, mobileVisible: true },
  { id: 'leaf-mid-8', type: 'paired', x: 88, y: -2, rotation: 16, scale: 0.65, layer: 'midground', growDelay: 0.9, swayDuration: 5.9, swayDelay: 1.3, mobileVisible: true },

  // Foreground prominent leaves flanking hero flower
  { id: 'leaf-fore-1', type: 'curved', x: 2, y: -12, rotation: -24, scale: 0.75, layer: 'foreground', growDelay: 1.2, swayDuration: 4.8, swayDelay: 0.2, mobileVisible: false },
  { id: 'leaf-fore-2', type: 'paired', x: 25, y: -15, rotation: -14, scale: 0.72, layer: 'foreground', growDelay: 1.3, swayDuration: 4.9, swayDelay: 0.7, mobileVisible: true },
  { id: 'leaf-fore-3', type: 'single', x: 46, y: -20, rotation: -8, scale: 0.8, layer: 'foreground', growDelay: 0.95, swayDuration: 5.0, swayDelay: 0.3, mobileVisible: true },
  { id: 'leaf-fore-4', type: 'single', x: 54, y: -20, rotation: 8, scale: 0.8, layer: 'foreground', growDelay: 1.05, swayDuration: 5.1, swayDelay: 0.5, mobileVisible: true },
  { id: 'leaf-fore-5', type: 'paired', x: 75, y: -15, rotation: 14, scale: 0.72, layer: 'foreground', growDelay: 1.3, swayDuration: 4.9, swayDelay: 0.8, mobileVisible: true },
  { id: 'leaf-fore-6', type: 'curved', x: 98, y: -12, rotation: 24, scale: 0.75, layer: 'foreground', growDelay: 1.2, swayDuration: 4.8, swayDelay: 0.4, mobileVisible: false },
];

// ─── 3. FLOATING / DRIFTING PETALS (12 Petals) ───
export const floatingPetals: FloatingPetal[] = [
  { id: 'petal-1', left: '10%', top: '22%', delay: '0s', dur: '9s', scale: 0.9, driftX: 60, driftY: -90, color: 'var(--flower-petal)' },
  { id: 'petal-2', left: '24%', top: '42%', delay: '2.2s', dur: '11s', scale: 1.1, driftX: 80, driftY: -110, color: 'var(--flower-petal-soft)' },
  { id: 'petal-3', left: '38%', top: '18%', delay: '4.5s', dur: '8.5s', scale: 0.75, driftX: 50, driftY: -80, color: 'var(--flower-petal-warm)' },
  { id: 'petal-4', left: '48%', top: '60%', delay: '1.5s', dur: '10s', scale: 1.05, driftX: 70, driftY: -100, color: 'var(--flower-petal)' },
  { id: 'petal-5', left: '62%', top: '26%', delay: '3.6s', dur: '9.5s', scale: 0.85, driftX: -60, driftY: -90, color: 'var(--flower-petal-dark)' },
  { id: 'petal-6', left: '76%', top: '48%', delay: '0.8s', dur: '12s', scale: 1.15, driftX: 90, driftY: -120, color: 'var(--flower-petal-soft)' },
  { id: 'petal-7', left: '88%', top: '20%', delay: '5.0s', dur: '10.5s', scale: 0.8, driftX: -70, driftY: -100, color: 'var(--flower-petal)' },
  { id: 'petal-8', left: '6%', top: '65%', delay: '3.0s', dur: '11.5s', scale: 0.95, driftX: 85, driftY: -95, color: 'var(--flower-petal-warm)' },
  { id: 'petal-9', left: '94%', top: '58%', delay: '1.9s', dur: '10s', scale: 0.85, driftX: -65, driftY: -85, color: 'var(--flower-petal-dark)' },
  { id: 'petal-10', left: '32%', top: '75%', delay: '4.0s', dur: '9s', scale: 1.0, driftX: 75, driftY: -105, color: 'var(--flower-petal)' },
  { id: 'petal-11', left: '68%', top: '72%', delay: '2.8s', dur: '11s', scale: 0.9, driftX: -55, driftY: -90, color: 'var(--flower-petal-soft)' },
  { id: 'petal-12', left: '52%', top: '35%', delay: '6.0s', dur: '12.5s', scale: 0.7, driftX: 45, driftY: -75, color: 'var(--flower-petal-warm)' },
];

// ─── 4. PETALS RESTING ON GROUND (7 Ground Petals) ───
export const groundPetals: GroundPetal[] = [
  { id: 'g-petal-1', x: 22, y: 12, rotation: -28, scale: 0.75, colorTone: 'soft' },
  { id: 'g-petal-2', x: 34, y: 8, rotation: 14, scale: 0.85, colorTone: 'main' },
  { id: 'g-petal-3', x: 44, y: 5, rotation: -8, scale: 0.95, colorTone: 'warm' },
  { id: 'g-petal-4', x: 56, y: 6, rotation: 22, scale: 0.9, colorTone: 'main' },
  { id: 'g-petal-5', x: 66, y: 10, rotation: -18, scale: 0.8, colorTone: 'dark' },
  { id: 'g-petal-6', x: 78, y: 14, rotation: 35, scale: 0.7, colorTone: 'soft' },
  { id: 'g-petal-7', x: 48, y: 15, rotation: 5, scale: 0.65, colorTone: 'soft' },
];

// ─── 5. GROUND VEGETATION / GRASS (16 Grounding Blades) ───
export const groundVegetation: GroundVegetation[] = [
  { id: 'veg-1', x: 4, y: 0, height: 42, rotation: -14, type: 'grass' },
  { id: 'veg-2', x: 10, y: 0, height: 38, rotation: -8, type: 'sprout' },
  { id: 'veg-3', x: 16, y: 0, height: 48, rotation: -4, type: 'grass' },
  { id: 'veg-4', x: 24, y: 0, height: 35, rotation: 6, type: 'sprout' },
  { id: 'veg-5', x: 30, y: 0, height: 46, rotation: -10, type: 'grass' },
  { id: 'veg-6', x: 38, y: 0, height: 40, rotation: 4, type: 'grass' },
  { id: 'veg-7', x: 44, y: 0, height: 50, rotation: -5, type: 'sprout' },
  { id: 'veg-8', x: 48, y: 0, height: 54, rotation: 2, type: 'grass' },
  { id: 'veg-9', x: 52, y: 0, height: 52, rotation: -3, type: 'grass' },
  { id: 'veg-10', x: 58, y: 0, height: 45, rotation: 7, type: 'sprout' },
  { id: 'veg-11', x: 64, y: 0, height: 42, rotation: -6, type: 'grass' },
  { id: 'veg-12', x: 72, y: 0, height: 48, rotation: 8, type: 'grass' },
  { id: 'veg-13', x: 80, y: 0, height: 36, rotation: -4, type: 'sprout' },
  { id: 'veg-14', x: 86, y: 0, height: 44, rotation: 10, type: 'grass' },
  { id: 'veg-15', x: 92, y: 0, height: 39, rotation: -9, type: 'sprout' },
  { id: 'veg-16', x: 97, y: 0, height: 45, rotation: 12, type: 'grass' },
];
