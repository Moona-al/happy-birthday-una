// ============================================================
// BIRTHDAY CONFIGURATION
// Edit this file to personalize the birthday experience.
// All personal data lives here — no need to touch components.
// ============================================================

export const birthdayConfig = {
  // ─── Identity ────────────────────────────────────────────
  name: "Lunaa",
  birthday: "2026-10-07", // Format: YYYY-MM-DD

  // ─── Color Palette ───────────────────────────────────────
  // Change these to customize the entire color system
  colors: {
    background: "#F8F5F0",
    primary: "#171515",
    secondary: "#6F6760",
    accent: "#D98C9B",
    softAccent: "#F0D7DC",
    white: "#FFFFFF",
  },

  // ─── Intro Section ───────────────────────────────────────
  intro: "I made something for you.",
  introButton: "Open this →",

  // ─── Background Music ────────────────────────────────────
  musicTrack: "/music/ten2five_-_Hanya_Untuk-Mu_(mp3.pm).mp3",

  // ─── Hero Section ────────────────────────────────────────
  heroEyebrow: "for my priority.",
  heroTitle: "Happy Birthday",
  heroSubtitle: "another chapter begins.",

  // ─── Memories: A Wall of Little Moments ─────────────────
  memoriesTransition: "Before we look ahead...\nlet's remember a few moments.",
  memoriesHeading: "A collection\nof little moments.",
  memoriesSubtitle: "",
  memoriesTitle: "A few moments\nworth remembering.",
  memories: [
    {
      image: "/photos/WhatsApp Image 2026-10-06 at 19.09.53.jpeg",
      caption: "",
      date: "",
      rotation: -4,
      offsetY: 15,
      stringOffset: 16,
      floatDuration: 8.5,
      floatDelay: 0.2,
      title: "",
      description: "",
    },
    {
      image: "/photos/WhatsApp Image 2026-10-06 at 19.11.59.jpeg",
      caption: "",
      date: "",
      rotation: 3,
      offsetY: 42,
      stringOffset: 48,
      floatDuration: 9.8,
      floatDelay: 1.4,
      title: "",
      description: "",
    },
    {
      image: "/photos/WhatsApp Image 2026-10-06 at 19.12.55.jpeg",
      caption: "",
      date: "",
      rotation: -2.5,
      offsetY: 22,
      stringOffset: 80,
      floatDuration: 7.6,
      floatDelay: 0.8,
      title: "",
      description: "",
    },
    {
      image: "/photos/WhatsApp Image 2026-10-06 at 19.12.55 (1).jpeg",
      caption: "",
      date: "",
      rotation: 3.5,
      offsetY: 36,
      stringOffset: 28,
      floatDuration: 10.2,
      floatDelay: 1.9,
      title: "",
      description: "",
    },
  ],

  // ─── Personal Message ────────────────────────────────────
  message: `Another year has found its way to you,
and somehow, you’re still
one of the people I’m most grateful
to have met along the way.

I hope this year feels a little kinder.
I hope you find more moments
that make you genuinely happy,
more memories that stay,
and little things that make
ordinary days feel special.

And wherever this year takes you,
I hope you always find a reason
to keep moving forward.`,

  // ─── Gift Section ────────────────────────────────────────
  giftLabel: "Open the gift",
  giftReveal:
    "There's one more thing I wanted to say — from somewhere a little more honest.",

  // ─── Final Section ────────────────────────────────────────
  finalMessage: `I hope this year
is kind to you.

Keep smiling.
Keep growing.
Keep being you.`,
} as const;

export interface Memory {
  image: string;
  caption: string;
  date?: string;
  rotation: number;
  offsetY?: number;
  stringOffset?: number;
  floatDuration?: number;
  floatDelay?: number;
  title?: string;
  description?: string;
}

export type BirthdayConfig = typeof birthdayConfig;
export const birthdayData = birthdayConfig;
