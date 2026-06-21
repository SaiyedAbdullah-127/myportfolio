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

export default function SkillOrbit({
  items,
  radius = 160,
  speed = 1,
  className = "",
  centerContent,
}: SkillOrbitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      if (w < 480) setScale(0.35);
      else if (w < 640) setScale(0.45);
      else if (w < 768) setScale(0.6);
      else if (w < 1024) setScale(0.75);
      else if (w < 1280) setScale(0.9);
      else setScale(1);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
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
    <div className="flex items-center justify-center w-full overflow-hidden py-8">
      <div
        ref={containerRef}
        className={`relative flex items-center justify-center ${className}`}
        style={{
          width: radius * 2.4,
          height: radius * 2.4,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
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
