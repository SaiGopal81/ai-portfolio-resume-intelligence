'use client';

import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export const AnimatedCounter = ({ end, suffix = '', duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          
          // Easing out function
          const easeOutQuart = 1 - Math.pow(1 - progress / duration, 4);
          const current = Math.min(Math.floor(easeOutQuart * end), end);
          
          setCount(current);
          if (progress < duration) {
            animationFrameId = window.requestAnimationFrame(step);
          } else {
            setCount(end);
          }
        };
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};
