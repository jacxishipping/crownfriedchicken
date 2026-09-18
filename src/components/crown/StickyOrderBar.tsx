"use client";

import { useEffect, useRef, useState } from "react";
import { BrandButton } from "@/components/brand/BrandButton";
import { CrownMini } from "@/components/brand/CrownIcon";
import { ORDER_URL, SITE } from "@/lib/site-config";

/**
 * Sticky mobile-only ORDER NOW bar fixed to the bottom of the viewport.
 *
 * - Hidden on md+ screens (the desktop navbar's ORDER NOW is always visible there).
 * - Slides in once the user has scrolled past the hero (~420px).
 * - Hides again when the user reaches the Location section so we don't double-CTA
 *   against the in-section Order Online / Get Directions / Call Now cards.
 * - Respects iOS safe-area-inset-bottom for proper iPhone notched-device spacing.
 * - Honors prefers-reduced-motion by skipping the transition (ref-driven, not state).
 */
export function StickyOrderBar() {
  const barRef = useRef<HTMLDivElement | null>(null);
  // visibility state — derived from scroll position, gated to avoid spamming setState
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        // Show once the user has scrolled past the hero.
        const pastHero = window.scrollY > 420;

        // Hide when the Location section is in view (in-page CTAs become visible).
        const loc = document.getElementById("location");
        let inLocation = false;
        if (loc) {
          const rect = loc.getBoundingClientRect();
          inLocation = rect.top < window.innerHeight * 0.6;
        }

        setVisible(pastHero && !inLocation);
      });
    };

    // Apply the reduced-motion class directly via ref to avoid
    // the set-state-in-effect anti-pattern.
    const bar = barRef.current;
    if (bar) {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const apply = () => {
        if (mq.matches) bar.classList.add("no-motion");
        else bar.classList.remove("no-motion");
      };
      apply();
      mq.addEventListener?.("change", apply);
      const cleanup = () => mq.removeEventListener?.("change", apply);
      update();
      window.addEventListener("scroll", update, { passive: true });
      return () => {
        window.removeEventListener("scroll", update);
        cleanup();
      };
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      } [&.no-motion]:transition-none transition-transform duration-300 ease-out`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!visible}
      // Make it non-interactive when hidden so it doesn't trap keyboard focus
      inert={visible ? undefined : ""}
    >
      <div className="flex items-stretch border-t border-[var(--red)]/50 bg-[var(--black)]/95 backdrop-blur-md">
        {/* Crown + label */}
        <div className="flex items-center gap-2 px-4">
          <CrownMini className="h-5 w-5 text-[var(--red)]" />
          <span className="font-display text-sm uppercase tracking-[0.18em] text-white/85">
            Crown
          </span>
        </div>

        {/* CTA */}
        <div className="flex-1 py-2.5 pl-1 pr-3">
          <BrandButton
            href={ORDER_URL}
            size="md"
            variant="red"
            arrow
            className="w-full"
            aria-label={SITE.order.label}
            tabIndex={visible ? 0 : -1}
          >
            Order Now
          </BrandButton>
        </div>
      </div>
    </div>
  );
}
