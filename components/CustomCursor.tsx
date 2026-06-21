"use client";

import { useEffect, useRef, useState } from "react";

type CursorVariant = "default" | "project" | "link" | "button";

const SIZE_MAP: Record<CursorVariant, number> = {
  default: 16,
  project: 96,
  link: 48,
  button: 56,
};

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const variantRef = useRef<CursorVariant>("default");
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);
  const currentTargetRef = useRef<Element | null>(null);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    document.body.classList.add("custom-cursor-active");
    const el = cursorRef.current;
    if (!el) return;

    let rafId: number;
    let mx = 0;
    let my = 0;

    const updatePos = () => {
      const s = SIZE_MAP[variantRef.current];
      el.style.transform = `translate(${mx - s / 2}px, ${my - s / 2}px)`;
    };

    const onMouse = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) setVisible(true);
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePos);
    };

    const onHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target === currentTargetRef.current) return;
      currentTargetRef.current = target;
      const type = target
        ? (target.getAttribute("data-cursor") as CursorVariant)
        : "default";
      if (type !== variantRef.current) {
        variantRef.current = type;
        setVariant(type);
      }
    };

    document.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("mouseover", onHover, true);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseover", onHover, true);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  const size = SIZE_MAP[variant];
  const isProject = variant === "project";

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        transform: "translate(0, 0)",
        opacity: visible ? 1 : 0,
        width: size,
        height: size,
        transition: "width 0.15s ease-out, height 0.15s ease-out, opacity 0.2s ease",
      }}
    >
      <div
        className={`w-full h-full rounded-full flex items-center justify-center ${
          variant === "default"
            ? "bg-emerald-400/40 border border-emerald-400/60"
            : variant === "project"
              ? "bg-emerald-500/15 border-2 border-emerald-400/50 backdrop-blur-md"
              : variant === "link"
                ? "bg-violet-500/20 border border-violet-400/50 backdrop-blur-sm"
                : "bg-teal-500/20 border border-teal-400/50 backdrop-blur-sm"
        }`}
        style={{
          transition: "background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
          boxShadow:
            variant === "default"
              ? "0 0 10px rgba(5,150,105,0.3)"
              : "0 0 40px rgba(5,150,105,0.2)",
        }}
      >
        {isProject && (
          <span className="text-[9px] font-bold text-emerald-300 tracking-[0.15em] uppercase text-center leading-tight select-none">
            VIEW<br />CASE
          </span>
        )}
        {variant === "link" && (
          <svg
            className="w-4 h-4 text-violet-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
