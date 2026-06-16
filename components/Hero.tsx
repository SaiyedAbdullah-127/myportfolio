"use client";

import { useEffect, useState } from "react";

const roles = [
  "Full Stack Web Developer",
  "Next.js Enthusiast",
  "UI/UX Designer",
  "Problem Solver",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const [stars, setStars] = useState<{ top: string; left: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    setStars(
      [...Array(20)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${2 + Math.random() * 4}s`,
      }))
    );
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!deleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-float" />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/15 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "-3s" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] animate-float-slow"
          style={{ animationDelay: "-1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-violet-500/5 rounded-full blur-[150px] animate-morph"
          style={{ animationDuration: "14s" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,150,105,0.03)_0%,transparent_70%)]" />
      </div>

      {stars.length > 0 && (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {stars.map((s, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-twinkle"
              style={{
                top: s.top,
                left: s.left,
                animationDelay: s.delay,
                animationDuration: s.duration,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-emerald-400 border-emerald-500/20 animate-ripple">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for opportunities
        </div>

        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium animate-fade-in-up">
            Bismillah-ir Rahman-ir Rahim
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
            <span className="block text-zinc-300">Syed Muhammad</span>
            <span className="block text-gradient mt-2">
              Abdullah Maududi
            </span>
          </h1>

          <div className="h-12 flex items-center justify-center">
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-400 font-light">
              <span>{displayed}</span>
              <span className="inline-block w-[3px] h-[1em] bg-gradient-to-b from-emerald-400 to-violet-400 ml-1 animate-pulse align-middle rounded-sm" />
            </p>
          </div>

          <p className="max-w-xl mx-auto text-zinc-500 text-base sm:text-lg leading-relaxed">
            Crafting modern, responsive, and performant web applications
            with cutting-edge technologies. Turning complex problems into
            elegant digital solutions.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-violet-600 text-white font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(5,150,105,0.4)] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">View My Work</span>
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="group relative px-8 py-3.5 rounded-full glass border border-zinc-700/50 text-zinc-300 font-medium transition-all duration-300 hover:border-emerald-500/30 hover:text-emerald-400 hover:scale-105 active:scale-95"
          >
            Get In Touch
          </a>
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-zinc-600 hover:text-zinc-400 transition-all duration-300 hover:scale-110"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex justify-center pt-2 hover:border-emerald-500/50 transition-colors duration-300">
              <div className="w-1 h-2 rounded-full bg-gradient-to-b from-emerald-400 to-violet-400 animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
