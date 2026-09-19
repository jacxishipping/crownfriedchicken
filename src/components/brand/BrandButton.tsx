"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

type ButtonVariant = "red" | "outline" | "ghost" | "gold";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface BrandButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  arrow?: boolean;
  /** When true (or when href is external), opens in a new tab. */
  target?: string;
  /** When target is set, defaults to "noopener noreferrer". */
  rel?: string;
  children: React.ReactNode;
}

const sizeMap: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
  xl: "h-16 px-10 text-base sm:text-lg",
};

const variantMap: Record<ButtonVariant, string> = {
  red: "bg-[var(--red)] text-[var(--white)] hover:bg-[var(--red-bright)]",
  outline:
    "bg-transparent text-[var(--white)] border border-[var(--white)]/60 hover:border-[var(--white)] hover:bg-[var(--white)] hover:text-[var(--black)]",
  ghost: "bg-transparent text-[var(--white)] hover:bg-[var(--white)]/5",
  gold: "bg-[var(--food-gold)] text-[var(--black)] hover:brightness-110",
};

/**
 * The signature ORDER NOW button — tactile, sharp corners,
 * slight grow on hover, arrow slides right.
 */
export const BrandButton = React.forwardRef<
  HTMLButtonElement,
  BrandButtonProps
>(function BrandButton(
  { className, variant = "red", size = "md", href, arrow, target, rel, children, ...props },
  ref,
) {
  const inner = (
    <span className="relative z-10 inline-flex items-center gap-2.5 font-display uppercase tracking-[0.18em] leading-none">
      {children}
      {arrow && (
        <svg
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="square" />
        </svg>
      )}
    </span>
  );

  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden",
    "transition-[background-color,color] duration-300 ease-out",
    "active:translate-y-px",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "uppercase font-display",
    sizeMap[size],
    variantMap[variant],
    className,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = containerRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Auto-detect external links so they open in a new tab safely — keeps the
  // menu visible (and the cart count incrementing) when users click Order.
  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);
  const finalTarget = target ?? (isExternal ? "_blank" : undefined);
  const finalRel = rel ?? (finalTarget === "_blank" ? "noopener noreferrer" : undefined);

  if (href !== undefined) {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className="relative inline-block"
      >
        <motion.div
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
          <Link
            href={href}
            className={classes}
            target={finalTarget}
            rel={finalRel}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-[110%] skew-x-[15deg] bg-[var(--white)]/15 transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:skew-x-0"
            />
            {inner}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="relative inline-block"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <button ref={ref} className={classes} {...props}>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-[110%] skew-x-[15deg] bg-[var(--white)]/15 transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:skew-x-0"
          />
          {inner}
        </button>
      </motion.div>
    </div>
  );
});
