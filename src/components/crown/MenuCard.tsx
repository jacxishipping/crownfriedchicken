"use client";

import { motion } from "framer-motion";
import { BrandButton } from "@/components/brand/BrandButton";
import { ORDER_URL, SITE } from "@/lib/site-config";
import { useCartInteraction } from "@/lib/cart-store";
import type { MenuItem } from "./menu-data";

interface MenuCardProps {
  item: MenuItem;
}

/** Parse a price string like "$9.50" into a number (9.5). */
const parsePrice = (s: string) => parseFloat(s.replace(/[$,]/g, "")) || 0;

export function MenuCard({ item }: MenuCardProps) {
  const setHovered = useCartInteraction((s) => s.setHovered);
  const addItem = useCartInteraction((s) => s.addItem);
  const openDrawer = useCartInteraction((s) => s.openDrawer);

  /** Shared handler — adds a specific tier/single line to the cart and opens the drawer. */
  const addAndOpen = (
    name: string,
    tierLabel: string,
    priceStr: string,
    image: string,
  ) => {
    addItem({
      menuItemId: item.id,
      name,
      tierLabel,
      price: parsePrice(priceStr),
      priceDisplay: priceStr,
      image,
    });
    openDrawer();
  };

  return (
    <article
      data-cursor="hover"
      className="group relative flex h-full flex-col border border-[var(--white)]/10 bg-[var(--surface)] transition-all duration-300 hover:border-[var(--red)]/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--red)]/20"
      onMouseEnter={() => setHovered(item.id)}
      onMouseLeave={() => setHovered(null)}
      onFocusCapture={() => setHovered(item.id)}
      onBlurCapture={() => setHovered(null)}
    >
      {/* Image */}
      <div className="relative aspect-[5/4] overflow-hidden bg-[var(--black)]">
        <img
          src={item.image}
          alt={`${item.name} — Crown Fried Chicken`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />
        {/* Crown corner */}
        <span className="pointer-events-none absolute right-3 top-3 z-10 inline-flex h-6 w-6 items-center justify-center bg-[var(--red)] text-[var(--white)]">
          <svg viewBox="0 0 32 32" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
            <path d="M4 18 L9 11 L13 16 L16 8 L19 16 L23 11 L28 18 L25 26 L7 26 Z" />
          </svg>
        </span>
        {/* Hover overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(180deg, rgba(201,0,18,0.10) 0%, transparent 40%, transparent 70%, rgba(5,5,5,0.85) 100%)",
          }}
        />
        {item.startingAt && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--white)]/70">
              Starting at
            </span>
            <span className="font-display text-2xl leading-none text-[var(--white)] transition-transform duration-300 group-hover:scale-110 group-hover:text-[var(--red-bright)]">
              {item.startingAt}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl uppercase leading-none tracking-[0.04em] text-[var(--white)]">
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--white)]/55">
          {item.description}
        </p>

        {/* Prices — each tier has its own Add button */}
        <div className="mt-5 flex-1">
          {item.tiers && (
            <ul className="space-y-1.5">
              {item.tiers.map((t) => (
                <li
                  key={t.qty}
                  className="group/tier flex items-baseline gap-2 text-sm text-[var(--white)]/75"
                >
                  <span className="font-display tracking-wide text-[var(--white)]/90">
                    {t.qty}
                  </span>
                  <span className="leader" aria-hidden />
                  <span className="font-display text-[var(--food-gold)]">
                    {t.price}
                  </span>
                  {t.note && (
                    <span className="ml-2 hidden text-[11px] uppercase tracking-[0.18em] text-[var(--white)]/35 xl:inline">
                      {t.note}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => addAndOpen(item.name, t.qty, t.price, item.image)}
                    aria-label={`Add ${item.name} (${t.qty}) to cart`}
                    className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center border border-[var(--red)]/50 text-[var(--red)] transition-colors hover:bg-[var(--red)] hover:text-[var(--white)]"
                  >
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" aria-hidden>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {item.single && (
            <ul className="grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
              {item.single.map((s) => (
                <li
                  key={s.label}
                  className="group/tier flex items-baseline gap-2 text-sm text-[var(--white)]/75"
                >
                  <span className="font-display tracking-wide text-[var(--white)]/90">
                    {s.label}
                  </span>
                  <span className="leader" aria-hidden />
                  <span className="font-display text-[var(--food-gold)]">
                    {s.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => addAndOpen(item.name, s.label, s.price, item.image)}
                    aria-label={`Add ${item.name} (${s.label}) to cart`}
                    className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center border border-[var(--red)]/50 text-[var(--red)] transition-colors hover:bg-[var(--red)] hover:text-[var(--white)]"
                  >
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" aria-hidden>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Order CTA — opens cart drawer (real cart UI) */}
        <div className="mt-6 flex items-center gap-3">
          <BrandButton
            onClick={openDrawer}
            size="sm"
            variant="red"
            arrow
            className="flex-1"
            aria-label={`View cart for ${item.name}`}
          >
            View Cart
          </BrandButton>
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.3em] text-[var(--white)]/30 transition-colors hover:text-[var(--red)]"
            aria-label={`Skip to ${SITE.order.platform} directly`}
          >
            {SITE.order.platform} ↗
          </a>
        </div>
      </div>

      {/* Bottom red underline animation */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[var(--red)] transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </article>
  );
}
