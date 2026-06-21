"use client";

import { useEffect, useRef, useState } from "react";

const experiences = [
  { year: "2026", title: "Full Stack Developer", subtitle: "Building modern web applications", active: true },
  { year: "2025", title: "Portfolio Launch", subtitle: "First professional portfolio live" },
  { year: "2024", title: "Learning Next.js", subtitle: "Deep dive into React & Next.js ecosystem" },
  { year: "2023", title: "Started Coding", subtitle: "Began journey in web development" },
];

export default function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(5,150,105,0.02)_0%,transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            My <span className="text-gradient">Journey</span>
          </h2>
        </div>

        <div ref={ref} className="max-w-2xl mx-auto relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-zinc-700/30 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div
                key={exp.year}
                className="relative pl-16 group"
                style={{
                  transform: visible ? "translateX(0)" : "translateX(-20px)",
                  opacity: visible ? 1 : 0,
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
                }}
              >
                <div
                  className={`absolute left-3 top-1.5 w-[18px] h-[18px] rounded-full border-2 ${
                    exp.active
                      ? "border-emerald-400 bg-emerald-500/30 shadow-[0_0_15px_rgba(5,150,105,0.4)]"
                      : "border-zinc-700 bg-zinc-900"
                  } transition-all duration-500 group-hover:scale-125`}
                >
                  {exp.active && (
                    <div className="absolute inset-1 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>

                <div className="glass rounded-xl p-4 border border-zinc-800/50 hover:border-emerald-500/20 transition-all duration-300 group-hover:translate-x-1">
                  <span className="text-xs text-emerald-400 font-mono font-medium">
                    {exp.year}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-zinc-200 mt-0.5">
                    {exp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                    {exp.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
