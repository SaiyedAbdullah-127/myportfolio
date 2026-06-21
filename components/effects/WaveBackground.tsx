"use client";

import { useRef, useEffect } from "react";

interface WaveBackgroundProps {
  waveCount?: number;
  color?: string;
  speed?: number;
  amplitude?: number;
  className?: string;
}

export default function WaveBackground({
  waveCount = 3,
  color = "rgba(5, 150, 105, 0.08)",
  speed = 0.8,
  amplitude = 30,
  className = "",
}: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      time += 0.02 * speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      for (let wv = 0; wv < waveCount; wv++) {
        ctx.beginPath();
        ctx.moveTo(0, h);

        const freq = 0.008 + wv * 0.003;
        const phase = time + wv * 2;
        const amp = amplitude + wv * 10;

        for (let x = 0; x <= w; x += 2) {
          const y = h / 2 + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2 + phase * 1.3) * amp * 0.4;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();

        const alpha = 0.05 + (wv / waveCount) * 0.1;
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [waveCount, color, speed, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
