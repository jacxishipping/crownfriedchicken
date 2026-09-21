"use client";

import { create } from "zustand";

export interface CartItem {
  /** Composite key: `${menuItemId}::${tierLabel}` — uniquely identifies a cart line. */
  key: string;
  /** The menu item id, e.g. "fried-chicken". Used to look up image/description. */
  menuItemId: string;
  /** Display name, e.g. "Fried Chicken". */
  name: string;
  /** Specific tier label, e.g. "2 PC" or "Shrimp Basket w/ Fry". */
  tierLabel: string;
  /** Numeric price in USD (for math). */
  price: number;
  /** Display-formatted price, e.g. "$9.50". */
  priceDisplay: string;
  /** Image path for the line item. */
  image: string;
  /** Line quantity. */
  qty: number;
}

interface CartInteractionState {
  /** The menu item id currently being hovered (drives the ViewCart pill pulse). */
  hoveredItemId: string | null;
  /** Real cart items (one per unique menu item + tier combination). */
  items: CartItem[];
  /** Whether the slide-in cart drawer is open. */
  isDrawerOpen: boolean;

  /** Set the currently-hovered menu item id (or null on mouseleave). */
  setHovered: (id: string | null) => void;

  /** Add a specific tier of a menu item to the cart. If the line already exists, qty++. */
  addItem: (item: Omit<CartItem, "key" | "qty">) => void;
  /** Remove an entire line from the cart. */
  removeItem: (key: string) => void;
  /** Adjust a line's quantity by `delta` (clamped to ≥0; removes line if it hits 0). */
  updateQty: (key: string, delta: number) => void;
  /** Empty the cart entirely. */
  clear: () => void;

  /** Open the cart drawer. */
  openDrawer: () => void;
  /** Close the cart drawer. */
  closeDrawer: () => void;
  /** Toggle the cart drawer. */
  toggleDrawer: () => void;
}

/**
 * Cart store — drives both the ViewCart pill (hoveredItemId + total count) and
 * the slide-in CartDrawer (items, drawer open state).
 *
 * Total count is computed in selectors (no need to store it) — see
 * `useCartCount` and `useCartSubtotal` helpers below.
 */
export const useCartInteraction = create<CartInteractionState>((set) => ({
  hoveredItemId: null,
  items: [],
  isDrawerOpen: false,

  setHovered: (id) => set({ hoveredItemId: id }),

  addItem: (item) =>
    set((s) => {
      const key = `${item.menuItemId}::${item.tierLabel}`;
      const existing = s.items.find((i) => i.key === key);
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.key === key ? { ...i, qty: i.qty + 1 } : i,
          ),
        };
      }
      return {
        items: [...s.items, { ...item, key, qty: 1 }],
      };
    }),

  removeItem: (key) =>
    set((s) => ({ items: s.items.filter((i) => i.key !== key) })),

  updateQty: (key, delta) =>
    set((s) => ({
      items: s.items
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    })),

  clear: () => set({ items: [] }),

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((s) => ({ isDrawerOpen: !s.isDrawerOpen })),
}));

/** Convenience selector: total item count in the cart. */
export const useCartCount = () =>
  useCartInteraction((s) => s.items.reduce((n, i) => n + i.qty, 0));

/** Convenience selector: cart subtotal in USD. */
export const useCartSubtotal = () =>
  useCartInteraction((s) =>
    s.items.reduce((sum, i) => sum + i.price * i.qty, 0),
  );

