"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollAnimationsProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  as?: "div" | "section" | "article";
}

export default function ScrollAnimations({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 40,
  once = true,
  as: Tag = "div",
}: ScrollAnimationsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-50px" });

  const getTransform = () => {
    switch (direction) {
      case "up": return { y: distance };
      case "down": return { y: -distance };
      case "left": return { x: distance };
      case "right": return { x: -distance };
      default: return {};
    }
  };

  return (
    <Tag ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, ...getTransform() }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...getTransform() }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
