"use client";

import { type ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
  cols?: number;
  gap?: number;
}

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}

export function BentoGrid({
  children,
  className = "",
  cols = 3,
  gap = 4,
}: BentoGridProps) {
  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: `${gap * 0.25}rem`,
      }}
    >
      {children}
    </div>
  );
}

export function BentoItem({
  children,
  className = "",
  colSpan = 1,
  rowSpan = 1,
}: BentoItemProps) {
  return (
    <div
      className={`glass glass-edge rounded-2xl border border-zinc-800/50 overflow-hidden ${className}`}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      {children}
    </div>
  );
}
