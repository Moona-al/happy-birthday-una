'use client';

import React from 'react';
import Link from 'next/link';

interface ChapterNavProps {
  prevHref?: string;
  prevLabel?: string;
  nextHref: string;
  nextLabel?: string;
  transitionHint?: string;
}

export default function ChapterNav({
  prevHref,
  prevLabel = '← Back',
  nextHref,
  nextLabel = 'Continue →',
  transitionHint,
}: ChapterNavProps) {
  return (
    <nav className="bd-chapter-nav" aria-label="Chapter navigation">
      {transitionHint && (
        <p className="bd-chapter-nav__hint">{transitionHint}</p>
      )}

      <div className="bd-chapter-nav__actions">
        {prevHref ? (
          <Link href={prevHref} className="bd-nav-btn bd-nav-btn--back">
            <span>{prevLabel}</span>
          </Link>
        ) : (
          <div className="bd-nav-btn--spacer" aria-hidden="true" />
        )}

        <Link href={nextHref} className="bd-nav-btn bd-nav-btn--next">
          <span>{nextLabel}</span>
          <span className="bd-nav-btn__arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </nav>
  );
}
