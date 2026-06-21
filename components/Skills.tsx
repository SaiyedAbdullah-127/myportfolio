"use client";

import { useEffect, useRef } from "react";
import SkillOrbit from "./ui/SkillOrbit";
import ScrollAnimations from "./ui/ScrollAnimations";
import SpotlightEffect from "./effects/SpotlightEffect";

const skills = [
  {
    category: "Frontend",
    icon: "⚡",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "HTML/CSS",
      "JavaScript",
    ],
    gradient: "from-emerald-500/20 via-emerald-600/10 to-teal-600/10",
    border: "border-emerald-500/20",
    glow: "rgba(5,150,105,0.15)",
    accent: "emerald",
  },
  {
    category: "Backend",
    icon: "🖥️",
    items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
    gradient: "from-teal-500/20 via-teal-600/10 to-cyan-600/10",
    border: "border-teal-500/20",
    glow: "rgba(20,184,166,0.15)",
    accent: "teal",
  },
  {
    category: "Tools & More",
    icon: "🛠️",
    items: ["Git", "Docker", "VS Code", "Figma", "Linux", "Vercel"],
    gradient: "from-violet-500/20 via-violet-600/10 to-cyan-600/10",
    border: "border-violet-500/20",
    glow: "rgba(124,58,237,0.15)",
    accent: "violet",
  },
];

const orbitTech: { label: string; color: string }[] = [
  { label: "Next.js", color: "#059669" },
  { label: "React", color: "#0d9488" },
  { label: "TypeScript", color: "#7c3aed" },
  { label: "Node.js", color: "#0891b2" },
  { label: "Tailwind", color: "#0ea5e9" },
  { label: "MongoDB", color: "#10b981" },
  { label: "PostgreSQL", color: "#2563eb" },
  { label: "Docker", color: "#0284c7" },
  { label: "Git", color: "#dc2626" },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("section-visible");
          cardsRef.current.forEach((card, i) => {
            if (card) {
              setTimeout(() => {
                card.classList.add("opacity-100", "scale-100");
                card.classList.remove("opacity-0", "scale-75");
              }, i * 180);
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
      id="skills"
      ref={sectionRef}
      className="section-hidden relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(5,150,105,0.03)_0%,transparent_60%)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px] animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-500/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: "-3s" }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4 animate-fade-in-up">
            My Skills
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            What I <span className="text-gradient">Bring</span> to the Table
          </h2>
        </div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {skills.map((skill, idx) => (
            <div
              key={skill.category}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="opacity-0 scale-75 transition-all duration-700 group"
              style={{ transitionDelay: `${idx * 180}ms` }}
            >
              <div
                data-cursor="link"
                className={`relative h-full rounded-2xl glass border ${skill.border} p-8 card-tilt hover:shadow-[0_0_50px_${skill.glow}] overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-white/[0.03] to-transparent group-hover:scale-150 transition-transform duration-700" />

                <div className="text-4xl mb-4 group-hover:animate-heartbeat inline-block">
                  {skill.icon}
                </div>

                <h3 className="text-xl font-semibold text-zinc-200 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-violet-400 group-hover:bg-clip-text transition-all duration-300">
                  {skill.category}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <span
                      key={item}
                      data-cursor="link"
                      className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-zinc-400 border border-zinc-800/50 hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/10 hover:shadow-[0_0_15px_rgba(5,150,105,0.1)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-default"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Orbit */}
        <ScrollAnimations>
          <SpotlightEffect size={400} color="rgba(5,150,105,0.05)" blur={100}>
            <div className="flex flex-col items-center">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 mb-8">
                Technology Constellation
              </p>
              <SkillOrbit
                items={orbitTech}
                radius={180}
                speed={0.8}
                centerContent={
                  <div className="w-20 h-20 rounded-full glass-strong border border-emerald-500/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-gradient">&lt;/&gt;</span>
                  </div>
                }
              />
            </div>
          </SpotlightEffect>
        </ScrollAnimations>
      </div>
    </section>
  );
}
