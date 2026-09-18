"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrushStroke } from "@/components/brand/BrushStroke";
import { CrownIcon } from "@/components/brand/CrownIcon";
import { Reveal } from "@/components/brand/Reveal";
import { StarDivider } from "@/components/brand/StarDivider";
import { ORDER_URL, SITE } from "@/lib/site-config";

export function SpecialOffer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section
      id="specials"
      ref={ref}
      className="relative overflow-hidden bg-[var(--black)] py-24 sm:py-32"
      aria-labelledby="specials-heading"
    >
      {/* Background image (billboard) */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <img
          src="/food/billboard.png"
          alt="A dramatic pile of golden fried chicken and fries"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.55) 50%, rgba(5,5,5,0.85) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="flex flex-col items-center">
            <BrushStroke tilt={-2} padding="px-7 py-2.5" variant="wide" bright>
              <span className="font-display text-xs uppercase tracking-[0.32em] text-[var(--white)]">
                Specials
              </span>
            </BrushStroke>

            <CrownIcon
              className="mt-8 h-12 w-12 text-[var(--red)]"
              variant="outline"
            />

            <h2
              id="specials-heading"
              className="mt-6 font-display uppercase leading-[0.85] tracking-[0.01em] text-[var(--white)]"
              style={{ fontSize: "clamp(3.5rem, 14vw, 11rem)" }}
            >
              Hungry
              <span className="text-[var(--red)]"> Yet?</span>
            </h2>

            <p className="mt-4 font-script text-3xl text-[var(--food-gold)] sm:text-4xl">
              Your next craving is waiting.
            </p>

            <StarDivider withCrowns className="mt-8" />

            <div className="mt-10">
              <BrandButton href={ORDER_URL} size="xl" variant="red" arrow aria-label={SITE.order.label}>
                Order Now
              </BrandButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
