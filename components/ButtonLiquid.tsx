"use client";

import { useState, useId } from "react";

interface ButtonLiquidProps {
  children: string;
  href?: string;
  className?: string;
}

export default function ButtonLiquid({ children, href, className = "" }: ButtonLiquidProps) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const uid = useId();
  const filterId = `liquid-${uid.replace(/[:$]/g, "")}`;

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 500);
  };

  const content = (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className={`liquid-btn relative overflow-hidden inline-flex items-center justify-center ${className}`}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={hovered ? "0.03" : "0.01"}
              numOctaves="3"
              result="noise"
              seed={clicked ? "5" : "1"}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={hovered ? (clicked ? 25 : 15) : 0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <span
        className="relative z-10 transition-all duration-200"
        style={{
          filter: hovered ? `url(#${filterId})` : "none",
        }}
      >
        {children}
      </span>
      {hovered && (
        <>
          <span
            className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-violet-500/10 transition-all duration-300"
            style={{
              filter: `url(#${filterId})`,
            }}
          />
          {clicked && (
            <>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-emerald-400/40 pointer-events-none"
                  style={{
                    top: `${30 + Math.random() * 40}%`,
                    left: `${30 + Math.random() * 40}%`,
                    animation: `ripple-drop 0.6s ease-out ${i * 0.08}s forwards`,
                  }}
                />
              ))}
            </>
          )}
        </>
      )}
    </span>
  );

  if (href) {
    return (
      <a href={href} data-cursor="button">
        {content}
      </a>
    );
  }

  return <span data-cursor="button">{content}</span>;
}
