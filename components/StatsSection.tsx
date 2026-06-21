"use client";

import StatCounter from "./ui/StatCounter";

const stats = [
  { end: 10, suffix: "+", label: "Projects Built" },
  { end: 100, suffix: "%", label: "Responsive Designs" },
  { end: 100, suffix: "%", label: "Satisfaction" },
  { end: 24, suffix: "/7", label: "Passion For Coding" },
];

export default function StatsSection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,150,105,0.02)_0%,transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
