"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SPECIALS = [
  "Free side with any 6 PC combo — today only",
  "Try our new Hot Wings — 15 PC for $18",
  "Order 2+ combos, get a free drink",
  "Crispy · Juicy · Royal — fresh fried daily",
  "Limited time: 35 PC Chicken Only — $55",
] as const;

const DISMISS_KEY = "cfc_special_dismissed_v1";

/**
 * Rotating "Today's Special" banner at the very top of the navbar.
 *
 * - Red strip with bold uppercase white text.
 * - Rotates between a curated list of promotional messages every 4 seconds
 *   with a fade + slide transition.
 * - Dismissible via the × button — persisted to localStorage so it stays
 *   hidden for the rest of the session.
 * - Auto-restores if localStorage is cleared (defaults to visible).
 */
export function TodaySpecial() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Restore dismissed state from sessionStorage on mount.
  // Deferred to a microtask to avoid the set-state-in-effect anti-pattern;
  // the initial state ("visible: true") matches the SSR render, so there's
  // no hydration mismatch — we just gate the visible-to-false transition
  // behind a setTimeout(0).
  useEffect(() => {
    let cancelled = false;
    const t = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem(DISMISS_KEY) === "1" && !cancelled) {
          setVisible(false);
        }
      } catch { /* ignore */ }
    }, 0);
    return () => { cancelled = true; window.clearTimeout(t); };
  }, []);

  // Rotate specials every 4s.
  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % SPECIALS.length),
      4000,
    );
    return () => window.clearInterval(id);
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch { /* ignore */ }
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Today's special"
      className="relative z-[55] flex items-center justify-center gap-3 bg-[var(--red)] px-4 py-2 text-center text-[var(--white)]"
    >
      {/* Small crown icon on the left */}
      <svg
        viewBox="0 0 32 32"
        className="hidden h-3.5 w-3.5 shrink-0 text-[var(--white)]/90 sm:block"
        fill="currentColor"
        aria-hidden
      >
        <path d="M4 18 L9 11 L13 16 L16 8 L19 16 L23 11 L28 18 L25 26 L7 26 Z" />
      </svg>

      {/* Rotating message */}
      <div className="relative min-h-[1.25rem] flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-semibold uppercase tracking-[0.28em] sm:text-xs"
          >
            {SPECIALS[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Star icon on the right */}
      <svg
        viewBox="0 0 24 24"
        className="hidden h-3 w-3 shrink-0 text-[var(--white)]/90 sm:block"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 2l3 7h7l-6 4.5 2.5 8L12 17l-6.5 4.5L8 13.5 2 9h7z" />
      </svg>

      {/* Dismiss × */}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss today's special banner"
        className="absolute right-2 flex h-7 w-7 items-center justify-center text-[var(--white)]/70 transition-colors hover:text-[var(--white)]"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
