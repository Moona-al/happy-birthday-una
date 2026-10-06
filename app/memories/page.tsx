'use client';

import React from 'react';
import { birthdayConfig } from '@/data/birthday';
import PageTransition from '@/components/birthday/PageTransition';
import BirthdayMemories from '@/components/birthday/BirthdayMemories';
import ChapterNav from '@/components/birthday/ChapterNav';

export default function MemoriesPage() {
  const { memories, memoriesHeading, memoriesSubtitle, memoriesTransition } = birthdayConfig;

  return (
    <PageTransition className="bd-chapter-page bd-chapter-page--memories">
      <main className="bd-chapter-content">
        <BirthdayMemories
          memories={[...memories]}
          heading={memoriesHeading || 'A collection\nof little moments.'}
          subtitle={memoriesSubtitle || ''}
          transitionText={memoriesTransition || "Before we look ahead,\nlet's remember a few moments."}
        />
      </main>

      <ChapterNav
        prevHref="/birthday"
        prevLabel="← Back to celebration"
        nextHref="/message"
        nextLabel="A message for you"
        transitionHint="Some things are easier to write than to say."
      />
    </PageTransition>
  );
}
