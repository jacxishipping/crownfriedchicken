"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrushStroke } from "@/components/brand/BrushStroke";
import { CrownIcon } from "@/components/brand/CrownIcon";
import { RevealLines } from "@/components/brand/Reveal";
import { ORDER_URL, SITE } from "@/lib/site-config";

const FLOAT_WORDS = ["CRISPY", "JUICY", "ROYAL"] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative grain min-h-[100svh] overflow-hidden bg-[var(--black)] pt-24 sm:pt-28"
      aria-labelledby="hero-heading"
    >
      {/* Background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 30%, rgba(201,0,18,0.22), transparent 60%), radial-gradient(50% 50% at 10% 80%, rgba(242,163,58,0.12), transparent 60%)",
        }}
      />

      {/* Giant outline crown watermark behind headline — slow drift */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-4 left-1/2 z-0 hidden select-none text-[var(--white)]/[0.04] lg:block"
        style={{
          x: "-50%",
          width: "clamp(28rem, 40vw, 56rem)",
          height: "auto",
        }}
        initial={reduce ? { y: 0 } : { y: 0, rotate: -1 }}
        animate={
          reduce
            ? { y: 0 }
            : {
                y: [0, -14, 0],
                rotate: [-1, 1.5, -1],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <CrownIcon variant="outline" className="h-auto w-full" />
      </motion.div>

      {/* Faint background headline outline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] z-0 select-none text-center font-display text-[28vw] uppercase leading-none text-[var(--white)]/[0.03] sm:text-[22vw]"
      >
        Crown
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:pb-0 lg:pt-8">
        {/* LEFT — copy */}
        <motion.div
          style={{ y: reduce ? 0 : yText, opacity: reduce ? 1 : opacity }}
          className="order-2 lg:order-1 lg:col-span-6 xl:col-span-7"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex items-center gap-3"
          >
            <BrushStroke tilt={-2} variant="wide" className="text-[var(--white)]" padding="px-7 py-2">
              <span className="font-display text-[11px] uppercase tracking-[0.32em] sm:text-xs">
                The Royal Crunch
              </span>
            </BrushStroke>
            <span className="hidden text-xs uppercase tracking-[0.3em] text-[var(--white)]/40 sm:inline">
              Est. — / Fresh Daily
            </span>
          </motion.div>

          <h1
            id="hero-heading"
            className="font-display uppercase leading-[0.85] tracking-[0.01em] text-[var(--white)]"
            style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)" }}
          >
            <RevealLines
              lines={["Crown", "Fried", "Chicken"]}
              startDelay={0.15}
              delayStep={0.13}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-5 font-script text-3xl text-[var(--food-gold)] sm:text-4xl"
          >
            Crispy <span className="text-[var(--white)]/30">·</span> Juicy{" "}
            <span className="text-[var(--white)]/30">·</span>{" "}
            <span className="text-[var(--red)]">Royal</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-5 max-w-md text-sm leading-relaxed text-[var(--white)]/70 sm:text-base"
          >
            Golden, crispy fried chicken made fresh for every craving —
            big crunch, bold flavor, royal satisfaction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <BrandButton href={ORDER_URL} size="lg" variant="red" arrow aria-label={SITE.order.label}>
              Order Now
            </BrandButton>
            <BrandButton href="#menu" size="lg" variant="outline">
              View Menu
            </BrandButton>
          </motion.div>

          {/* Floating CRISPY · JUICY · ROYAL micro-labels */}
          <div
            aria-hidden
            className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-[var(--white)]/40"
          >
            <span className="h-px w-8 bg-[var(--white)]/30" />
            {FLOAT_WORDS.map((w) => (
              <span key={w} className="inline-flex items-center gap-3">
                {w}
                <span className="h-1 w-1 rounded-full bg-[var(--red)]" />
              </span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — food */}
        <div className="relative order-1 min-h-[300px] h-[40vh] sm:h-[50vh] lg:order-2 lg:col-span-6 lg:h-[80vh] xl:col-span-5">
          {/* Subtle crown behind food */}
          <CrownIcon
            className="pointer-events-none absolute -top-10 right-2 z-10 h-28 w-28 text-[var(--red)]/30 sm:-top-14 sm:right-8 sm:h-40 sm:w-40"
            variant="outline"
          />

          {/* Brush stroke behind food */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-4 top-1/3 z-0 hidden -translate-y-1/2 sm:block"
          >
            <BrushStroke tilt={-12} padding="px-12 py-14" bright>
              <span className="font-display text-2xl uppercase tracking-[0.2em] text-[var(--white)]/0">
                Crunch
              </span>
            </BrushStroke>
          </div>

          <motion.div
            style={{ y: reduce ? 0 : yImg, scale: reduce ? 1 : scaleImg }}
            initial={{ opacity: 0, scale: 1.08, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 h-full w-full overflow-hidden"
          >
            {/* Bleeds slightly off the right edge on desktop */}
            <div className="absolute inset-0 right-0 lg:-right-16">
              <img
                src="/food/hero-chicken.png"
                alt="Golden crispy fried chicken pieces — Crown Fried Chicken signature dish"
                className="h-full w-full object-cover object-center"
                loading="eager"
                fetchPriority="high"
              />
              {/* fade to black bottom */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(5,5,5,0.7) 100%), linear-gradient(270deg, transparent 70%, rgba(5,5,5,0.5) 100%)",
                }}
              />
            </div>
          </motion.div>

          {/* Price chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="absolute bottom-4 left-0 z-30 hidden items-center gap-2 border-l-2 border-[var(--red)] bg-[var(--black)]/70 px-4 py-2 backdrop-blur-md sm:flex"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--white)]/60">
              2 PC Combo
            </span>
            <span className="font-display text-2xl text-[var(--white)]">$9.50</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--white)]/40 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <span className="block h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
