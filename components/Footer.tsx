"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Build Something{" "}
            <span className="text-gradient">Amazing Together</span>
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Have a project in mind? Let&apos;s turn your vision into reality.
          </p>
          <a
            href="#contact"
            className="shiny-sweep inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-violet-600 text-white font-medium hover:shadow-[0_0_40px_rgba(5,150,105,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      <div className="border-t border-zinc-800/30 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-xs sm:text-sm">
            &copy; {year} Saiyed Muhammad Abdullah Maududi. All rights reserved.
          </p>
          <p className="text-zinc-700 text-xs sm:text-sm">
            Crafted with{" "}
            <span className="text-emerald-400">Next.js</span> &amp;{" "}
            <span className="text-emerald-400">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
