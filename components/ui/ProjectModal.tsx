"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  tags: string[];
  link: string;
  gradient: string;
}

export default function ProjectModal({
  open, onClose, title, description, tags, link, gradient,
}: ProjectModalProps) {
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-lg rounded-2xl glass-strong border border-zinc-700/50 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-32 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <span className="text-5xl font-bold text-gradient relative z-10">
                {title.charAt(0)}
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-zinc-200">{title}</h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full glass-strong border border-zinc-700/50 flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:border-zinc-500 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2 font-medium">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[10px] bg-white/5 text-zinc-500 border border-zinc-800/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { label: "Users", value: "2,000+" },
                  { label: "Uptime", value: "99.9%" },
                  { label: "Dev Time", value: "4 Weeks" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-2 rounded-lg bg-white/[0.02] border border-zinc-800/30">
                    <p className="text-sm font-bold text-emerald-400">{stat.value}</p>
                    <p className="text-[9px] text-zinc-600 uppercase tracking-wider mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-violet-600 text-white text-sm font-medium hover:shadow-[0_0_30px_rgba(5,150,105,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                View Live Project
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
