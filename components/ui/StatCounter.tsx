"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function StatCounter({ end, suffix = "", label, duration = 2000 }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const raf = () => {
            const now = performance.now();
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(raf);
          };
          requestAnimationFrame(raf);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-1">
        {count}{suffix}
      </div>
      <p className="text-xs sm:text-sm text-zinc-500 font-medium tracking-wide uppercase">
        {label}
      </p>
    </div>
  );
}
