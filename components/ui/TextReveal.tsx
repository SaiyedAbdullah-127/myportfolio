"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  type?: "chars" | "words" | "lines";
  once?: boolean;
}

export default function TextReveal({
  children,
  as: Tag = "p",
  className = "",
  delay = 0,
  duration = 0.5,
  stagger = 0.04,
  type = "chars",
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (once && revealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, revealed]);

  const parts = type === "words" ? children.split(" ") : type === "chars" ? children.split("") : [children];

  return (
    <div ref={ref} className={`inline overflow-hidden ${className}`}>
      <Tag className="inline">
        {parts.map((part, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              transform: revealed ? "translateY(0)" : "translateY(100%)",
              opacity: revealed ? 1 : 0,
              transition: `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}s, opacity ${duration}s ease ${delay + i * stagger}s`,
            }}
          >
            {type === "words" ? `${part}\u00A0` : part}
          </span>
        ))}
      </Tag>
    </div>
  );
}
