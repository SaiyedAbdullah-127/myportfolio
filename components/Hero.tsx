"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ButtonGlitch from "./ButtonGlitch";
import ButtonMarquee from "./ButtonMarquee";
import MagneticButton from "./ui/MagneticButton";
import AuroraBackground from "./effects/AuroraBackground";
import ParticleField from "./effects/ParticleField";
import SpotlightEffect from "./effects/SpotlightEffect";
import NoiseOverlay from "./effects/NoiseOverlay";

const roles = [
  "Full Stack Web Developer",
  "Next.js Enthusiast",
  "UI/UX Designer",
  "Problem Solver",
];

const techIcons = [
  { label: "Next.js", x: 12, y: 18, delay: 0, duration: 7 },
  { label: "React", x: 82, y: 12, delay: 1, duration: 9 },
  { label: "TypeScript", x: 8, y: 72, delay: 2, duration: 8 },
  { label: "Supabase", x: 86, y: 78, delay: 0.5, duration: 10 },
  { label: "Tailwind", x: 72, y: 6, delay: 1.5, duration: 6 },
  { label: "PostgreSQL", x: 16, y: 82, delay: 2.5, duration: 9 },
];

const nameWords = ["Syed", "Muhammad", "Abdullah", "Maududi"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

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
    <SpotlightEffect size={500} color="rgba(5, 150, 105, 0.08)" blur={120}>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <AuroraBackground speed={6} blur={100} opacity={0.12} />
          <ParticleField count={50} connectionDistance={100} speed={0.2} />
          <NoiseOverlay opacity={0.02} pattern="dots" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: "-3s" }} />
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] animate-float-slow" style={{ animationDelay: "-1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-violet-500/5 rounded-full blur-[150px] animate-morph" style={{ animationDuration: "14s" }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,150,105,0.03)_0%,transparent_70%)]" />
        </div>

        {mounted && techIcons.map((tech) => (
          <motion.div
            key={tech.label}
            className="absolute hidden lg:block"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 1, 0.7, 1],
              scale: 1,
              y: [0, -12, 0, 12, 0],
            }}
            transition={{
              duration: tech.duration,
              delay: tech.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: `${tech.y}%`, left: `${tech.x}%` }}
          >
            <div className="px-3 py-1.5 rounded-full glass-strong border border-zinc-800/50 text-[10px] text-zinc-500 font-medium whitespace-nowrap hover:text-emerald-400 hover:border-emerald-500/30 transition-colors duration-300">
              {tech.label}
            </div>
          </motion.div>
        ))}

        <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-emerald-400 border-emerald-500/20 animate-ripple"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for opportunities
          </motion.div>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium"
            >
              Bismillah-ir Rahman-ir Rahim
            </motion.p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
              {nameWords.map((word, i) => (
                <motion.span
                  key={word}
                  className={`block ${i < 2 ? "text-zinc-300" : "text-gradient"} ${i > 0 ? "mt-1 sm:mt-2" : ""}`}
                  initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="h-12 flex items-center justify-center"
            >
              <p className="text-xl sm:text-2xl md:text-3xl text-zinc-400 font-light">
                <span>{displayed}</span>
                <span className="inline-block w-[3px] h-[1em] bg-gradient-to-b from-emerald-400 to-violet-400 ml-1 animate-pulse align-middle rounded-sm" />
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="max-w-xl mx-auto text-zinc-500 text-base sm:text-lg leading-relaxed"
            >
              Crafting modern, responsive, and performant web applications
              with cutting-edge technologies. Turning complex problems into
              elegant digital solutions.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton as="a" href="#projects">
              <span className="shiny-sweep arrow-btn inline-block">
                <ButtonGlitch className="px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-violet-600 text-white font-medium hover:shadow-[0_0_40px_rgba(5,150,105,0.4)] active:scale-95">
                  View My Work <span className="arrow-icon ml-1 inline-block">→</span>
                </ButtonGlitch>
              </span>
            </MagneticButton>
            <MagneticButton as="a" href="#contact">
              <span className="shiny-sweep inline-block">
                <ButtonMarquee className="px-8 py-3.5 rounded-full glass border border-zinc-700/50 text-zinc-300 font-medium hover:border-emerald-500/30 hover:text-emerald-400 active:scale-95">
                  Get In Touch
                </ButtonMarquee>
              </span>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="mt-16 flex justify-center"
          >
            <a
              href="#about"
              className="flex flex-col items-center gap-2 text-zinc-600 hover:text-zinc-400 transition-all duration-300 hover:scale-110"
            >
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex justify-center pt-2 hover:border-emerald-500/50 transition-colors duration-300">
                <div className="w-1 h-2 rounded-full bg-gradient-to-b from-emerald-400 to-violet-400 animate-bounce" />
              </div>
            </a>
          </motion.div>
        </div>
      </section>
    </SpotlightEffect>
  );
}
