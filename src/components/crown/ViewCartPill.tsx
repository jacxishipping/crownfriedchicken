"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCartCount, useCartInteraction } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

/**
 * Sticky "View Cart" pill that sits in the desktop navbar.
 *
 * - Always visible on md+ screens (hidden on mobile where the sticky ORDER bar takes over).
 * - Pulses (scale + red glow) whenever the user is hovering a menu card,
 *   suggesting "add to cart" — driven by the cart-interaction Zustand store.
 * - Clicking opens the slide-in CartDrawer (instead of jumping to DoorDash).
 * - Shows a shopping-bag SVG and a live item count (sums qty across all lines).
 */
export function ViewCartPill() {
  const hovered = useCartInteraction((s) => s.hoveredItemId);
  const count = useCartCount();
  const openDrawer = useCartInteraction((s) => s.openDrawer);

  const isPulsing = !!hovered;

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={`View cart${count > 0 ? ` (${count} items)` : ""}`}
      aria-haspopup="dialog"
      className={cn(
        "group relative hidden md:inline-flex h-10 items-center gap-2 border border-[var(--border-soft)] bg-[var(--surface)] px-3.5 font-display text-xs uppercase tracking-[0.22em] text-[var(--white)]/85 transition-colors hover:border-[var(--red)]/60 hover:bg-[var(--red)]/10",
        isPulsing && "border-[var(--red)]/80 bg-[var(--red)]/15",
      )}
    >
      {/* Pulse glow */}
      <AnimatePresence>
        {isPulsing && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            style={{
              boxShadow: "0 0 0 2px rgba(201,0,18,0.45), 0 0 24px rgba(201,0,18,0.55)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Bag icon */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        className="h-4 w-4"
        animate={isPulsing ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <path d="M6 7h12l-1.2 13.2a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8L6 7Z" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </motion.svg>

      <span>Cart</span>

      {/* Count chip — keyed on count so it re-animates each time it changes */}
      <motion.span
        key={count}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="ml-0.5 inline-flex h-5 min-w-[20px] items-center justify-center bg-[var(--red)] px-1.5 text-[10px] font-bold leading-none text-white"
      >
        {count > 99 ? "99+" : count}
      </motion.span>
    </button>
  );
}
