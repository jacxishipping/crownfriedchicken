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
    };

    const tick = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      const c = containerRef.current;
      if (ring && dot && c) {
        const { x, y } = posRef.current;
        const scale = hoveringRef.current ? 1.6 : 1;
        ring.style.transform = `translate(${x - 14}px, ${y - 14}px) scale(${scale})`;
        dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
        c.style.opacity = "1";
      }
      rafId = requestAnimationFrame(tick);
    };

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
