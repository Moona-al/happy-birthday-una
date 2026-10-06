'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { birthdayConfig } from '@/data/birthday';

type BookPhase = 'ambient' | 'appear' | 'opening' | 'open' | 'turning';

export default function ChapterOneBook() {
  const router = useRouter();

  // Animation phase states
  const [phase, setPhase] = useState<BookPhase>('ambient');
  const [textStep, setTextStep] = useState(0);
  const [isHoveringTurn, setIsHoveringTurn] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const bookRef = useRef<HTMLDivElement | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const addTimeout = useCallback((cb: () => void, ms: number) => {
    const id = setTimeout(cb, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      setIsReducedMotion(true);
      setPhase('open');
      setTextStep(5);
      return;
    }

    // SEQUENCE TIMING (Calm, cinematic, elegant storybook opening):
    // STEP 01: Ambient background & dust particles settle (0 - 600ms)
    // STEP 02: Closed book gently appears and rests on table (600ms)
    addTimeout(() => {
      setPhase('appear');
    }, 600);

    // STEP 03: Cover begins slowly, gracefully peeling open (2200ms)
    addTimeout(() => {
      setPhase('opening');
    }, 2200);

    // STEP 04: Book settles completely flat and open (4800ms)
    addTimeout(() => {
      setPhase('open');
    }, 4800);

    // STEP 05 & 06: Editorial Text & Motif Reveal Sequence (Paced, meditative fade-ins)
    addTimeout(() => setTextStep(1), 5200); // "CHAPTER"
    addTimeout(() => setTextStep(2), 5800); // "01" numeral
    addTimeout(() => setTextStep(3), 6500); // Divider & Botanical motif
    addTimeout(() => setTextStep(4), 7300); // "THE BEGINNING"
    addTimeout(() => setTextStep(5), 8200); // Story description & "Turn the page"
  }, [addTimeout]);

  // Subtle mouse parallax tilt when open
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || phase !== 'open') return;
    if (!bookRef.current) return;

    const rect = bookRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Clamped subtle tilt: max 2.5deg
    const tiltY = Math.max(-2.5, Math.min(2.5, deltaX * 2.5));
    const tiltX = Math.max(-2.0, Math.min(2.0, -deltaY * 2.0));

    setMouseTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setIsHoveringTurn(false);
  };

  // Turn page to Chapter 2
  const handleTurnPage = () => {
    if (typeof window !== 'undefined') {
      const w = window as Window & { __bdPlayMusic?: () => void };
      if (w.__bdPlayMusic) w.__bdPlayMusic();
    }

    if (phase === 'turning') return;

    if (isReducedMotion) {
      router.push('/birthday');
      return;
    }

    setPhase('turning');

    // Page turn flip sequence:
    // The right page sweeps over to the left (900ms).
    // As it passes the 90deg vertical wipe mark (~550ms), push router.
    addTimeout(() => {
      router.push('/birthday');
    }, 700);
  };

  const isOpen = phase === 'open' || phase === 'opening' || phase === 'turning';
  const isTurning = phase === 'turning';

  return (
    <div
      className={`bd-storybook-stage ${phase !== 'ambient' ? 'bd-storybook-stage--ready' : ''} ${
        isTurning ? 'bd-storybook-stage--turning' : ''
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Chapter 01: Storybook opening"
    >
      {/* Cinematic zoom bloom transition into Chapter 2 */}
      {isTurning && <div className="bd-book-zoom-bloom" aria-hidden="true" />}

      {/* Background grain texture */}
      <div className="bd-grain" aria-hidden="true" />

      {/* STEP 01: Ambient backlight glow behind the book */}
      <div className="bd-book-ambient-glow" aria-hidden="true" />

      {/* Floating dust particles (3-5 tiny specks floating gently) */}
      <div className="bd-book-dust-layer" aria-hidden="true">
        <span className="bd-book-dust bd-book-dust--1" />
        <span className="bd-book-dust bd-book-dust--2" />
        <span className="bd-book-dust bd-book-dust--3" />
        <span className="bd-book-dust bd-book-dust--4" />
      </div>

      {/* 3D Perspective Book Container with Parallax Tilt & Zoom Transition */}
      <div
        ref={bookRef}
        className={`bd-book-parallax-wrapper ${
          phase === 'open' ? 'bd-book-parallax-wrapper--idle-breathe' : ''
        } ${isTurning ? 'bd-book-parallax-wrapper--zooming' : ''}`}
        style={{
          transform:
            phase === 'open' && !isReducedMotion
              ? `rotateX(${mouseTilt.x}deg) rotateY(${mouseTilt.y}deg)`
              : undefined,
        }}
      >
        {/* Soft realistic drop shadow underneath the book */}
        <div
          className={`bd-book-ambient-shadow ${
            isOpen ? 'bd-book-ambient-shadow--open' : ''
          }`}
          aria-hidden="true"
        />

        {/* The Storybook Object */}
        <div
          className={`bd-storybook ${
            phase === 'appear' ? 'bd-storybook--appear' : ''
          } ${isOpen ? 'bd-storybook--open' : ''} ${
            isTurning ? 'bd-storybook--turning' : ''
          }`}
        >
          {/* ========================================================
              LEFT WING (LEFT PAGE OF SPREAD)
             ======================================================== */}
          <div className="bd-book-wing bd-book-wing--left">
            {/* Paper thickness stack edges */}
            <div className="bd-book-edge-stack bd-book-edge-stack--left" aria-hidden="true" />
            
            {/* Hardcover base */}
            <div className="bd-book-cover-base bd-book-cover-base--left" aria-hidden="true" />

            {/* Left Page sheet */}
            <div className="bd-book-page bd-book-page--left">
              <div className="bd-book-page-paper">
                <div className="bd-book-paper-texture" aria-hidden="true" />

                {/* Left Page Content */}
                <div className="bd-book-content bd-book-content--left">
                  {/* Step 1: CHAPTER label */}
                  <p
                    className={`bd-book-chapter-tag bd-book-reveal ${
                      textStep >= 1 ? 'bd-book-reveal--visible' : ''
                    }`}
                  >
                    CHAPTER
                  </p>

                  {/* Step 2: 01 Large Numeral */}
                  <div
                    className={`bd-book-numeral bd-book-reveal ${
                      textStep >= 2 ? 'bd-book-reveal--visible' : ''
                    }`}
                  >
                    <span>01</span>
                  </div>

                  {/* Step 3: Minimal Decorative Line */}
                  <div
                    className={`bd-book-divider-wrap bd-book-reveal ${
                      textStep >= 3 ? 'bd-book-reveal--visible' : ''
                    }`}
                  >
                    <div className="bd-book-divider-line" />
                  </div>

                  {/* Step 3: Tiny hand-drawn botanical motif with gentle 1-2° breathing */}
                  <div
                    className={`bd-book-botanical-wrap bd-book-reveal ${
                      textStep >= 3 ? 'bd-book-reveal--visible' : ''
                    }`}
                  >
                    <svg
                      width="28"
                      height="46"
                      viewBox="0 0 28 46"
                      fill="none"
                      className="bd-book-leaf-svg"
                      aria-hidden="true"
                    >
                      {/* Organic stem */}
                      <path
                        d="M14 44V8"
                        stroke="currentColor"
                        strokeWidth="0.85"
                        strokeLinecap="round"
                      />
                      {/* Left delicate petal/leaf */}
                      <path
                        d="M14 26C14 26 7 22 7 15C7 10 14 11 14 11"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                      />
                      {/* Right delicate leaf */}
                      <path
                        d="M14 18C14 18 21 14 21 8C21 4 14 5 14 5"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                      />
                      {/* Tiny bud tip */}
                      <circle cx="14" cy="4" r="1.2" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Page number */}
                  <div className="bd-book-page-footer bd-book-page-footer--left">
                    <span className="bd-book-folio">p. 01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              CENTER GUTTER / SPINE
             ======================================================== */}
          <div className="bd-book-spine" aria-hidden="true">
            {/* Inner crease depth shadow */}
            <div className="bd-book-spine-shadow" />
            
            {/* Step 4: Soft warm sunlight glow radiating from center */}
            <div
              className={`bd-book-center-glow ${
                isOpen ? 'bd-book-center-glow--active' : ''
              }`}
            />

            {/* Subtle silk bookmark ribbon */}
            <div className="bd-book-ribbon" />
          </div>

          {/* ========================================================
              RIGHT WING (RIGHT PAGE OF SPREAD)
             ======================================================== */}
          <div className="bd-book-wing bd-book-wing--right">
            {/* Paper thickness stack edges */}
            <div className="bd-book-edge-stack bd-book-edge-stack--right" aria-hidden="true" />

            {/* Hardcover base */}
            <div className="bd-book-cover-base bd-book-cover-base--right" aria-hidden="true" />

            {/* Right Page sheet */}
            <div
              className={`bd-book-page bd-book-page--right ${
                isHoveringTurn ? 'bd-book-page--lifted' : ''
              }`}
            >
              <div className="bd-book-page-paper">
                <div className="bd-book-paper-texture" aria-hidden="true" />

                {/* Right Page Content */}
                <div className="bd-book-content bd-book-content--right">
                  {/* Mobile-only header (Chapter 01 at top of portrait layout) */}
                  <div
                    className={`bd-book-mobile-header bd-book-reveal ${
                      textStep >= 2 ? 'bd-book-reveal--visible' : ''
                    }`}
                  >
                    <p className="bd-book-chapter-tag">CHAPTER</p>
                    <div className="bd-book-numeral bd-book-numeral--mobile">
                      <span>01</span>
                    </div>
                    <div className="bd-book-divider-wrap">
                      <div className="bd-book-divider-line" />
                    </div>
                  </div>

                  {/* Step 4: Title "THE BEGINNING" */}
                  <h2
                    className={`bd-book-story-title bd-book-reveal ${
                      textStep >= 4 ? 'bd-book-reveal--visible' : ''
                    }`}
                  >
                    THE BEGINNING
                  </h2>

                  {/* Step 5: Description text */}
                  <div
                    className={`bd-book-story-body bd-book-reveal ${
                      textStep >= 5 ? 'bd-book-reveal--visible' : ''
                    }`}
                  >
                    <p className="bd-book-stanza-main">
                      Every story starts<br />
                      with a little moment.
                    </p>
                    <p className="bd-book-stanza-sub">
                      {birthdayConfig.intro || 'I made something just for you.'}
                    </p>
                  </div>

                  {/* Subtle page curl cue on bottom-right corner */}
                  <div
                    className={`bd-book-curl-hint ${
                      isHoveringTurn ? 'bd-book-curl-hint--hover' : ''
                    }`}
                    aria-hidden="true"
                  />

                  {/* Page Footer with "Turn the page →" button */}
                  <div className="bd-book-page-footer bd-book-page-footer--right">
                    <span className="bd-book-folio">p. 02</span>

                    <button
                      type="button"
                      className={`bd-book-turn-btn bd-book-reveal ${
                        textStep >= 5 ? 'bd-book-reveal--visible' : ''
                      } ${isTurning ? 'bd-book-turn-btn--fading' : ''}`}
                      onClick={handleTurnPage}
                      onMouseEnter={() => setIsHoveringTurn(true)}
                      onMouseLeave={() => setIsHoveringTurn(false)}
                      aria-label="Turn the page to Chapter 2"
                    >
                      <span className="bd-book-turn-text">Turn the page</span>
                      <span className="bd-book-turn-arrow" aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              FRONT HARDCOVER (FLIPPING ELEMENT)
              Closed state: sits over the right page facing user.
              Opening: rotates -180deg around spine to rest on the left.
             ======================================================== */}
          <div
            className={`bd-book-cover-flipper ${
              isOpen ? 'bd-book-cover-flipper--open' : ''
            }`}
          >
            {/* FRONT FACE: Outside Hardcover visible when closed */}
            <div className="bd-book-cover-front">
              <div className="bd-book-cover-cloth-texture" aria-hidden="true" />
              
              {/* Embossed elegant frame border */}
              <div className="bd-book-cover-frame">
                <div className="bd-book-cover-inner-border">
                  <div className="bd-book-cover-eyebrow">A BIRTHDAY STORY</div>
                  <h1 className="bd-book-cover-title">
                    A LITTLE<br />STORY
                  </h1>
                  <div className="bd-book-cover-sub">
                    FOR {birthdayConfig.name.toUpperCase()}
                  </div>
                  
                  {/* Minimal gold foil star/cross emblem */}
                  <div className="bd-book-cover-emblem">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2V6M12 18V22M2 12H6M18 12H22" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Spine crease shadow on left edge of closed cover */}
              <div className="bd-book-cover-spine-edge" aria-hidden="true" />
            </div>

            {/* BACK FACE: Inside lining of cover revealed when opened */}
            <div className="bd-book-cover-inside" aria-hidden="true">
              <div className="bd-book-cover-inside-paper" />
            </div>
          </div>

          {/* ========================================================
              PAGE TURN LEAF (FLIPPING TO CHAPTER 2)
              Sweeps right -> left when "Turn the page" is clicked.
             ======================================================== */}
          {isTurning && (
            <div className="bd-book-turning-leaf" aria-hidden="true">
              <div className="bd-book-turning-leaf-front">
                <div className="bd-book-turning-leaf-paper" />
                <div className="bd-book-turning-shadow-sweep" />
              </div>
              <div className="bd-book-turning-leaf-back">
                <div className="bd-book-turning-leaf-paper" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
