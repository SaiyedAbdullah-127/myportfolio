"use client";

import { useRef, useEffect, useMemo, useState } from "react";

interface TechItem {
  label: string;
  color?: string;
  size?: number;
}

interface SkillOrbitProps {
  items: TechItem[];
  radius?: number;
  speed?: number;
  className?: string;
  centerContent?: React.ReactNode;
}

function getRadius(w: number): number {
  if (w < 480) return 140;
  if (w < 640) return 180;
  if (w < 768) return 240;
  if (w < 1024) return 300;
  if (w < 1280) return 340;
  return 360;
}

export default function SkillOrbit({
  items,
  radius: baseRadius = 360,
  speed = 1,
  className = "",
  centerContent,
}: SkillOrbitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(getRadius(typeof window !== "undefined" ? window.innerWidth : 1024));

  useEffect(() => {
    const update = () => setRadius(getRadius(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const orbits = useMemo(() => {
    const count = items.length;
    return items.map((item, i) => {
      const angle = (i / count) * Math.PI * 2;
      const layer = Math.floor(i / (count / 3)) + 1;
      const r = radius * (0.6 + layer * 0.2);
      return { ...item, angle, layer, r };
    });
  }, [items, radius]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let frame: number;
    let t = 0;

    const animate = () => {
      t += 0.005 * speed;
      const dots = el.querySelectorAll<HTMLElement>("[data-orb]");
      orbits.forEach((orb, i) => {
        const dot = dots[i];
        if (!dot) return;
        const a = orb.angle + t * (0.5 + orb.layer * 0.3);
        const x = Math.cos(a) * orb.r;
        const y = Math.sin(a) * orb.r * 0.5;
        dot.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        dot.style.opacity = `${0.6 + Math.sin(a) * 0.3}`;
      });
      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [orbits, speed]);

  return (
    <div className="flex items-center justify-center w-full">
      <div
        ref={containerRef}
        className={`relative flex items-center justify-center ${className}`}
        style={{
          width: radius * 2.4,
          height: radius * 2.4,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-zinc-800/30"
            style={{
              width: radius * 2 * (0.6 + i * 0.2),
              height: radius * 2 * (0.6 + i * 0.2),
              borderStyle: "dashed",
            }}
          />
        ))}
        <div className="relative z-10">{centerContent}</div>
        {orbits.map((item, i) => (
          <div
            key={i}
            data-orb
            className="absolute left-1/2 top-1/2"
            style={{ willChange: "transform" }}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-strong border border-zinc-800/50 whitespace-nowrap">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color || "#059669" }}
              />
              <span className="text-[10px] text-zinc-400 font-medium">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
