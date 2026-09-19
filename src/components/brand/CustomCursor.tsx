"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only custom cursor: a small red ring with a center dot
 * that follows the pointer. Hidden on touch / small screens.
 * Honors prefers-reduced-motion.
 *
 * Pure ref + rAF implementation — no React state involved, so we
 * avoid the set-state-in-effect anti-pattern entirely. The element
 * is rendered into the DOM but starts off-screen.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLSpanElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hoveringRef = useRef(false);
  const textHoveringRef = useRef(false);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!canHover || reduceMotion) return;

    let rafId = 0;
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      const t = e.target as HTMLElement | null;
      hoveringRef.current = !!t?.closest(
        'a,button,[data-cursor="hover"],[role="button"]',
      );

      const isText = !!t?.closest('p, h1, h2, h3, h4, h5, h6, span:not([role="button"]):not([class*="cursor"])');
      textHoveringRef.current = isText && !hoveringRef.current;
    };

    const tick = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      const c = containerRef.current;
      if (ring && dot && c) {
        const { x, y } = posRef.current;

        let ringScale = 1;
        let ringOpacity = 1;
        let dotScaleX = 1;
        let dotScaleY = 1;
        let dotOpacity = 1;

        if (hoveringRef.current) {
          ringScale = 2.5;
          dotScaleX = 0;
          dotScaleY = 0;
        } else if (textHoveringRef.current) {
          ringOpacity = 0;
          dotScaleX = 0.2;
          dotScaleY = 3.5;
        }

        ring.style.transform = `translate(${x - 14}px, ${y - 14}px) scale(${ringScale})`;
        ring.style.opacity = `${ringOpacity}`;

        dot.style.transform = `translate(${x - 3}px, ${y - 3}px) scale(${dotScaleX}, ${dotScaleY})`;
        dot.style.opacity = `${dotOpacity}`;

        c.style.opacity = "1";
      }
      rafId = requestAnimationFrame(tick);
    };

    if (ringRef.current && dotRef.current) {
        ringRef.current.style.transition = 'transform 0.1s ease-out';
        dotRef.current.style.transition = 'transform 0.1s ease-out';
    }

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{ willChange: "transform", opacity: 0 }}
    >
      <span
        ref={ringRef}
        className="absolute block h-7 w-7 rounded-full border-2 border-[var(--red)]"
        style={{ boxShadow: "0 0 18px rgba(201,0,18,0.5)" }}
      />
      <span
        ref={dotRef}
        className="absolute block h-1.5 w-1.5 rounded-full bg-[var(--red)]"
      />
    </div>
  );
}
