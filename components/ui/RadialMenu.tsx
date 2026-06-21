"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";

interface RadialMenuItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

interface RadialMenuProps {
  items: RadialMenuItem[];
  radius?: number;
  className?: string;
  triggerLabel?: string;
}

export default function RadialMenu({
  items,
  radius = 120,
  className = "",
  triggerLabel = "✦",
}: RadialMenuProps) {
  const [open, setOpen] = useState(false);

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <div className={`fixed bottom-6 left-6 z-50 ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="relative z-10 w-12 h-12 rounded-full glass-strong border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300"
        data-cursor="button"
        aria-label="Radial menu"
      >
        <span className={`text-lg transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          {triggerLabel}
        </span>
      </button>

      {items.map((item, i) => {
        const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <a
            key={item.href}
            href={item.href}
            data-cursor="link"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-strong border border-zinc-700/50 flex items-center justify-center text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 text-xs font-medium"
            style={{
              transform: open
                ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                : "translate(-50%, -50%)",
              opacity: open ? 1 : 0,
              transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s`,
              pointerEvents: open ? "auto" : "none",
            }}
          >
            {item.icon || item.label.slice(0, 2)}
          </a>
        );
      })}
    </div>
  );
}
