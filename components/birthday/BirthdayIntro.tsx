'use client';

import { useEffect, useRef, useState } from 'react';

interface BirthdayIntroProps {
  onOpen: () => void;
  intro: string;
  buttonLabel: string;
}

export default function BirthdayIntro({ onOpen, intro, buttonLabel }: BirthdayIntroProps) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = () => {
    // Try to play music after user interaction
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    setExiting(true);
    setTimeout(onOpen, 800);
  };

  return (
    <div
      className={`bd-intro${visible ? ' bd-intro--visible' : ''}${exiting ? ' bd-intro--exiting' : ''}`}
      aria-label="Birthday surprise intro screen"
    >
      {/* Grain overlay */}
      <div className="bd-grain" aria-hidden="true" />

      {/* Floating particles */}
      <div className="bd-particles" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span key={i} className={`bd-particle bd-particle--${i + 1}`} />
        ))}
      </div>

      {/* Content */}
      <div className="bd-intro__content">
        <p className="bd-intro__eyebrow">for you</p>
        <p className="bd-intro__text">{intro}</p>
        <button
          id="bd-open-btn"
          className="bd-intro__btn"
          onClick={handleOpen}
          aria-label="Open the birthday surprise"
        >
          {buttonLabel}
        </button>
      </div>

      {/* Decorative corner lines */}
      <div className="bd-corner bd-corner--tl" aria-hidden="true" />
      <div className="bd-corner bd-corner--tr" aria-hidden="true" />
      <div className="bd-corner bd-corner--bl" aria-hidden="true" />
      <div className="bd-corner bd-corner--br" aria-hidden="true" />
    </div>
  );
}
