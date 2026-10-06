'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface BirthdayFinalProps {
  name: string;
  finalMessage?: string;
}

export default function BirthdayFinal({ name, finalMessage }: BirthdayFinalProps) {
  // Step 1: "And one last thing..."
  // Step 2: "I hope this year brings you beautiful things."
  // Step 3: "Happy Birthday, [NAME]."
  // Step 4: Final message note + replay link
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2400);
    const t3 = setTimeout(() => setPhase(3), 4400);
    const t4 = setTimeout(() => setPhase(4), 6200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <section className="bd-final-cinematic" aria-label="Final birthday surprise">
      {/* Cinematic dark/warm mood shift backdrop */}
      <div className="bd-final-cinematic__bg" aria-hidden="true" />

      {/* Floating Petal Ambience */}
      <div className="bd-final-petals" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className={`bd-final-petal bd-final-petal--${(i % 5) + 1}`}
            style={{
              left: `${8 + i * 9}%`,
              animationDelay: `${i * 0.9}s`,
            }}
          />
        ))}
      </div>

      <div className="bd-final-cinematic__inner">
        {/* Step 1: And one last thing... */}
        <p
          className={`bd-final-intro-line${
            phase >= 1 ? ' bd-final-intro-line--visible' : ''
          }`}
        >
          And one last thing...
        </p>

        {/* Step 2: I hope this year brings you beautiful things. */}
        <p
          className={`bd-final-wish-line${
            phase >= 2 ? ' bd-final-wish-line--visible' : ''
          }`}
        >
          I hope this year brings you beautiful things.
        </p>

        {/* Step 3: Happy Birthday, [NAME] */}
        <div
          className={`bd-final-reveal-group${
            phase >= 3 ? ' bd-final-reveal-group--visible' : ''
          }`}
        >
          <span className="bd-final-sparkle" aria-hidden="true">✦</span>
          <h1 className="bd-final-title">
            <span className="bd-final-title__top">HAPPY BIRTHDAY,</span>
            <span className="bd-final-title__name">{name}</span>
          </h1>
          <span className="bd-final-sparkle" aria-hidden="true">✦</span>
        </div>

        {/* Step 4: Final message note & replay from beginning */}
        <div
          className={`bd-final-closing${
            phase >= 4 ? ' bd-final-closing--visible' : ''
          }`}
        >
          {finalMessage && (
            <p className="bd-final-message-note">
              {finalMessage}
            </p>
          )}

          <div className="bd-final-actions">
            <Link href="/" className="bd-nav-btn bd-nav-btn--replay">
              <span>↻ Read again from the beginning</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
