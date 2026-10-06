'use client';

import React from 'react';
import { birthdayConfig } from '@/data/birthday';
import PageTransition from '@/components/birthday/PageTransition';
import BirthdayHero from '@/components/birthday/BirthdayHero';
import ChapterNav from '@/components/birthday/ChapterNav';

export default function BirthdayPage() {
  const { name, heroEyebrow, heroTitle } = birthdayConfig;

  return (
    <PageTransition className="bd-chapter-page bd-chapter-page--birthday">
      <main className="bd-chapter-content">
        <BirthdayHero
          name={name}
          eyebrow={heroEyebrow || 'for someone special'}
          title={heroTitle || 'Happy Birthday'}
          subtitle="Today is your day."
          showReplay={true}
        />
      </main>

      <ChapterNav
        prevHref="/"
        prevLabel="← Back to intro"
        nextHref="/memories"
        nextLabel="Discover memories"
        transitionHint="Before we look ahead, let's remember a few moments."
      />
    </PageTransition>
  );
}
