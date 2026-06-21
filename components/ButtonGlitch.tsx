"use client";

import { useState } from "react";

interface ButtonGlitchProps {
  children: string;
  href?: string;
  className?: string;
}

export default function ButtonGlitch({ children, href, className = "" }: ButtonGlitchProps) {
  const [hovered, setHovered] = useState(false);
  const chars = children.split("");

  const content = (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden inline-flex items-center justify-center glitch-text ${className}`}
    >
      {hovered && (
        <span
          className="absolute inset-0 flex items-center justify-center opacity-40 glitch-split-layer select-none pointer-events-none"
          aria-hidden
        >
          {chars.map((char, i) => (
            <span
              key={i}
              className="inline-block text-emerald-300/40"
              style={{
                animation: `glitch-skew 0.4s ease-in-out ${i * 0.03}s`,
                transform: `translate(${Math.sin(i) * 2}px, ${Math.cos(i) * 2}px)`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      )}
      <span className="relative z-10 flex">
        {chars.map((char, i) => (
          <span
            key={i}
            className={`glitch-char inline-block transition-all duration-75 ${
              hovered ? "text-emerald-300" : ""
            }`}
            style={{
              animation: hovered
                ? `glitch-skew 0.4s ease-in-out ${i * 0.03}s`
                : "none",
              transform: hovered
                ? `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 4}px)`
                : "none",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
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
