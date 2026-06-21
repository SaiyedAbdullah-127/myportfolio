"use client";

import { useState } from "react";

export default function PIPVideo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full glass-strong border border-zinc-700/50 flex items-center justify-center hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(5,150,105,0.2)] transition-all duration-300 group"
        aria-label={open ? "Close video" : "Open introduction video"}
        data-cursor="button"
      >
        {open ? (
          <svg className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div
        className={`fixed bottom-40 right-6 z-40 w-[200px] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
        data-cursor="project"
      >
        <div className="aspect-video bg-gradient-to-br from-emerald-600/20 via-teal-600/10 to-violet-600/20 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,150,105,0.1),transparent)] animate-pulse-glow" />
          <div className="relative z-10 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto mb-2 cursor-pointer hover:bg-emerald-500/30 transition-all duration-300 group">
              <svg className="w-6 h-6 text-emerald-300 ml-0.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase">Intro Video</p>
          </div>
        </div>
        <div className="bg-zinc-900/95 backdrop-blur-xl px-3 py-2 border-t border-zinc-800/50 flex items-center justify-between">
          <span className="text-[10px] text-zinc-500 font-medium truncate">Introduction</span>
          <span className="text-[10px] text-zinc-600 font-mono">0:00</span>
        </div>
      </div>
    </>
  );
}
