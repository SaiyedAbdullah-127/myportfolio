"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "en" | "ar";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.available": "Available for opportunities",
    "hero.viewWork": "View My Work",
    "hero.getInTouch": "Get In Touch",
    "hero.scroll": "Scroll",
    "about.title": "Who I Am",
    "skills.title": "What I Bring to the Table",
    "projects.title": "Featured Projects",
    "projects.myWork": "My Work",
    "projects.live": "Live",
    "contact.title": "Let's Connect",
    "contact.subtitle": "Have a project in mind or just want to say hello? I'd love to hear from you.",
    "footer.builtWith": "Built with Next.js & Tailwind CSS",
    "cmd.placeholder": "Search pages, projects, or actions…",
    "cmd.noResults": "No results found",
    "cmd.section": "Navigate to %s",
    "cmd.bookmark": "Project: %s",
    "cmd.shortcut": "Shortcuts",
    "key.nav": "Navigate to",
    "bookmark.added": "Bookmarked!",
    "bookmark.removed": "Removed bookmark",
    "recent.viewed": "Recently viewed",
    "pip.title": "Introduction",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.about": "عنّي",
    "nav.skills": "المهارات",
    "nav.projects": "المشاريع",
    "nav.contact": "اتصل بي",
    "hero.available": "متاح للفرص",
    "hero.viewWork": "أعمالي",
    "hero.getInTouch": "تواصل معي",
    "hero.scroll": "تمرير",
    "about.title": "من أنا",
    "skills.title": "ما أقدمه",
    "projects.title": "مشاريعي المميزة",
    "projects.myWork": "أعمالي",
    "projects.live": "مباشر",
    "contact.title": "هيا نتواصل",
    "contact.subtitle": "هل لديك مشروع في mind أو تريد إلقاء التحية؟",
    "footer.builtWith": "بُني باستخدام Next.js و Tailwind CSS",
    "cmd.placeholder": "ابحث عن صفحات، مشاريع، أو إجراءات…",
    "cmd.noResults": "لا توجد نتائج",
    "cmd.section": "انتقل إلى %s",
    "cmd.bookmark": "مشروع: %s",
    "cmd.shortcut": "اختصارات",
    "key.nav": "انتقل إلى",
    "bookmark.added": "تمت الإضافة!",
    "bookmark.removed": "تمت الإزالة",
    "recent.viewed": "تمت المشاهدة مؤخرًا",
    "pip.title": "مقدمة",
  },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, ...args: string[]) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nCtx>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
  dir: "ltr",
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = useCallback(
    (key: string, ...args: string[]): string => {
      let val = translations[lang]?.[key] ?? key;
      args.forEach((arg, i) => {
        val = val.replace(`%s`, arg);
      });
      return val;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
