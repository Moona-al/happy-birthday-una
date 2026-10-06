'use client';

import React from 'react';
import { birthdayConfig } from '@/data/birthday';
import PageTransition from '@/components/birthday/PageTransition';
import BirthdayMessage from '@/components/birthday/BirthdayMessage';
import ChapterNav from '@/components/birthday/ChapterNav';

export default function MessagePage() {
  const { name, message } = birthdayConfig;

  return (
    <PageTransition className="bd-chapter-page bd-chapter-page--message">
      <main className="bd-chapter-content">
        <BirthdayMessage
          name={name}
          message={message}
        />
      </main>

      <ChapterNav
        prevHref="/memories"
        prevLabel="← Back to memories"
        nextHref="/gift"
        nextLabel="The little light"
        transitionHint="When the room goes quiet..."
      />
    </PageTransition>
  );
}
