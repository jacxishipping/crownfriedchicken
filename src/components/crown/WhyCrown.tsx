"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BrushStroke } from "@/components/brand/BrushStroke";
import { Reveal } from "@/components/brand/Reveal";
import { StarDivider } from "@/components/brand/StarDivider";
import { CrownMini } from "@/components/brand/CrownIcon";

const PILLARS = [
  {
    word: "Crispy",
    sub: "Hand-breaded, fried fresh",
  },
  {
    word: "Juicy",
    sub: "Locked-in flavor in every bite",
  },
  {
    word: "Fresh",
    sub: "Made to order, never sitting",
  },
  {
    word: "Royal",
    sub: "Crown-worthy satisfaction",
  },
] as const;

export function WhyCrown() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Parallax the food image
  const yImg = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden border-y border-[var(--white)]/5 bg-[var(--black)] py-20 sm:py-28"
      aria-labelledby="why-heading"
    >
      {/* Background crown watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 select-none text-[var(--red)]/[0.04] lg:block"
        style={{ fontSize: "32rem", lineHeight: 1 }}
      >
        ♛
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <Reveal direction="up">
          <div className="flex flex-col items-start">
            <BrushStroke tilt={-2} padding="px-6 py-1.5" bright>
              <span className="font-display text-xs uppercase tracking-[0.3em] text-[var(--white)]">
                Why Crown
              </span>
            </BrushStroke>
            <h2
              id="why-heading"
              className="mt-6 max-w-3xl font-display uppercase leading-[0.9] tracking-[0.01em] text-[var(--white)]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
            >
              Why Settle for Ordinary?
            </h2>
          </div>
        </Reveal>

        {/* Pillars grid with interleaved image */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-px bg-[var(--white)]/5 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.word}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col justify-between bg-[var(--black)] p-8"
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[var(--white)]/30">
                    <span>0{i + 1}</span>
                    <span className="h-px flex-1 bg-[var(--white)]/10" />
                    <CrownMini className="h-3 w-3 text-[var(--red)]" />
                  </div>
                  <h3
                    className="mt-6 font-display uppercase leading-none text-[var(--white)] transition-colors group-hover:text-[var(--red)]"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                  >
                    {p.word}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--white)]/55">{p.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interleaved food image */}
          <div className="relative lg:col-span-5">
            <motion.div
              style={{ y: yImg }}
              className="relative aspect-[3/4] w-full overflow-hidden border border-[var(--white)]/10"
            >
              <img
                src="/food/crispy-closeup.png"
                alt="Macro shot of crispy golden fried chicken crust"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.9) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5">
                <StarDivider className="mb-3" />
                <p className="text-center text-xs uppercase tracking-[0.3em] text-[var(--white)]/60">
                  Close-up of the crunch
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Copy */}
        <Reveal direction="up">
          <p className="mx-auto mt-14 max-w-2xl text-center text-base leading-relaxed text-[var(--white)]/70 sm:text-lg">
            Every bite is made to deliver the crunch, flavor and satisfaction
            you expect from Crown — fried fresh the moment you order, seasoned
            with purpose, and served hot.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
