"use client";

import { useEffect } from "react";
import { useI18n } from "@/context/I18nContext";

const sections = ["home", "about", "skills", "projects", "contact"];

export default function KeyboardShortcuts() {
  const { setLang } = useI18n();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "/") {
        e.preventDefault();
        const ev = new KeyboardEvent("keydown", { metaKey: true, key: "k" });
        document.dispatchEvent(ev);
        return;
      }

      const num = parseInt(e.key);
      if (num >= 1 && num <= sections.length) {
        const id = sections[num - 1];
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (e.key === "b" || e.key === "B") {
        const vpCenter = window.scrollY + window.innerHeight / 2;
        const cards = document.querySelectorAll<HTMLElement>("[data-project]");
        for (const card of cards) {
          const rect = card.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = rect.bottom + window.scrollY;
          if (top <= vpCenter && bottom >= vpCenter) {
            card.click();
            break;
          }
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setLang]);

  return null;
}
