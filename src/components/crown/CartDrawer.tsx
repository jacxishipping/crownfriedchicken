"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import { BrandButton } from "@/components/brand/BrandButton";
import { CrownIcon } from "@/components/brand/CrownIcon";
import {
  ORDER_URL,
  SITE,
} from "@/lib/site-config";
import {
  SALES_TAX_RATE,
  useCartInteraction,
  useCartSubtotal,
} from "@/lib/cart-store";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

/**
 * Slide-in cart drawer.
 *
 * - Slides in from the right (300ms ease-out).
 * - Backdrop dims the page; click backdrop or press Escape to close.
 * - Body scroll locked while open.
 * - Focus trap: focus moves to the close button on open, Tab cycles within the drawer.
 * - ARIA dialog semantics (role="dialog" aria-modal aria-labelledby).
 * - Empty state with "Browse the menu" CTA.
 * - Line items with qty steppers + remove (×) buttons.
 * - Footer with subtotal, NYC tax (8.875%), and "Checkout on DoorDash" CTA.
 */
export function CartDrawer() {
  const isOpen = useCartInteraction((s) => s.isDrawerOpen);
  const items = useCartInteraction((s) => s.items);
  const closeDrawer = useCartInteraction((s) => s.closeDrawer);
  const removeItem = useCartInteraction((s) => s.removeItem);
  const updateQty = useCartInteraction((s) => s.updateQty);

  const subtotal = useCartSubtotal();
  const tax = subtotal * SALES_TAX_RATE;
  const total = subtotal + tax;

  const titleId = useId();
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Body scroll lock + Escape key handler.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
      }
      // Basic focus trap: keep Tab within the drawer.
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex="0"]',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    // Move focus to the close button on open.
    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial="closed"
          animate="open"
          exit="closed"
          aria-hidden={!isOpen}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={closeDrawer}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
            variants={{
              open: { opacity: 1 },
              closed: { opacity: 0 },
            }}
            transition={{ duration: 0.25 }}
            tabIndex={-1}
          />

          {/* Panel */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[var(--black)] shadow-2xl"
            variants={{
              open: { x: 0 },
              closed: { x: "100%" },
            }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-5 py-4">
              <div className="flex items-center gap-2.5">
                <CrownIcon className="h-6 w-6 text-[var(--red)]" />
                <h2
                  id={titleId}
                  className="font-display text-xl uppercase tracking-[0.08em] text-[var(--white)]"
                >
                  Your Crown
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center text-[var(--white)]/70 transition-colors hover:text-[var(--red)]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <CrownIcon variant="outline" className="h-16 w-16 text-[var(--red)]/30" />
                  <p className="mt-4 font-display text-2xl uppercase tracking-[0.08em] text-[var(--white)]">
                    Your cart is empty
                  </p>
                  <p className="mt-2 text-sm text-[var(--white)]/55">
                    Add some crispy goodness from the menu — your royal feast awaits.
                  </p>
                  <div className="mt-6">
                    <BrandButton onClick={closeDrawer} size="md" variant="red" arrow>
                      Browse the Menu
                    </BrandButton>
                  </div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.key}
                      className="flex gap-3 border border-[var(--border-soft)] bg-[var(--surface)] p-3"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-black">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Info + qty */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-display text-base uppercase leading-tight tracking-[0.04em] text-[var(--white)]">
                              {item.name}
                            </h3>
                            <p className="text-xs uppercase tracking-[0.22em] text-[var(--white)]/55">
                              {item.tierLabel}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            aria-label={`Remove ${item.name} (${item.tierLabel}) from cart`}
                            className="text-[var(--white)]/40 transition-colors hover:text-[var(--red)]"
                          >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                              <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Qty stepper */}
                          <div className="flex items-center border border-[var(--border-soft)]">
                            <button
                              type="button"
                              onClick={() => updateQty(item.key, -1)}
                              aria-label={`Decrease ${item.name} quantity`}
                              className="flex h-7 w-7 items-center justify-center text-[var(--white)] transition-colors hover:bg-[var(--red)]/15 hover:text-[var(--red)]"
                            >
                              <span aria-hidden>−</span>
                            </button>
                            <span
                              className="min-w-[2rem] text-center font-display text-sm text-[var(--white)]"
                              aria-label={`Quantity ${item.qty}`}
                            >
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.key, 1)}
                              aria-label={`Increase ${item.name} quantity`}
                              className="flex h-7 w-7 items-center justify-center text-[var(--white)] transition-colors hover:bg-[var(--red)]/15 hover:text-[var(--red)]"
                            >
                              <span aria-hidden>+</span>
                            </button>
                          </div>
                          <span className="font-display text-lg text-[var(--food-gold)]">
                            {fmt(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[var(--border-soft)] bg-[var(--surface)] px-5 py-4">
                {/* Totals */}
                <dl className="space-y-1.5 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-[var(--white)]/60">Subtotal</dt>
                    <dd className="font-display text-[var(--white)]">{fmt(subtotal)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-[var(--white)]/60">Tax (8.875%)</dt>
                    <dd className="font-display text-[var(--white)]">{fmt(tax)}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--border-soft)] pt-2">
                    <dt className="font-display text-base uppercase tracking-[0.1em] text-[var(--white)]">
                      Total
                    </dt>
                    <dd className="font-display text-xl text-[var(--red)]">{fmt(total)}</dd>
                  </div>
                </dl>

                <div className="mt-4">
                  <BrandButton
                    href={ORDER_URL}
                    size="lg"
                    variant="red"
                    arrow
                    className="w-full"
                    aria-label={`Checkout on ${SITE.order.platform}`}
                  >
                    Checkout on {SITE.order.platform}
                  </BrandButton>
                </div>
                <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-[var(--white)]/35">
                  Final totals confirmed at checkout
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
