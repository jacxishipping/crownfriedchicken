"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrushStroke } from "@/components/brand/BrushStroke";
import { CrownIcon } from "@/components/brand/CrownIcon";
import { CrownMini } from "@/components/brand/CrownIcon";
import { Reveal } from "@/components/brand/Reveal";
import { StarDivider } from "@/components/brand/StarDivider";
import { CATEGORIES, itemsFor, type CategoryId } from "./menu-data";
import { MenuCard } from "./MenuCard";

export function SignatureMenu() {
  const [active, setActive] = useState<CategoryId>("all");
  const items = useMemo(() => itemsFor(active), [active]);

  return (
    <section
      id="menu"
      className="relative bg-[var(--black)] py-16 sm:py-20"
      aria-labelledby="menu-heading"
    >
      {/* Giant crown watermark behind the menu */}
      <CrownIcon
        aria-hidden
        variant="outline"
        className="pointer-events-none absolute -top-20 right-[8%] z-0 hidden select-none text-[var(--red)]/[0.05] lg:block"
        style={{ width: "clamp(20rem, 30vw, 36rem)", height: "auto" }}
      />

      {/* Decorative side line */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 hidden h-32 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[var(--red)] to-transparent lg:block"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <Reveal direction="up">
          <div className="flex flex-col items-center text-center">
            <BrushStroke tilt={-1.5} variant="wide" padding="px-7 py-2">
              <span className="font-display text-xs uppercase tracking-[0.32em] text-white">
                The Crown Favorites
              </span>
            </BrushStroke>

            <h2
              id="menu-heading"
              className="mt-5 font-display uppercase leading-[0.9] tracking-[0.01em] text-white"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              Big Flavor.
              <br />
              <span className="text-[var(--red)]">Crispy Perfection.</span>
            </h2>

            <StarDivider withCrowns className="mt-5" />

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
              Every item on the Crown menu is fried fresh to order. From the
              signature fried chicken to seafood platters and the sides that
              round out the table — pick your crunch.
            </p>
          </div>
        </Reveal>

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                aria-pressed={isActive}
                className="relative px-4 py-2 font-display text-sm uppercase tracking-[0.22em] transition-colors sm:text-base"
              >
                <span
                  className={
                    isActive ? "text-white" : "text-white/45 hover:text-white/80"
                  }
                >
                  {c.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 -z-10 bg-[var(--red)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 -z-10 border border-white/10" />
                )}
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <MenuCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footnote */}
        <Reveal direction="up" delay={0.1}>
          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/30">
              <CrownMini className="h-3 w-3 text-[var(--red)]" />
              Crown · Fresh · Daily
              <CrownMini className="h-3 w-3 text-[var(--red)]" />
            </div>
            <p className="max-w-md text-xs text-white/40">
              Prices shown in USD. Availability and pricing may vary by
              location — please confirm at order.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
