"use client";

import { useEffect, useRef } from "react";

interface SkillBarProps {
  label: string;
  level: number;
  delay?: number;
}

export default function SkillBar({ label, level, delay = 0 }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const filled = useRef(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !filled.current) {
          filled.current = true;
          setTimeout(() => {
            el.style.width = `${level}%`;
          }, delay);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs sm:text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300">
          {label}
        </span>
        <span className="text-[10px] sm:text-xs font-mono text-zinc-600">
          {level}%
        </span>
      </div>
      <div className="h-1.5 sm:h-2 rounded-full bg-zinc-800/50 overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-violet-500 transition-all duration-1000 ease-out"
          style={{ width: 0, transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}
