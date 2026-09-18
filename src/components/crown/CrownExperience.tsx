"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrushStroke } from "@/components/brand/BrushStroke";
import { CrownIcon } from "@/components/brand/CrownIcon";
import { Reveal } from "@/components/brand/Reveal";

export function CrownExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--black)] py-0"
      aria-labelledby="experience-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT — food image */}
        <div className="relative min-h-[60vh] lg:min-h-[80vh]">
          <motion.div
            style={{ y }}
            className="absolute inset-0"
          >
            <img
              src="/food/chicken-only.png"
              alt="Close-up of golden crispy fried chicken pieces"
              className="h-[110%] w-full object-cover"
              loading="lazy"
            />
            {/* Vignette */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 60%, rgba(5,5,5,0.9) 100%), linear-gradient(180deg, rgba(5,5,5,0.3) 0%, transparent 30%, rgba(5,5,5,0.4) 100%)",
              }}
            />
          </motion.div>

          {/* Small floating label */}
          <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
            <CrownIcon className="h-6 w-6 text-[var(--red)]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/70">
              Crown · Signature
            </span>
          </div>
        </div>

        {/* RIGHT — copy on black */}
        <div className="relative flex flex-col justify-center bg-[var(--black)] px-6 py-16 sm:px-12 lg:py-24">
          {/* Red brush stroke label */}
          <Reveal direction="up">
            <BrushStroke tilt={-2} padding="px-6 py-2">
              <span className="font-display text-xs uppercase tracking-[0.32em] text-white">
                The Crown Experience
              </span>
            </BrushStroke>
          </Reveal>

          <Reveal direction="up" delay={0.05}>
            <h2
              id="experience-heading"
              className="mt-6 font-display uppercase leading-[0.88] tracking-[0.01em] text-white"
              style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
            >
              Crispy.
              <br />
              Juicy.
              <br />
              <span className="text-[var(--red)]">Royal.</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              From crispy chicken and hot wings to seafood, sides and ice-cold
              drinks, Crown Fried Chicken brings serious flavor to every order
              — fried fresh, served hot, built to satisfy.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.25}>
            <div className="mt-8">
              <BrandButton href="#menu" size="lg" variant="red" arrow>
                Explore the Menu
              </BrandButton>
            </div>
          </Reveal>

          {/* Decorative number */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-12 right-0 select-none font-display text-[12rem] leading-none text-white/[0.03]"
          >
            01
          </span>
        </div>
      </div>
    </section>
  );
}
