"use client";

import { useEffect, useRef } from "react";

const contactItems = [
  {
    label: "Email",
    value: "animatorabdullah@gmail.com",
    href: "mailto:animatorabdullah@gmail.com",
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "https://github.com/SaiyedAbdullah-127",
    href: "https://github.com/SaiyedAbdullah-127",
    external: true,
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/abdullah",
    href: "https://linkedin.com",
    external: true,
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("section-visible");
          itemsRef.current.forEach((item, i) => {
            if (item) {
              setTimeout(() => {
                item.classList.add("opacity-100");
                item.classList.remove("opacity-0", "translate-y-8", "translate-y-12");
              }, 200 + i * 120);
            }
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-hidden relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(5,150,105,0.03)_0%,transparent_60%)]" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-violet-500/5 rounded-full blur-[100px] animate-float-slow" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: "-3s" }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4 animate-fade-in-up">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-lg mx-auto">
            Have a project in mind or just want to say hello? I&apos;d love to
            hear from you.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="glass rounded-2xl border border-zinc-800/50 p-5 sm:p-8 hover:border-violet-500/20 transition-all duration-500 hover:shadow-[0_0_60px_rgba(5,150,105,0.08)]">
            <div className="space-y-4 sm:space-y-5">
              {contactItems.map((item, idx) => (
                <a
                  key={item.label}
                  ref={(el) => { itemsRef.current[idx] = el; }}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="opacity-0 translate-y-12 transition-all duration-700 group flex items-center gap-2.5 sm:gap-4 p-2.5 sm:p-4 rounded-xl glass-strong border border-zinc-800/50 hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(5,150,105,0.15)] hover:scale-[1.02] active:scale-[0.98]"
                  style={{ transitionDelay: `${200 + idx * 120}ms` }}
                >
                  <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500/15 to-violet-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <div className="absolute inset-0 rounded-xl bg-emerald-500/5 animate-ripple hidden sm:block" />
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500 tracking-wide uppercase">{item.label}</p>
                    <p className="text-sm sm:text-base text-zinc-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-violet-400 group-hover:bg-clip-text transition-all duration-300 font-medium break-all">
                      {item.value}
                      {item.external && (
                        <svg className="w-3 h-3 inline ml-1 -mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </p>
                  </div>
                  <div className="hidden sm:flex w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/[0.02] items-center justify-center group-hover:bg-emerald-500/10 transition-all duration-300 group-hover:scale-110 shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
