'use client';

import React from 'react';
import { birthdayConfig } from '@/data/birthday';
import PageTransition from '@/components/birthday/PageTransition';
import BirthdayFinal from '@/components/birthday/BirthdayFinal';

export default function FinalPage() {
  const { name, finalMessage } = birthdayConfig;

  return (
    <PageTransition className="bd-chapter-page bd-chapter-page--final">
      <main className="bd-chapter-content bd-final-page-content">
        <BirthdayFinal
          name={name}
          finalMessage={finalMessage}
        />
      </main>
    </PageTransition>
  );
}
