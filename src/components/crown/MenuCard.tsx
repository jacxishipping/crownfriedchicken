"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  // Awwwards-style 3D Tilt & Spotlight Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    damping: 30,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    damping: 30,
    stiffness: 200,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Normalize coordinates to [-0.5, 0.5]
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setHovered(null);
    mouseX.set(0);
    mouseY.set(0);
  };

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

  const spotlightBackground = useMotionTemplate`radial-gradient(
    600px circle at ${useTransform(mouseX, (v) => (v + 0.5) * 100)}% ${useTransform(
    mouseY,
    (v) => (v + 0.5) * 100
  )}%,
    rgba(201,0,18,0.15),
    transparent 80%
  )`;

  return (
    <div style={{ perspective: "1000px", height: "100%" }}>
      <motion.article
        data-cursor="hover"
        className="group relative flex h-full flex-col rounded-2xl border border-[var(--white)]/10 bg-[#0a0a0a] backdrop-blur-md transition-colors duration-500 hover:border-[var(--red)]/40 hover:shadow-2xl hover:shadow-[var(--red)]/10"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(item.id)}
        onMouseLeave={handleMouseLeave}
        onFocusCapture={() => setHovered(item.id)}
        onBlurCapture={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Spotlight Overlay & Clip */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlightBackground }}
          />
        </div>

        {/* Image */}
      <div className="relative aspect-[5/4] overflow-hidden rounded-t-2xl bg-[var(--black)]" style={{ transform: "translateZ(30px)" }}>
        <img
          src={item.image}
          alt={`${item.name} — Crown Fried Chicken`}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
        {/* Image Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-80" />

        {/* Crown corner badge */}
        <span className="pointer-events-none absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--red)]/90 text-[var(--white)] shadow-lg shadow-[var(--red)]/30 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
          <svg viewBox="0 0 32 32" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
            <path d="M4 18 L9 11 L13 16 L16 8 L19 16 L23 11 L28 18 L25 26 L7 26 Z" />
          </svg>
        </span>
        {item.startingAt && (
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md border border-white/10">
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
      <div className="flex flex-1 flex-col p-6 z-10" style={{ transform: "translateZ(40px)" }}>
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
                    className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--red)]/50 text-[var(--red)] transition-all duration-300 hover:scale-110 hover:bg-[var(--red)] hover:text-[var(--white)] hover:shadow-lg hover:shadow-[var(--red)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:ring-offset-2 focus:ring-offset-black"
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
                    className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--red)]/50 text-[var(--red)] transition-all duration-300 hover:scale-110 hover:bg-[var(--red)] hover:text-[var(--white)] hover:shadow-lg hover:shadow-[var(--red)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:ring-offset-2 focus:ring-offset-black"
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
      {/* Bottom glowing line animation */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1 origin-center scale-x-0 bg-gradient-to-r from-transparent via-[var(--red)] to-transparent opacity-80 transition-transform duration-700 ease-out group-hover:scale-x-100"
        style={{
          boxShadow: "0 -2px 10px rgba(201, 0, 18, 0.5)",
        }}
      />
    </motion.article>
    </div>
  );
}
