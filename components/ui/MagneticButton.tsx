"use client";

import { useRef, useState, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
  as?: "button" | "a";
  href?: string;
  [key: string]: any;
}

export default function MagneticButton({
  children,
  strength = 0.3,
  radius = 200,
  className = "",
  as = "button",
  href,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
      setPos({ x: dx * strength, y: dy * strength });
    }
  };

  const onLeave = () => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  };

  const Tag = as;

  return (
    <div
      ref={ref}
      onMouseMove={onMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="inline-block"
    >
      <Tag
        href={as === "a" ? href : undefined}
        className={`inline-block transition-transform duration-150 ease-out ${className}`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${hovered ? 1.05 : 1})`,
        }}
        {...props}
      >
        {children}
      </Tag>
    </div>
  );
}
