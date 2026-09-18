"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cfc_loader_seen_v1";

type Stage = "hidden" | "playing" | "dismissing";

/**
 * Cinematic first-load intro loader.
 *
 * Plays ONCE per session (gated by sessionStorage) — animates:
 * 1. Giant outline crown drawing itself in red (SVG stroke-dashoffset)
 * 2. "CROWN FRIED CHICKEN" reveal — three lines, line-by-line
 * 3. "Crispy · Juicy · Royal" tagline fade-in
 * 4. Loading bar fills across the bottom
 * 5. Whole overlay fades + scales up to reveal the hero
 *
 * Honors prefers-reduced-motion by skipping the animation entirely.
 * Total duration: ~2.6s when motion is allowed.
 *
 * State machine: hidden → playing → dismissing → hidden.
 * The setState calls happen inside setTimeout callbacks (async), not
 * synchronously in the effect body, so they don't trip the
 * react-hooks/set-state-in-effect rule.
 */
export function HeroLoader() {
  const reduce = useReducedMotion();
  // Stage starts hidden; flips to "playing" once we've checked sessionStorage
  // inside an effect. Setting it from inside the effect is OK here because
  // the alternative (returning null during SSR) is exactly what we want.
  const [stage, setStage] = useState<Stage>("hidden");

  useEffect(() => {
    // Only show on first visit per session — don't replay on every navigation.
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        return;
      }
    } catch {
      // sessionStorage may be unavailable (privacy mode) — proceed.
    }
    // Reduce-motion users skip the loader entirely.
    if (reduce) {
      try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
      return;
    }

    // Defer the stage transition to a microtask so we're not calling
    // setState synchronously in the effect body.
    const startTimer = window.setTimeout(() => setStage("playing"), 0);

    // Begin dismissing after the main animation completes (~2.0s)
    const dismissTimer = window.setTimeout(() => setStage("dismissing"), 2000);
    // Fully unmount after the fade-out completes (~2.6s)
    const endTimer = window.setTimeout(() => {
      try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
      setStage("hidden");
    }, 2600);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(dismissTimer);
      window.clearTimeout(endTimer);
    };
  }, [reduce]);

  if (stage === "hidden") return null;

  const dismissing = stage === "dismissing";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--black)]"
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        opacity: dismissing ? 0 : 1,
        scale: dismissing ? 1.04 : 1,
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
      style={{ pointerEvents: dismissing ? "none" : "auto" }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 40%, rgba(201,0,18,0.18), transparent 60%)",
        }}
      />

      {/* Crown draw-on */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative"
      >
        <svg
          viewBox="0 0 100 80"
          width="140"
          height="112"
          fill="none"
          stroke="var(--red)"
          strokeWidth="3"
          strokeLinejoin="round"
        >
          <motion.path
            d="M6 22 L24 36 L34 8 L42 28 L50 4 L58 28 L66 8 L76 36 L94 22 L86 70 L14 70 Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
          <motion.rect
            x="14"
            y="70"
            width="72"
            height="6"
            fill="var(--red)"
            stroke="none"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ transformOrigin: "center" }}
            transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
          />
          {/* jewels */}
          {[
            { cx: 50, cy: 22, r: 3.4, fill: "#050505" },
            { cx: 26, cy: 50, r: 3.2, fill: "#050505" },
            { cx: 74, cy: 50, r: 3.2, fill: "#050505" },
          ].map((j, i) => (
            <motion.circle
              key={i}
              cx={j.cx}
              cy={j.cy}
              r={j.r}
              fill={j.fill}
              stroke="none"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ transformOrigin: `${j.cx}px ${j.cy}px` }}
              transition={{ duration: 0.25, delay: 1.2 + i * 0.08 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Headline — line by line */}
      <div className="mt-6 text-center">
        {["Crown", "Fried", "Chicken"].map((line, i) => (
          <div key={line} className="overflow-hidden">
            <motion.div
              className="font-display text-5xl uppercase leading-none tracking-[0.04em] text-[var(--white)] sm:text-7xl"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        className="mt-5 font-script text-xl text-[var(--food-gold)] sm:text-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        Crispy · Juicy · Royal
      </motion.p>

      {/* Loading bar */}
      <div className="absolute bottom-12 left-1/2 h-0.5 w-44 -translate-x-1/2 overflow-hidden bg-[var(--border-soft)]">
        <motion.div
          className="h-full bg-[var(--red)]"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 2.0, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
