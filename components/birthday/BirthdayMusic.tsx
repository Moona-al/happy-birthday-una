'use client';

import { useEffect, useRef } from 'react';
import { birthdayConfig } from '@/data/birthday';

export default function BirthdayMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicTrack = birthdayConfig.musicTrack || '/music/ten2five_-_Hanya_Untuk-Mu_(mp3.pm).mp3';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;

    // 1. Attempt immediate autoplay on page load
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser autoplay policy requires user interaction first
      });
    }

    // 2. Play on first interaction anywhere on page (click, touch, pointer, scroll, keydown)
    const handleFirstGesture = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
      cleanup();
    };

    const gestureEvents = ['click', 'touchstart', 'pointerdown', 'mousedown', 'keydown', 'scroll', 'wheel'];
    const cleanup = () => {
      gestureEvents.forEach((ev) => {
        window.removeEventListener(ev, handleFirstGesture);
      });
    };

    gestureEvents.forEach((ev) => {
      window.addEventListener(ev, handleFirstGesture, { once: true, passive: true });
    });

    // 3. Expose global trigger hook for explicit triggers
    (window as Window & { __bdPlayMusic?: () => void }).__bdPlayMusic = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    };

    return () => {
      cleanup();
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={musicTrack}
      loop
      autoPlay
      preload="auto"
      playsInline
      style={{ display: 'none' }}
      aria-hidden="true"
      onEnded={() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      }}
    />
  );
}
