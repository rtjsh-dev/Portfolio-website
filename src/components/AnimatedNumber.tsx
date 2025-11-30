"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  duration?: number;
  className?: string;
  start?: boolean;
};

export default function AnimatedNumber({ value, duration = 800, className, start = true }: Props) {
  const [display, setDisplay] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef<number>(0);

  useEffect(() => {
    if (!start) {
      setDisplay(0);
      return;
    }

    fromRef.current = display;
    const startTime = performance.now();
    startRef.current = startTime;

    const animate = (now: number) => {
      const elapsed = Math.min(now - (startRef.current ?? startTime), duration);
      const progress = elapsed / duration;
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.round(fromRef.current + (value - fromRef.current) * eased);
      setDisplay(current);

      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, start]);

  return <span className={className}>{display}</span>;
}
