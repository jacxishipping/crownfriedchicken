"use client";

import { BrandButton } from "@/components/brand/BrandButton";
import { BrushStroke } from "@/components/brand/BrushStroke";
import { CrownMini } from "@/components/brand/CrownIcon";
import { Reveal } from "@/components/brand/Reveal";
import { StarDivider } from "@/components/brand/StarDivider";
import {
  DIRECTIONS_URL,
  FULL_ADDRESS,
  HOURS_SUMMARY,
  MAP_EMBED_URL,
  ORDER_URL,
  PHONE_DISPLAY,
  PHONE_E164,
  SITE,
} from "@/lib/site-config";

const INFO = [
  {
    label: "Address",
    value: [SITE.location.streetAddress, `${SITE.location.addressLocality}, ${SITE.location.addressRegion} ${SITE.location.postalCode}`],
    actions: [
      { label: "Get Directions", href: DIRECTIONS_URL, variant: "red" as const },
    ],
  },
  {
    label: "Phone",
    value: [PHONE_DISPLAY],
    actions: [{ label: "Call Now", href: `tel:${PHONE_E164}`, variant: "outline" as const }],
  },
  {
    label: "Hours",
    value: [HOURS_SUMMARY, "Mon – Sun"],
    actions: [{ label: "Order Online", href: ORDER_URL, variant: "red" as const }],
  },
];

export function Location() {
  return (
    <section
      id="location"
      className="relative overflow-hidden border-t border-[var(--white)]/5 bg-[var(--black)] py-20 sm:py-28"
      aria-labelledby="location-heading"
    >
      {/* Background subtle red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 50% at 80% 30%, rgba(201,0,18,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="flex flex-col items-center text-center">
            <BrushStroke tilt={-1.5} padding="px-6 py-1.5">
              <span className="font-display text-xs uppercase tracking-[0.3em] text-[var(--white)]">
                Find the Crown
              </span>
            </BrushStroke>
            <h2
              id="location-heading"
              className="mt-6 font-display uppercase leading-[0.9] tracking-[0.01em] text-[var(--white)]"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              Come Get Your Crown.
            </h2>
            <StarDivider className="mt-6" withCrowns />
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {INFO.map((card, i) => (
            <Reveal key={card.label} direction="up" delay={i * 0.1}>
              <div className="group relative flex h-full flex-col items-center border border-[var(--white)]/10 bg-[var(--surface)] p-8 text-center transition-colors hover:border-[var(--red)]/60">
                <CrownMini className="h-5 w-5 text-[var(--red)]" />
                <span className="mt-4 text-[10px] uppercase tracking-[0.4em] text-[var(--white)]/40">
                  {card.label}
                </span>
                <div className="mt-3 space-y-1">
                  {card.value.map((line) => (
                    <p
                      key={line}
                      className="font-display text-xl uppercase tracking-[0.05em] text-[var(--white)]"
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  {card.actions.map((a) => (
                    <BrandButton
                      key={a.label}
                      href={a.href}
                      size="sm"
                      variant={a.variant}
                      arrow
                    >
                      {a.label}
                    </BrandButton>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Real Google Maps embed — works without an API key */}
        <Reveal direction="up" delay={0.1}>
          <div className="relative aspect-[16/7] w-full overflow-hidden border border-[var(--white)]/10 bg-[var(--surface)]">
            <iframe
              src={MAP_EMBED_URL}
              title={`Map showing Crown Fried Chicken at ${FULL_ADDRESS}`}
              className="absolute inset-0 h-full w-full"
              style={{ border: 0, filter: "grayscale(0.4) contrast(1.05) brightness(0.85)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {/* Brand pin overlay (purely decorative — the iframe already shows the real pin) */}
            <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2 bg-[var(--black)]/80 px-3 py-1.5 backdrop-blur-md">
              <CrownMini className="h-4 w-4 text-[var(--red)]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--white)]">
                Crown · {SITE.location.addressLocality}
              </span>
            </div>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 bg-[var(--red)] px-4 py-2 font-display text-xs uppercase tracking-[0.22em] text-[var(--white)] transition-colors hover:bg-[var(--red-bright)]"
            >
              Get Directions
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="square" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
