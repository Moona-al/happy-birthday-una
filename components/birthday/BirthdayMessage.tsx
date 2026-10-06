'use client';

import React, { useEffect, useRef, useState } from 'react';

interface BirthdayMessageProps {
  name: string;
  message: string;
}

export default function BirthdayMessage({ name, message }: BirthdayMessageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paragraphs = message.trim().split('\n\n');

  return (
    <section className="bd-message bd-message--letter-page" aria-label="Personal handwritten letter">
      {/* Layer 2: Ambient soft light sweeping background */}
      <div className="bd-ambient-light" aria-hidden="true" />

      {/* Layer 1: Stationery Letter Paper with subtle continuous shift (10s) */}
      <div className="bd-letter-sheet bd-letter-sheet--idle" ref={ref}>
        {/* Subtle wax seal / heart motif */}


        <div className="bd-message__inner">
          <p
            className={`bd-eyebrow bd-fade-in${inView ? ' bd-fade-in--visible' : ''}`}
            style={{ transitionDelay: '100ms' }}
          >
            For you
          </p>

          <h1
            className={`bd-message__dear bd-fade-in${inView ? ' bd-fade-in--visible' : ''}`}
            style={{ transitionDelay: '250ms' }}
          >
            Dear {name},
          </h1>

          <div
            className={`bd-message__body bd-fade-in${inView ? ' bd-fade-in--visible' : ''}`}
            style={{ transitionDelay: '400ms' }}
          >
            {paragraphs.map((para, i) => (
              <p key={i} className="bd-message__para">
                {para}
              </p>
            ))}
          </div>

          <div
            className={`bd-message__signature bd-fade-in${inView ? ' bd-fade-in--visible' : ''}`}
            style={{ transitionDelay: '650ms' }}
          >
            <span className="bd-message__sig-line bd-sig-line--breathe" />
            <span className="bd-message__sig-text">Alfian</span>
          </div>
        </div>
      </div>
    </section>
  );
}
