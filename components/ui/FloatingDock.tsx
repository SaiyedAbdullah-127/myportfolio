"use client";

import { useState, useEffect, type ReactNode } from "react";

interface DockItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
  magnification?: number;
  baseSize?: number;
}

export default function FloatingDock({
  items,
  className = "",
  magnification = 1.5,
  baseSize = 44,
}: FloatingDockProps) {
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY;
      setHidden(cur > lastScroll && cur > 100);
      setLastScroll(cur);

      const ids = items.map((i) => i.href.slice(1));
      for (const id of ids.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll, items]);

  return (
    <nav
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        hidden ? "translate-y-20 opacity-0" : "translate-y-0 opacity-100"
      } ${className}`}
    >
      <div className="flex items-end gap-1.5 px-4 py-2 rounded-2xl glass-strong border border-zinc-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {items.map((item) => {
          const isActive = active === item.href.slice(1);
          return (
            <a
              key={item.href}
              href={item.href}
              data-cursor="link"
              className="group relative flex flex-col items-center"
            >
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900/90 text-[10px] text-zinc-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-zinc-800/50">
                {item.label}
              </span>
              <div
                className={`flex items-center justify-center rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(5,150,105,0.2)]"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                }`}
                style={{
                  width: isActive ? baseSize * magnification : baseSize,
                  height: isActive ? baseSize * magnification : baseSize,
                }}
              >
                {item.icon || (
                  <span className="text-xs font-medium uppercase tracking-wider">
                    {item.label.slice(0, 2)}
                  </span>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
