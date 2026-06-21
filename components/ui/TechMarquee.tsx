"use client";

interface TechMarqueeProps {
  items?: string[];
  speed?: number;
}

const defaultItems = [
  "NEXT.JS", "REACT", "TYPESCRIPT", "SUPABASE", "TAILWIND CSS",
  "POSTGRESQL", "NODE.JS", "EXPRESS", "MONGODB", "DOCKER",
  "GIT", "FIGMA", "VERCEL", "REST API",
];

export default function TechMarquee({ items = defaultItems, speed = 30 }: TechMarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,150,105,0.02)_0%,transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-8">
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase">
            Tech Stack
          </p>
        </div>
        <div className="relative overflow-hidden mask-fade-x">
          <div
            className="flex gap-8 whitespace-nowrap"
            style={{
              animation: `marquee-scroll ${speed}s linear infinite`,
              width: "max-content",
            }}
          >
            {doubled.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-[0.2em] text-zinc-600 hover:text-emerald-400 transition-colors duration-300"
              >
                {item}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/30" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
