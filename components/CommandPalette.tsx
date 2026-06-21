"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useI18n } from "@/context/I18nContext";

interface CmdItem {
  id: string;
  label: string;
  description?: string;
  action: () => void;
  category: string;
}

const sections = ["home", "about", "skills", "projects", "contact"];

export default function CommandPalette() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const getItems = useCallback((): CmdItem[] => {
    const items: CmdItem[] = sections.map((s) => ({
      id: `section-${s}`,
      label: s.charAt(0).toUpperCase() + s.slice(1),
      description: t("cmd.section", s),
      action: () => {
        document.getElementById(s)?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
      category: t("key.nav"),
    }));

    if (typeof window !== "undefined") {
      try {
        const bm = JSON.parse(localStorage.getItem("portfolio-bookmarks") || "[]");
        (bm as string[]).forEach((title: string) => {
          items.push({
            id: `bookmark-${title}`,
            label: title,
            description: t("cmd.bookmark", title),
            action: () => {
              const el = document.querySelector(`[data-project="${title}"]`);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                (el as HTMLElement).style.outline = "2px solid rgba(5,150,105,0.5)";
                setTimeout(() => (el as HTMLElement).style.outline = "", 2000);
              }
              setOpen(false);
            },
            category: t("cmd.bookmark", "").split(":")[0] || "Bookmarks",
          });
        });
      } catch {}
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      return items.filter(
        (i) =>
          i.label.toLowerCase().includes(q) ||
          (i.description && i.description.toLowerCase().includes(q))
      );
    }
    return items;
  }, [query, t]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((p) => !p);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const items = getItems();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((p) => Math.min(p + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((p) => Math.max(p - 1, 0));
    } else if (e.key === "Enter" && items[activeIdx]) {
      items[activeIdx].action();
    }
  };

  useEffect(() => {
    if (listRef.current) {
      const active = listRef.current.children[activeIdx] as HTMLElement;
      active?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIdx]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-2xl glass-strong border border-zinc-700/50 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800/50">
          <svg className="w-5 h-5 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
            onKeyDown={onKeyDown}
            placeholder={t("cmd.placeholder")}
            className="flex-1 bg-transparent text-zinc-200 placeholder-zinc-500 outline-none text-sm"
          />
          <kbd className="hidden sm:inline-flex text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 font-mono border border-zinc-700/50">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-72 overflow-y-auto p-2 space-y-0.5">
          {items.length === 0 && (
            <p className="text-center text-sm text-zinc-500 py-8">{t("cmd.noResults")}</p>
          )}
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                i === activeIdx
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              }`}
            >
              <span className="flex-1 text-sm font-medium truncate">{item.label}</span>
              <span className="text-[10px] text-zinc-600 shrink-0 uppercase tracking-wider">
                {item.category}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
