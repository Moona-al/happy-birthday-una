'use client';

import { useState } from 'react';
import { birthdayConfig } from '@/data/birthday';
import BirthdayIntro from './BirthdayIntro';
import BirthdayHero from './BirthdayHero';
import BirthdayCountdown from './BirthdayCountdown';
import BirthdayMemories from './BirthdayMemories';
import BirthdayMessage from './BirthdayMessage';
import BirthdayGift from './BirthdayGift';
import BirthdayFinal from './BirthdayFinal';
import ScrollProgress from './ScrollProgress';

export default function BirthdayExperience() {
  const [opened, setOpened] = useState(false);

  const { name, birthday, intro, introButton, heroEyebrow, heroTitle, heroSubtitle,
    memoriesTitle, memories, message, giftLabel, giftReveal, finalMessage } = birthdayConfig;

  const handleOpen = () => {
    setOpened(true);
    // Try playing music via global hook if audio was set up
    if (typeof window !== 'undefined') {
      const w = window as Window & { __bdPlayMusic?: () => void };
      if (w.__bdPlayMusic) w.__bdPlayMusic();
    }
  };

  return (
    <>
      {/* CSS custom properties from config */}
      <style>{`
        :root {
          --bd-bg: ${birthdayConfig.colors.background};
          --bd-primary: ${birthdayConfig.colors.primary};
          --bd-secondary: ${birthdayConfig.colors.secondary};
          --bd-accent: ${birthdayConfig.colors.accent};
          --bd-soft-accent: ${birthdayConfig.colors.softAccent};
          --bd-white: ${birthdayConfig.colors.white};
        }
      `}</style>

      {/* Intro overlay */}
      {!opened && (
        <BirthdayIntro
          onOpen={handleOpen}
          intro={intro}
          buttonLabel={introButton}
        />
      )}

      {/* Main experience — rendered but hidden until opened */}
      <div
        className={`bd-main${opened ? ' bd-main--visible' : ''}`}
        aria-hidden={!opened}
      >
        <ScrollProgress />

        <BirthdayHero
          name={name}
          eyebrow={heroEyebrow}
          title={heroTitle}
          subtitle={heroSubtitle}
        />

        <BirthdayCountdown birthday={birthday} name={name} />

        <BirthdayMemories
          memories={[...memories]}
          heading={birthdayConfig.memoriesHeading}
          subtitle={birthdayConfig.memoriesSubtitle}
          transitionText={birthdayConfig.memoriesTransition}
        />

        <BirthdayMessage name={name} message={message} />

        <BirthdayGift giftLabel={giftLabel} giftReveal={giftReveal} />

        <BirthdayFinal name={name} finalMessage={finalMessage} />

        <footer className="bd-footer" aria-label="Site footer">
          <p className="bd-footer__text">Made with ♥ for {name}</p>
        </footer>
      </div>
    </>
  );
}
