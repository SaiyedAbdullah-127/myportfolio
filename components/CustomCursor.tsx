"use client";

import { useEffect, useState } from "react";

type CursorVariant = "default" | "project" | "link" | "button";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    document.body.classList.add("custom-cursor-active");

    const onMouse = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onHoverIn = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (!target) return;
      const type = target.getAttribute("data-cursor") as CursorVariant;
      setVariant(type || "default");
    };

    const onHoverOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (!target) return;
      setVariant("default");
    };

    document.addEventListener("mousemove", onMouse);
    document.addEventListener("mouseenter", onHoverIn, true);
    document.addEventListener("mouseleave", onHoverOut, true);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseenter", onHoverIn, true);
      document.removeEventListener("mouseleave", onHoverOut, true);
    };
  }, [visible]);

  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  const sizeMap: Record<CursorVariant, number> = {
    default: 16,
    project: 96,
    link: 48,
    button: 56,
  };

  const size = sizeMap[variant];
  const isProject = variant === "project";

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`,
        opacity: visible ? 1 : 0,
        transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        width: size,
        height: size,
      }}
    >
      <div
        className={`w-full h-full rounded-full transition-all duration-300 flex items-center justify-center ${
          variant === "default"
            ? "bg-emerald-400/40 border border-emerald-400/60"
            : variant === "project"
            ? "bg-emerald-500/15 border-2 border-emerald-400/50 backdrop-blur-md"
            : variant === "link"
            ? "bg-violet-500/20 border border-violet-400/50 backdrop-blur-sm"
            : "bg-teal-500/20 border border-teal-400/50 backdrop-blur-sm"
        }`}
        style={{
          boxShadow:
            variant === "default"
              ? "0 0 10px rgba(5,150,105,0.3)"
              : `0 0 40px rgba(5,150,105,0.2)`,
        }}
      >
        {isProject && (
          <span className="text-[9px] font-bold text-emerald-300 tracking-[0.15em] uppercase text-center leading-tight select-none">
            VIEW
            <br />
            CASE
          </span>
        )}
        {variant === "link" && (
          <svg className="w-4 h-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )}
      </div>
    </div>
  );
}
