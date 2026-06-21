"use client";

import { useRef, useEffect, useState, type CSSProperties } from "react";

interface SpotlightEffectProps {
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
  className?: string;
 跟随鼠标?: boolean;
  children?: React.ReactNode;
}

export default function SpotlightEffect({
  size = 400,
  color = "rgba(5, 150, 105, 0.15)",
  blur = 100,
  className = "",
  children,
}: SpotlightEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);

    el.addEventListener("mousemove", onMouse);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMouse);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [visible]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          background: `radial-gradient(circle ${size}px at ${pos.x}% ${pos.y}%, ${color}, transparent)`,
          filter: `blur(${blur}px)`,
        } as CSSProperties}
      />
      {children}
    </div>
  );
}
