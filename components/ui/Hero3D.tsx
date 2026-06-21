"use client";

import { useRef, useState, type ReactNode, useEffect } from "react";

interface Hero3DProps {
  children: ReactNode;
  className?: string;
  rotationIntensity?: number;
  perspective?: number;
  shine?: boolean;
}

export default function Hero3D({
  children,
  className = "",
  rotationIntensity = 10,
  perspective = 800,
  shine = true,
}: Hero3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);

  const onMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    setRotate({
      x: (y - 0.5) * -rotationIntensity,
      y: (x - 0.5) * rotationIntensity,
    });
  };

  const onLeave = () => {
    setRotate({ x: 0, y: 0 });
    setMousePos({ x: 0.5, y: 0.5 });
    setHovered(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="relative transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        {shine && hovered && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.08), transparent 60%)`,
              transform: "translateZ(20px)",
            }}
          />
        )}
      </div>
    </div>
  );
}
