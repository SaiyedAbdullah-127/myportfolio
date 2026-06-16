"use client";

import { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${(window.scrollY / h) * 100}%`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div id="scroll-progress" className="scroll-progress" />;
}
