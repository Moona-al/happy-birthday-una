'use client';

import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger smooth fade in right after mount
    const timer = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div
      className={`bd-page-transition${mounted ? ' bd-page-transition--active' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
