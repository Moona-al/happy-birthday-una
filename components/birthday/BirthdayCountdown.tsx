'use client';

import { useEffect, useState } from 'react';

interface BirthdayCountdownProps {
  birthday: string; // "YYYY-MM-DD"
  name: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type CountdownState = 'future' | 'today' | 'past';

function getState(birthday: string): CountdownState {
  const now = new Date();
  const target = new Date(birthday);

  const nowDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const targetDateStr = birthday;

  if (nowDateStr === targetDateStr) return 'today';

  const nowMs = now.getTime();
  const targetMs = target.getTime();

  // Check next occurrence of birthday month/day
  const thisYear = new Date(now.getFullYear(), target.getMonth(), target.getDate());
  const nextYear = new Date(now.getFullYear() + 1, target.getMonth(), target.getDate());
  const upcoming = thisYear.getTime() > nowMs ? thisYear : nextYear;

  if (upcoming.getTime() > nowMs) return 'future';
  return 'past';
}

function getTimeLeft(birthday: string): TimeLeft {
  const now = new Date();
  const target = new Date(birthday);

  // Find next occurrence
  const thisYear = new Date(now.getFullYear(), target.getMonth(), target.getDate());
  const nextYear = new Date(now.getFullYear() + 1, target.getMonth(), target.getDate());
  const upcoming = thisYear.getTime() > now.getTime() ? thisYear : nextYear;

  const diff = upcoming.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export default function BirthdayCountdown({ birthday, name }: BirthdayCountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [state, setState] = useState<CountdownState>('future');

  useEffect(() => {
    setMounted(true);
    setState(getState(birthday));
    setTimeLeft(getTimeLeft(birthday));

    const interval = setInterval(() => {
      setState(getState(birthday));
      setTimeLeft(getTimeLeft(birthday));
    }, 1000);

    return () => clearInterval(interval);
  }, [birthday]);

  return (
    <section className="bd-countdown bd-section" aria-label="Birthday countdown">
      <div className="bd-countdown__inner">
        <p className="bd-eyebrow">The day</p>

        {!mounted ? (
          // SSR placeholder — prevents hydration mismatch
          <div className="bd-countdown__loading" aria-hidden="true">
            <span>Loading...</span>
          </div>
        ) : state === 'today' ? (
          <div className="bd-countdown__today" role="status" aria-live="polite">
            <p className="bd-countdown__today-text">Today is your day.</p>
            <p className="bd-countdown__today-name">{name}</p>
          </div>
        ) : state === 'past' ? (
          <div className="bd-countdown__today" role="status">
            <p className="bd-countdown__today-text">Happy belated birthday.</p>
            <p className="bd-countdown__today-name">{name} ♥</p>
          </div>
        ) : (
          <div className="bd-countdown__grid" role="timer" aria-label="Time until birthday">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' },
            ].map(({ value, label }) => (
              <div key={label} className="bd-countdown__unit">
                <span className="bd-countdown__number">{pad(value)}</span>
                <span className="bd-countdown__label">{label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="bd-countdown__date">
          <span>{birthday.split('-').reverse().join('.')}</span>
        </div>
      </div>
    </section>
  );
}
