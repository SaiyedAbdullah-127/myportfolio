"use client";

import { useRef, useState, type ReactNode, useCallback } from "react";

interface ProjectCarouselProps {
  children: ReactNode[];
  className?: string;
  itemWidth?: number;
  gap?: number;
  snap?: boolean;
}

export default function ProjectCarousel({
  children,
  className = "",
  itemWidth = 340,
  gap = 24,
  snap = true,
}: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft || 0));
    setScrollLeft(trackRef.current?.scrollLeft || 0);
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const x = e.pageX - (trackRef.current?.offsetLeft || 0);
      const walk = (x - startX) * 1.5;
      if (trackRef.current) trackRef.current.scrollLeft = scrollLeft - walk;
    },
    [dragging, startX, scrollLeft]
  );

  const onUp = useCallback(() => {
    setDragging(false);
    if (snap && trackRef.current) {
      const idx = Math.round(trackRef.current.scrollLeft / (itemWidth + gap));
      trackRef.current.scrollTo({ left: idx * (itemWidth + gap), behavior: "smooth" });
    }
  }, [snap, itemWidth, gap]);

  return (
    <div
      ref={trackRef}
      className={`overflow-x-auto cursor-grab scroll-smooth ${dragging ? "cursor-grabbing" : ""} ${className}`}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="flex" style={{ gap }}>
        {children.map((child, i) => (
          <div
            key={i}
            className="shrink-0"
            style={{ width: itemWidth }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
