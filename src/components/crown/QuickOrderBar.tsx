"use client";

import { Marquee } from "@/components/brand/Marquee";
import { BrandButton } from "@/components/brand/BrandButton";
import { ORDER_URL, SITE } from "@/lib/site-config";

const ICONS = [
  { emoji: "🍗", label: "Chicken" },
  { emoji: "🍟", label: "Fries" },
  { emoji: "🔥", label: "Hot Wings" },
  { emoji: "🐟", label: "Tilapia" },
  { emoji: "🦐", label: "Seafood" },
  { emoji: "🥤", label: "Drinks" },
];

export function QuickOrderBar() {
  return (
    <section
      id="order"
      className="relative z-30 border-y border-[var(--red)]/40 bg-[var(--black-soft)]"
      aria-label="Quick order"
    >
      <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[auto_1fr_auto]">
        {/* Left label */}
        <div className="flex items-center gap-4 border-b border-white/5 px-5 py-4 lg:border-b-0 lg:border-r">
          <span className="font-display text-3xl uppercase leading-none text-white sm:text-4xl">
            Hungry?
          </span>
          <span className="hidden text-xs uppercase tracking-[0.3em] text-white/50 sm:inline">
            Order your favorites
          </span>
        </div>

        {/* Marquee icons */}
        <div className="flex items-center bg-[var(--red)]/5 py-3">
          <Marquee
            speed="normal"
            items={ICONS.map((i) => (
              <span
                key={i.label}
                className="inline-flex items-center gap-2 font-display text-lg uppercase tracking-[0.18em] text-white"
              >
                <span className="text-2xl" aria-hidden>
                  {i.emoji}
                </span>
                {i.label}
              </span>
            ))}
          />
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center px-5 py-3 lg:border-l">
          <BrandButton href={ORDER_URL} size="md" variant="red" arrow className="w-full lg:w-auto" aria-label={SITE.order.label}>
            Order Now
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
