"use client";

import { type ReactNode } from "react";

interface DeviceFrameProps {
  children?: ReactNode;
  type?: "phone" | "tablet" | "laptop" | "desktop";
  className?: string;
  color?: string;
}

const scales: Record<string, string> = {
  phone: "aspect-[9/19.5] max-w-[260px]",
  tablet: "aspect-[4/3] max-w-[400px]",
  laptop: "aspect-[16/10] max-w-[600px]",
  desktop: "aspect-[16/9] max-w-[800px]",
};

export default function DeviceFrame({
  children,
  type = "laptop",
  className = "",
  color = "#1a1a2e",
}: DeviceFrameProps) {
  return (
    <div className={`mx-auto ${className}`}>
      <div
        className={`relative rounded-[12px] overflow-hidden border-2 border-zinc-700/50 shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${scales[type]}`}
        style={{ backgroundColor: color }}
      >
        {type === "phone" && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-2xl z-10" />
        )}
        {type === "laptop" && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[110%] h-3 bg-zinc-800 rounded-b-lg" />
        )}
        <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm">
          {children || (
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[10px] opacity-40">Preview</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
