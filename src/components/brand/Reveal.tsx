"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset = (d: Direction): { x?: number; y?: number } => {
  switch (d) {
    case "up":    return { y: 48 };
    case "down":  return { y: -48 };
    case "left":  return { x: -48 };
    case "right": return { x: 48 };
    case "none":  return {};
  }
};

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

/** Simple scroll-triggered fade/slide reveal. */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
  once = true,
  amount = 0.3,
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, ...offset(direction) }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

/** Reveal each line of a headline in sequence. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delayStep = 0.12,
  startDelay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delayStep?: number;
  startDelay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={lineClassName ? `block ${lineClassName}` : "block"}
            initial={reduce ? { opacity: 0 } : { y: "110%" }}
            whileInView={reduce ? { opacity: 1 } : { y: 0 }}
            transition={{
              duration: 0.85,
              delay: startDelay + i * delayStep,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
