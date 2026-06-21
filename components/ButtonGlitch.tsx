"use client";

import { useState, type ReactNode } from "react";

interface ButtonGlitchProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

export default function ButtonGlitch({ children, href, className = "" }: ButtonGlitchProps) {
  const [hovered, setHovered] = useState(false);

  const content = (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden inline-flex items-center justify-center glitch-text ${className}`}
    >
      {hovered && (
        <span
          className="absolute inset-0 flex items-center justify-center opacity-30 glitch-split-layer select-none pointer-events-none"
          aria-hidden
          style={{ animation: "glitch-split 0.6s ease-in-out" }}
        >
          {children}
        </span>
      )}
      <span className={`relative z-10 flex items-center gap-1 transition-all duration-75 ${hovered ? "text-emerald-300" : ""}`}>
        {children}
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} data-cursor="button">
        {content}
      </a>
    );
  }

  return <span data-cursor="button">{content}</span>;
}
