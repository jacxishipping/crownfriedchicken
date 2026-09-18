"use client";

import { useEffect } from "react";

const STORAGE_KEY = "cfc_theme";

/**
 * Light/dark theme toggle for Crown Fried Chicken.
 *
 * - Default: dark (premium black background, white text).
 * - Toggled: "lunch mode" (bright white background, black text).
 * - Red accents stay the same in both modes — keeps the brand DNA consistent.
 *
 * Implementation: pure CSS class on <html> + CSS controls icon visibility.
 * No React state needed → no hydration mismatch, no set-state-in-effect.
 * An inline script in layout.tsx applies the saved class before paint.
 */
export function ThemeToggle() {
  // Keep aria-pressed in sync with the current DOM state after hydration.
  // We can't read the DOM during render (SSR), so we read it in an effect
  // that just sets an attribute — no React state involved.
  useEffect(() => {
    const root = document.documentElement;
    const btn = document.querySelector<HTMLButtonElement>("#cfc-theme-toggle");
    if (!btn) return;
    const sync = () => {
      btn.setAttribute("aria-pressed", String(root.classList.contains("lunch-mode")));
    };
    sync();
    // Re-sync whenever the class changes via the toggle.
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const isLunch = root.classList.contains("lunch-mode");
    if (isLunch) {
      root.classList.remove("lunch-mode");
      root.style.colorScheme = "dark";
      try { localStorage.setItem(STORAGE_KEY, "dark"); } catch { /* ignore */ }
    } else {
      root.classList.add("lunch-mode");
      root.style.colorScheme = "light";
      try { localStorage.setItem(STORAGE_KEY, "lunch"); } catch { /* ignore */ }
    }
  };

  return (
    <button
      id="cfc-theme-toggle"
      type="button"
      onClick={toggle}
      aria-label="Toggle light or dark theme"
      aria-pressed={false}
      title="Toggle lunch mode"
      className="relative flex h-9 w-9 items-center justify-center border border-[var(--border-soft)] bg-[var(--surface)] text-[var(--white)] transition-colors hover:border-[var(--red)]/60 hover:text-[var(--red)]"
    >
      {/* Sun icon — visible in lunch mode */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="absolute h-4 w-4 transition-all duration-300 hidden [.lunch-mode_&]:block"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>

      {/* Moon icon — visible in dark mode */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute h-4 w-4 transition-all duration-300 block [.lunch-mode_&]:hidden"
        aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    </button>
  );
}
