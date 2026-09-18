"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  /** Direction the section's content slides in from. */
  direction?: "up" | "down" | "left" | "right";
  /** Initial delay before the section starts revealing. */
  delay?: number;
  /** Duration of the entrance animation. */
  duration?: number;
  className?: string;
  /** Optional id to apply to the wrapping section (for nav anchor targeting). */
  id?: string;
  /** Amount of the section that needs to be visible before the reveal triggers. */
  amount?: number;
  /** Apply a subtle scale (1.02 → 1) in addition to the slide. */
  withScale?: boolean;
}

const OFFSET: Record<
  "up" | "down" | "left" | "right",
  { x?: number; y?: number }
> = {
  up: { y: 80 },
  down: { y: -80 },
  left: { x: -80 },
  right: { x: 80 },
};

/**
 * Cinematic scroll-triggered section transition.
 *
 * Wraps a full section in a single motion.section that fades + slides (+ optional
 * scales) when the section scrolls into view. Used in place of a plain <section>
 * for major page sections to give a more dramatic, Awwwards-style entrance.
 *
 * Honors prefers-reduced-motion (renders a plain <section> with no animation).
 *
 * Pairs well with the existing <Reveal> component for fine-grained per-element
 * reveals inside the section.
 */
export function SectionTransition({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  className,
  id,
  amount = 0.2,
  withScale = true,
}: SectionTransitionProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  const offset = OFFSET[direction];

  return (
    <motion.section
      id={id}
      className={className}
      initial={{
        opacity: 0,
        x: offset.x ?? 0,
        y: offset.y ?? 0,
        scale: withScale ? 1.02 : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.section>
  );
}
