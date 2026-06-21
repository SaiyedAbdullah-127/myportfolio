"use client";

import { useRef, useEffect, useMemo, type CSSProperties } from "react";

interface AuroraBackgroundProps {
  colors?: string[];
  speed?: number;
  blur?: number;
  opacity?: number;
  className?: string;
}

export default function AuroraBackground({
  colors = ["#059669", "#0d9488", "#7c3aed", "#0891b2"],
  speed = 8,
  blur = 120,
  opacity = 0.15,
  className = "",
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gradientStops = useMemo(
    () => colors.map((c, i) => ({ color: c, pos: (i / (colors.length - 1)) * 100 })),
    [colors]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.005 * speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      for (let i = 0; i < colors.length; i++) {
        const x = w / 2 + Math.sin(time + i * 1.5) * w * 0.35;
        const y = h / 2 + Math.cos(time * 0.7 + i * 1.2) * h * 0.25;
        const r = w * 0.4 + Math.sin(time * 0.5 + i) * w * 0.1;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, colors[i] + "66");
        gradient.addColorStop(0.4, colors[i] + "33");
        gradient.addColorStop(1, colors[i] + "00");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ filter: `blur(${blur}px)`, opacity } as CSSProperties}
    />
  );
}
