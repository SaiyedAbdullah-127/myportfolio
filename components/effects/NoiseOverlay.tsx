"use client";

import { useMemo, type CSSProperties } from "react";

interface NoiseOverlayProps {
  opacity?: number;
  pattern?: "dots" | "grid" | "lines" | "crosshatch";
  size?: number;
  color?: string;
  className?: string;
}

export default function NoiseOverlay({
  opacity = 0.03,
  pattern = "dots",
  size = 32,
  color = "#ffffff",
  className = "",
}: NoiseOverlayProps) {
  const bg = useMemo(() => {
    switch (pattern) {
      case "dots":
        return `radial-gradient(${color} 1px, transparent 1px)`;
      case "grid":
        return `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`;
      case "lines":
        return `repeating-linear-gradient(0deg, ${color} 1px, transparent 1px, transparent ${size}px)`;
      case "crosshatch":
        return `repeating-linear-gradient(45deg, ${color} 1px, transparent 1px, transparent ${size}px), repeating-linear-gradient(-45deg, ${color} 1px, transparent 1px, transparent ${size}px)`;
    }
  }, [pattern, color, size]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={
        {
          backgroundImage: bg,
          backgroundSize: pattern === "dots" ? `${size}px ${size}px` : `${size * 2}px ${size * 2}px`,
          opacity,
        } as CSSProperties
      }
    />
  );
}
