"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BrandButton } from "@/components/brand/BrandButton";
import { CrownIcon } from "@/components/brand/CrownIcon";
import { SITE, ORDER_URL } from "@/lib/site-config";
import { ViewCartPill } from "./ViewCartPill";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = SITE.nav;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--black)]/95 backdrop-blur-md border-b border-[var(--red)]/40"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label="Crown Fried Chicken — home"
        >
          <CrownIcon
            className={cn(
              "h-7 w-7 transition-colors",
              scrolled ? "text-[var(--red)]" : "text-[var(--red)]",
            )}
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg uppercase tracking-[0.12em] text-[var(--white)]">
              Crown
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--white)]/60">
              Fried Chicken
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="nav-underline text-xs font-semibold uppercase tracking-[0.22em] text-[var(--white)]/80 transition-colors hover:text-[var(--white)]"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA + theme toggle + mobile toggle */}
        <div className="flex items-center gap-3">
          <ViewCartPill />
          <ThemeToggle />
          <BrandButton href={ORDER_URL} size="sm" variant="red" arrow className="hidden sm:inline-flex" aria-label={SITE.order.label}>
            Order Now
          </BrandButton>
          <button
            className="flex h-10 w-10 items-center justify-center text-[var(--white)] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-4 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-6 bg-[var(--white)] transition-all duration-300",
                  open && "top-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-6 bg-[var(--white)] transition-all duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-3 h-0.5 w-6 bg-[var(--white)] transition-all duration-300",
                  open && "top-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-[var(--white)]/5 bg-[var(--black)]/98 backdrop-blur-md transition-[max-height,opacity] duration-300",
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-6">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-[var(--white)]/5 py-3 font-display text-2xl uppercase tracking-[0.08em] text-[var(--white)]/90 hover:text-[var(--red)]"
            >
              {l.label}
            </Link>
          ))}
          <BrandButton
            href={ORDER_URL}
            size="md"
            variant="red"
            arrow
            className="mt-4 w-full"
            aria-label={SITE.order.label}
            onClick={() => setOpen(false)}
          >
            Order Now
          </BrandButton>
        </div>
      </div>
    </header>
  );
}
