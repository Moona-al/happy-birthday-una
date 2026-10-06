'use client';

import { useEffect, useRef, useState } from 'react';

interface BirthdayGiftProps {
  giftLabel: string;
  giftReveal: string;
}

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;

  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 1.5 + Math.random() * 1,
    color: ['#D98C9B', '#F0D7DC', '#171515', '#6F6760', '#F8F5F0'][Math.floor(Math.random() * 5)],
    size: 4 + Math.random() * 6,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="bd-confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="bd-confetti__piece"
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            '--rotation': `${p.rotation}deg`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function BirthdayGift({ giftLabel, giftReveal }: BirthdayGiftProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setConfetti(true);
    setTimeout(() => setShowContent(true), 600);
    setTimeout(() => setConfetti(false), 3000);
  };

  return (
    <section className="bd-gift bd-section" aria-label="Interactive gift">
      <div className="bd-gift__inner" ref={ref}>
        <p className={`bd-eyebrow bd-reveal${inView ? ' bd-reveal--in' : ''}`}>
          One last thing
        </p>

        <div className={`bd-gift__box-wrap bd-reveal${inView ? ' bd-reveal--in' : ''}`} style={{ transitionDelay: '150ms' }}>
          <button
            id="bd-gift-btn"
            className={`bd-gift__box${opened ? ' bd-gift__box--opened' : ''}`}
            onClick={handleOpen}
            aria-label={opened ? 'Gift has been opened' : 'Open the gift'}
            aria-pressed={opened}
          >
            {/* Lid */}
            <div className="bd-gift__lid">
              <div className="bd-gift__ribbon-h" aria-hidden="true" />
            </div>

            {/* Box body */}
            <div className="bd-gift__body">
              <div className="bd-gift__ribbon-v" aria-hidden="true" />
              <div className="bd-gift__emoji" aria-hidden="true">🎁</div>
            </div>
          </button>

          {!opened && (
            <p className="bd-gift__label">{giftLabel}</p>
          )}
        </div>

        {/* Confetti burst */}
        <Confetti active={confetti} />

        {/* Revealed content */}
        {showContent && (
          <div className="bd-gift__reveal" role="status" aria-live="polite">
            <p className="bd-gift__reveal-text">{giftReveal}</p>
          </div>
        )}
      </div>
    </section>
  );
}
