"use client";

import { useEffect, useRef } from "react";
import { useBookmarks } from "@/context/BookmarkContext";
import ParallaxSection from "./ParallaxSection";
import { BentoGrid, BentoItem } from "./ui/BentoGrid";
import DeviceFrame from "./ui/DeviceFrame";
import ProjectCarousel from "./ui/ProjectCarousel";
import ScrollAnimations from "./ui/ScrollAnimations";
import SpotlightEffect from "./effects/SpotlightEffect";

const projects = [
  {
    title: "Bakery Web",
    description:
      "A modern, responsive bakery website with stunning visuals, smooth animations, and an intuitive ordering experience. Built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    link: "https://bakeryweb-kappa.vercel.app",
    gradient: "from-amber-500/15 via-orange-500/10 to-rose-500/10",
    iconBg: "from-amber-500/20 to-orange-500/20",
    borderGlow: "hover:border-amber-500/30",
    shadow: "rgba(245,158,11,0.15)",
  },
  {
    title: "Bookstore MVP",
    description:
      "A full-featured bookstore platform with book browsing, search, and management capabilities. Clean UI with seamless navigation and performance.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    link: "https://bookstoremvp.vercel.app",
    gradient: "from-emerald-500/15 via-teal-500/10 to-cyan-500/10",
    iconBg: "from-emerald-500/20 to-teal-500/20",
    borderGlow: "hover:border-emerald-500/30",
    shadow: "rgba(5,150,105,0.15)",
  },
  {
    title: "Portfolio Hub",
    description:
      "A dynamic portfolio platform with modern animations, glassmorphism design, and interactive UI components. Fully responsive with dark theme.",
    tags: ["Next.js", "Framer Motion", "TypeScript", "Tailwind"],
    link: "#",
    gradient: "from-violet-500/15 via-purple-500/10 to-pink-500/10",
    iconBg: "from-violet-500/20 to-purple-500/20",
    borderGlow: "hover:border-violet-500/30",
    shadow: "rgba(124,58,237,0.15)",
  },
  {
    title: "Weather Dashboard",
    description:
      "Real-time weather dashboard with interactive maps, 7-day forecasts, and location-based weather data. Clean data visualization with charts.",
    tags: ["React", "API", "Chart.js", "CSS"],
    link: "#",
    gradient: "from-cyan-500/15 via-blue-500/10 to-sky-500/10",
    iconBg: "from-cyan-500/20 to-blue-500/20",
    borderGlow: "hover:border-cyan-500/30",
    shadow: "rgba(6,182,212,0.15)",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { isBookmarked, toggleBookmark, trackView } = useBookmarks();

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
                card.classList.add("opacity-100");
                card.classList.remove("opacity-0", "-translate-x-16", "translate-x-16");
              }, 200 + i * 180);
            }
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const renderCard = (project: typeof projects[number], idx: number) => {
    const bookmarked = isBookmarked(project.title);
    return (
      <div
        key={project.title}
        data-project={project.title}
        ref={(el) => { cardsRef.current[idx] = el; }}
        className={`opacity-0 ${idx % 2 === 0 ? "-translate-x-16" : "translate-x-16"} transition-all duration-700`}
        style={{ transitionDelay: `${200 + idx * 180}ms` }}
      >
        <div
          data-cursor="project"
          className={`group relative h-full rounded-2xl glass glass-edge border border-zinc-800/50 overflow-hidden card-tilt ${project.borderGlow} transition-all duration-500 hover:shadow-[0_0_50px_${project.shadow}]`}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            onClick={() => trackView(project.title, project.link)}
          >
            <ParallaxSection speed={0.08}>
              <div
                className={`h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/[0.03] group-hover:scale-[3] transition-transform duration-1000 ease-out" />
                <div className="w-20 h-20 rounded-2xl glass-strong flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                  <span className="text-3xl font-bold text-gradient">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>
            </ParallaxSection>
          </a>

          <button
            onClick={(e) => { e.preventDefault(); toggleBookmark(project.title); }}
            className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full glass-strong border border-zinc-700/50 flex items-center justify-center hover:border-emerald-500/30 transition-all duration-300 hover:scale-110 active:scale-90"
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark project"}
            data-cursor="link"
          >
            <svg
              className={`w-4 h-4 transition-all duration-300 ${bookmarked ? "text-emerald-400 fill-emerald-400" : "text-zinc-500 fill-transparent"}`}
              stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              fill={bookmarked ? "currentColor" : "none"}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>

          <div className="p-6 relative">
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            <h3 className="text-lg font-semibold text-zinc-200 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-violet-400 group-hover:bg-clip-text transition-all duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4 group-hover:text-zinc-300 transition-colors duration-300">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  data-cursor="link"
                  className="px-2.5 py-1 rounded-md text-xs bg-white/5 text-zinc-500 border border-zinc-800/50 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-2 border-transparent bg-gradient-to-r from-emerald-500/20 via-violet-500/20 to-emerald-500/20 bg-[length:200%_100%] animate-shimmer" style={{ WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-3 group-hover:translate-x-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium backdrop-blur-sm border border-emerald-500/30 animate-glow-pulse">
              Live
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-hidden relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,150,105,0.02)_0%,transparent_60%)]" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] animate-float" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4 animate-fade-in-up">
            My Work
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </div>

        {/* Standard Grid */}
        <ScrollAnimations>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
            {projects.slice(0, 2).map((project, idx) => renderCard(project, idx))}
          </div>
        </ScrollAnimations>

        {/* Bento Grid */}
        <ScrollAnimations direction="left">
          <div className="mb-20">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-zinc-600 mb-8">
              Bento Grid Layout
            </p>
            <BentoGrid cols={4} gap={4}>
              {projects.slice(0, 4).map((p, i) => (
                <BentoItem key={p.title} colSpan={i === 0 ? 2 : i === 1 ? 2 : 1} rowSpan={i < 2 ? 2 : 1}>
                  <SpotlightEffect size={200} color="rgba(5,150,105,0.06)" blur={60}>
                    <a
                      href={p.link} target="_blank" rel="noopener noreferrer"
                      onClick={() => trackView(p.title, p.link)}
                      className="flex flex-col items-center justify-center h-full p-6 text-center"
                    >
                      <span className="text-2xl font-bold text-gradient mb-2">{p.title.charAt(0)}</span>
                      <h4 className="text-sm font-semibold text-zinc-300 mb-1">{p.title}</h4>
                      <p className="text-[10px] text-zinc-500 line-clamp-2">{p.description}</p>
                    </a>
                  </SpotlightEffect>
                </BentoItem>
              ))}
            </BentoGrid>
          </div>
        </ScrollAnimations>

        {/* Device Frame Previews */}
        <ScrollAnimations direction="right">
          <div className="mb-20">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-zinc-600 mb-8">
              Device Mockups
            </p>
            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {projects.slice(0, 2).map((p, i) => (
                <div key={p.title} className="text-center">
                  <DeviceFrame type={i === 0 ? "laptop" : "phone"}>
                    <div className={`w-full h-full bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                      <span className="text-lg font-bold text-white/30">{p.title}</span>
                    </div>
                  </DeviceFrame>
                  <p className="text-xs text-zinc-500 mt-3">{p.title}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimations>

        {/* Project Carousel */}
        <ScrollAnimations>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-zinc-600 mb-6">
            Draggable Carousel
          </p>
          <SpotlightEffect size={300} color="rgba(5,150,105,0.05)" blur={80}>
            <ProjectCarousel itemWidth={280} gap={20}>
              {projects.map((p) => (
                <div
                  key={p.title}
                  className={`rounded-2xl glass glass-edge border ${p.borderGlow} p-6 h-48 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-[0_0_40px_rgba(5,150,105,0.1)] transition-all duration-300`}
                  onClick={() => { trackView(p.title, p.link); window.open(p.link, "_blank"); }}
                  data-cursor="project"
                >
                  <span className="text-3xl font-bold text-gradient mb-2">{p.title.charAt(0)}</span>
                  <h4 className="text-sm font-semibold text-zinc-300 mb-1">{p.title}</h4>
                  <p className="text-[10px] text-zinc-500 line-clamp-2">{p.description}</p>
                </div>
              ))}
            </ProjectCarousel>
          </SpotlightEffect>
        </ScrollAnimations>
      </div>
    </section>
  );
}
