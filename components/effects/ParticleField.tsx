"use client";

import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface ParticleFieldProps {
  count?: number;
  color?: string;
  speed?: number;
  sizeRange?: [number, number];
  alphaRange?: [number, number];
  connectionDistance?: number;
  className?: string;
  interactive?: boolean;
}

export default function ParticleField({
  count = 80,
  color = "#059669",
  speed = 0.3,
  sizeRange = [1, 3],
  alphaRange = [0.2, 0.7],
  connectionDistance = 120,
  className = "",
  interactive = true,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);

  const initParticle = useCallback(
    (w: number, h: number): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
      alpha: alphaRange[0] + Math.random() * (alphaRange[1] - alphaRange[0]),
      life: 0,
      maxLife: 200 + Math.random() * 300,
    }),
    [speed, sizeRange, alphaRange]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame: number;
    const particles: Particle[] = [];
    particlesRef.current = particles;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const w = canvas.width;
      const h = canvas.height;
      while (particles.length < count) {
        particles.push(initParticle(w, h));
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = interactive
      ? (e: MouseEvent) => {
          mouseRef.current.x = e.clientX;
          mouseRef.current.y = e.clientY;
        }
      : null;
    if (onMouse) document.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.x < 0 || p.x > w || p.y < 0 || p.y > h || p.life > p.maxLife) {
          Object.assign(p, initParticle(w, h));
        }

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && interactive) {
          p.x -= dx * 0.02;
          p.y -= dy * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color + Math.round(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = color + Math.round((1 - dist2 / connectionDistance) * 60).toString(16).padStart(2, "0");
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      if (onMouse) document.removeEventListener("mousemove", onMouse);
    };
  }, [count, color, speed, connectionDistance, interactive, initParticle]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
