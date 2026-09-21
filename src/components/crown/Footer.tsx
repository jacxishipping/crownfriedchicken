"use client";

import Link from "next/link";
import Image from "next/image";
import { BrandButton } from "@/components/brand/BrandButton";
import { Marquee } from "@/components/brand/Marquee";
import { StarDivider } from "@/components/brand/StarDivider";
import {
  CONTACT_EMAIL,
  FULL_ADDRESS,
  HOURS_SUMMARY,
  ORDER_URL,
  PHONE_DISPLAY,
  PHONE_E164,
  SITE,
  SITE_URL,
} from "@/lib/site-config";

const NAV = SITE.nav;
const SOCIALS = SITE.social;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--black)] pt-20">
      {/* Giant crown watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 select-none text-[var(--red)]/[0.04]"
        style={{ fontSize: "40rem", lineHeight: 0.8 }}
      >
        ♛
      </div>

      {/* Top marquee */}
      <div className="border-y border-[var(--white)]/10 py-3">
        <Marquee
          speed="slow"
          items={[
            "Crispy · Juicy · Royal",
            SITE.brand.name,
            "Fried Fresh",
            "Order Now",
            "Big Crunch",
            "Bold Flavor",
          ].map((t) => (
            <span
              key={t}
              className="font-display text-2xl uppercase tracking-[0.18em] text-[var(--white)]/70 sm:text-3xl"
            >
              {t}
            </span>
          ))}
          separator={
            <span className="mx-6 inline-block h-2 w-2 rotate-45 bg-[var(--red)]" />
          }
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {/* Center brand */}
        <div className="flex flex-col items-center pt-16 text-center">
          <Image
            src="/logo.png"
            alt="Crown Fried Chicken"
            width={240}
            height={150}
            className="object-contain"
          />
          <StarDivider className="mt-6" withCrowns />

          <div className="mt-8">
            <BrandButton href={ORDER_URL} size="lg" variant="red" arrow aria-label={SITE.order.label}>
              Order Now
            </BrandButton>
          </div>
        </div>

        {/* Links */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-[var(--white)]/10 pt-10 md:grid-cols-4">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[var(--white)]/40">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="nav-underline text-sm text-[var(--white)]/75 transition-colors hover:text-[var(--white)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[var(--white)]/40">
              Visit
            </h3>
            <p className="mt-4 text-sm text-[var(--white)]/75">{SITE.location.streetAddress}</p>
            <p className="text-sm text-[var(--white)]/75">
              {SITE.location.addressLocality}, {SITE.location.addressRegion}{" "}
              {SITE.location.postalCode}
            </p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[var(--white)]/40">
              Hours
            </p>
            <p className="text-sm text-[var(--white)]/75">{HOURS_SUMMARY}</p>
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[var(--white)]/40">
              Contact
            </h3>
            <a
              href={`tel:${PHONE_E164}`}
              className="nav-underline mt-4 inline-block text-sm text-[var(--white)]/75 hover:text-[var(--white)]"
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="nav-underline mt-1 block text-sm text-[var(--white)]/75 hover:text-[var(--white)]"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[var(--white)]/40">
              Follow
            </p>
            <ul className="mt-2 flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.2em] text-[var(--white)]/60 transition-colors hover:text-[var(--red)]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[var(--white)]/40">
              The Crown
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[var(--white)]/55">
              Fried fresh, seasoned bold, served hot. Crown Fried Chicken —
              street-food energy with a royal crunch.
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[var(--white)]/30">
              Order on {SITE.order.platform}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--white)]/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--white)]/40">
            © {new Date().getFullYear()} {SITE.brand.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-[var(--white)]/40">
            <a href={`${SITE_URL}/privacy`} className="hover:text-[var(--white)]/80">
              Privacy
            </a>
            <span className="h-1 w-1 rounded-full bg-[var(--red)]" />
            <a href={`${SITE_URL}/terms`} className="hover:text-[var(--white)]/80">
              Terms
            </a>
            <span className="h-1 w-1 rounded-full bg-[var(--red)]" />
            <a href={`${SITE_URL}/accessibility`} className="hover:text-[var(--white)]/80">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
