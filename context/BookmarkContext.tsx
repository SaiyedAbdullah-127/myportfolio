"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

interface ProjectMeta {
  title: string;
  link: string;
  timestamp: number;
}

interface BookmarkCtx {
  bookmarks: string[];
  recentViews: ProjectMeta[];
  toggleBookmark: (title: string) => void;
  isBookmarked: (title: string) => boolean;
  trackView: (title: string, link: string) => void;
}

const BookmarkContext = createContext<BookmarkCtx>({
  bookmarks: [],
  recentViews: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
  trackView: () => {},
});

const BM_KEY = "portfolio-bookmarks";
const RV_KEY = "portfolio-recent";

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [recentViews, setRecentViews] = useState<ProjectMeta[]>([]);

  useEffect(() => {
    try {
      const b = JSON.parse(localStorage.getItem(BM_KEY) || "[]");
      setBookmarks(b);
      const r = JSON.parse(localStorage.getItem(RV_KEY) || "[]");
      setRecentViews(r);
    } catch {}
  }, []);

  const toggleBookmark = useCallback((title: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title];
      localStorage.setItem(BM_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (title: string) => bookmarks.includes(title),
    [bookmarks]
  );

  const trackView = useCallback((title: string, link: string) => {
    setRecentViews((prev) => {
      const filtered = prev.filter((p) => p.title !== title);
      const next = [{ title, link, timestamp: Date.now() }, ...filtered].slice(0, 10);
      localStorage.setItem(RV_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <BookmarkContext.Provider value={{ bookmarks, recentViews, toggleBookmark, isBookmarked, trackView }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}
