"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "red" | "outline" | "ghost" | "gold";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface BrandButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  arrow?: boolean;
  children: React.ReactNode;
}

const sizeMap: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
  xl: "h-16 px-10 text-base sm:text-lg",
};

const variantMap: Record<ButtonVariant, string> = {
  red: "bg-[var(--red)] text-white hover:bg-[var(--red-bright)]",
  outline:
    "bg-transparent text-white border border-white/60 hover:border-white hover:bg-white hover:text-black",
  ghost: "bg-transparent text-white hover:bg-white/5",
  gold: "bg-[var(--food-gold)] text-black hover:brightness-110",
};

/**
 * The signature ORDER NOW button — tactile, sharp corners,
 * slight grow on hover, arrow slides right.
 */
export const BrandButton = React.forwardRef<
  HTMLButtonElement,
  BrandButtonProps
>(function BrandButton(
  { className, variant = "red", size = "md", href, arrow, children, ...props },
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
    "transition-[transform,background-color,color] duration-300 ease-out",
    "active:translate-y-px",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "uppercase font-display",
    sizeMap[size],
    variantMap[variant],
    className,
  );

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={classes}
        // typescript: brand button props include onClick etc — forward to anchor
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} {...props}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 ease-out group-hover:translate-x-0"
      />
      {inner}
    </button>
  );
});
