"use client";

import { useState } from "react";

interface ButtonMarqueeProps {
  children: string;
  href?: string;
  className?: string;
}

export default function ButtonMarquee({ children, href, className = "" }: ButtonMarqueeProps) {
  const [hovered, setHovered] = useState(false);
  const text = children;
  const repeated = `${text}  ✦  ${text}  ✦  ${text}  ✦  ${text}  ✦  ${text}`;

  const content = (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden inline-flex items-center justify-center ${className}`}
    >
      <span
        className={`block transition-all duration-300 ${
          hovered ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {text}
      </span>
      <span
        className={`absolute inset-0 flex items-center overflow-hidden transition-all duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="animate-marquee whitespace-nowrap px-4">{repeated}</span>
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
