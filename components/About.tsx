"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("section-visible");
          contentRefs.current.forEach((item, i) => {
            if (item) {
              setTimeout(() => {
                item.classList.add("opacity-100");
                item.classList.remove("opacity-0");
                if (i === 0) {
                  item.classList.remove("-translate-x-12");
                } else {
                  item.classList.remove("translate-x-12", "translate-y-8");
                }
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
      id="about"
      ref={sectionRef}
      className="section-hidden relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] animate-float" style={{ animationDelay: "-4s" }} />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-teal-500/5 rounded-full blur-[80px] animate-float-slow" style={{ animationDelay: "-2s" }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4 animate-fade-in-up">
            About Me
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Who I <span className="text-gradient">Am</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div
            ref={(el) => { contentRefs.current[0] = el; }}
            className="opacity-0 -translate-x-12 transition-all duration-700 relative group"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 mx-auto">
              <div className="absolute -inset-4 sm:-inset-8 animate-spin-slow">
                <div className="w-4 h-4 rounded-full bg-emerald-500/30 absolute top-0 left-1/2 -translate-x-1/2 animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-violet-500/30 absolute bottom-0 left-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: "0.5s" }} />
                <div className="w-3 h-3 rounded-full bg-teal-500/30 absolute left-0 top-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="w-3 h-3 rounded-full bg-emerald-500/30 absolute right-0 top-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: "1.5s" }} />
              </div>
              <div className="absolute inset-0 animate-morph bg-gradient-to-br from-emerald-600/20 via-teal-600/20 to-violet-600/20 rounded-full" />
              <div
                className="absolute inset-4 animate-morph bg-gradient-to-br from-emerald-600/30 via-teal-600/20 to-violet-600/20 rounded-full"
                style={{ animationDelay: "-2s", animationDirection: "reverse" }}
              />
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                <Image
                  src="/image.jpeg"
                  alt="Saiyed Muhammad Abdullah Maududi"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  style={{ objectPosition: '50% 30%' }}
                  sizes="(max-width: 640px) 288px, 320px"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div
              ref={(el) => { contentRefs.current[1] = el; }}
              className="opacity-0 translate-x-12 transition-all duration-700"
            >
              <p className="text-zinc-300 text-lg leading-relaxed">
                Assalamu Alaikum! I&apos;m{" "}
                <span className="text-emerald-400 font-semibold">
                  Saiyed Muhammad Abdullah Maududi
                </span>
                , a passionate Full Stack Web Developer currently pursuing my
                studies at <span className="text-emerald-400 font-semibold">OI</span>.
              </p>
            </div>
            <div
              ref={(el) => { contentRefs.current[2] = el; }}
              className="opacity-0 translate-y-8 transition-all duration-700"
            >
              <p className="text-zinc-400 leading-relaxed">
                Alhamdulillah, I specialize in building modern, responsive, and
                performant web applications. From sleek frontends with Next.js
                and React to robust backends, I love crafting complete digital
                experiences that make an impact.
              </p>
            </div>
            <div
              ref={(el) => { contentRefs.current[3] = el; }}
              className="opacity-0 translate-y-8 transition-all duration-700"
            >
              <p className="text-zinc-400 leading-relaxed">
                My journey in web development is driven by a passion for
                learning and a commitment to excellence. Every project is an
                opportunity to push boundaries and create something truly
                remarkable.
              </p>
            </div>

            <div
              ref={(el) => { contentRefs.current[4] = el; }}
              className="opacity-0 translate-y-8 transition-all duration-700 flex flex-wrap gap-3 pt-4"
            >
              {[
                "Dedication",
                "Innovation",
                "Quality",
                "Integrity",
              ].map((trait) => (
                <span
                  key={trait}
                  className="px-4 py-2 rounded-full text-sm glass text-zinc-300 border-zinc-700/50 hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/10 hover:shadow-[0_0_25px_rgba(5,150,105,0.2)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
