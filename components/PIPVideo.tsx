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
        className={`pip-container ${
          open
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
        data-cursor="project"
      >
        <div className="pip-video-placeholder">
          <div className="text-center z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto mb-2 animate-pulse-glow cursor-pointer hover:bg-emerald-500/30 transition-all duration-300 group" onClick={() => setOpen(false)}>
              <svg className="w-6 h-6 text-emerald-300 ml-0.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase">
              Intro Video
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-violet-500/50" />
        </div>
        <div className="bg-zinc-900/95 backdrop-blur-xl px-3 py-2 border-t border-zinc-800/50">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-medium truncate">
              Introduction
            </span>
            <span className="text-[10px] text-zinc-600 font-mono">0:00</span>
          </div>
        </div>
      </div>
    </>
  );
}
