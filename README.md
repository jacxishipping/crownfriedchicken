# CROWN FRIED CHICKEN

> Crispy · Juicy · Royal — a premium, Awwwards-tier restaurant landing page.

Built with **Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, and shadcn/ui**.

---

## Quick Start

```bash
# 1. Install deps (bun recommended — also works with npm/pnpm/yarn)
bun install

# 2. Start the dev server
bun run dev

# 3. Open the site
# http://localhost:3000
```

> **Node 18+** required. If you don't have bun: `npm i -g bun` or just use `npm install && npm run dev`.

---

## What's Inside

```
src/
├── app/
│   ├── layout.tsx        # Brand fonts (Anton / Bebas / Inter / Permanent Marker)
│   │                     # + SEO metadata + Restaurant JSON-LD schema
│   ├── page.tsx          # Composes all 10 sections + CustomCursor + StickyOrderBar
│   └── globals.css       # Design system: CSS vars, brush-stroke masks, grain, marquee
│
├── components/
│   ├── brand/            # Reusable brand primitives
│   │   ├── CrownIcon.tsx     # Inline SVG crown (filled / outline / mini)
│   │   ├── BrushStroke.tsx   # Red hand-painted brush stroke behind labels
│   │   ├── StarDivider.tsx   # ★ CROWN ★ divider motif
│   │   ├── BrandButton.tsx   # Signature ORDER NOW button
│   │   ├── Marquee.tsx        # Infinite horizontal marquee
│   │   ├── Reveal.tsx         # Scroll-triggered fade/slide reveals
│   │   └── CustomCursor.tsx   # Desktop-only red ring cursor (rAF-driven)
│   │
│   └── crown/            # Page sections
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── QuickOrderBar.tsx
│       ├── SignatureMenu.tsx   # Filterable category tabs + AnimatePresence cards
│       ├── MenuCard.tsx
│       ├── WhyCrown.tsx
│       ├── CrownExperience.tsx
│       ├── SpecialOffer.tsx
│       ├── Location.tsx         # Real Google Maps embed + 3 info cards
│       ├── StickyOrderBar.tsx   # Mobile-only sticky bottom CTA
│       ├── Footer.tsx
│       └── menu-data.ts        # All menu items + exact prices
│
└── lib/
    ├── site-config.ts    # ← EDIT THIS to update address/phone/hours/order URL
    └── utils.ts

public/
├── crown.svg             # Brand crown SVG (logo)
├── crown-mini.svg       # Inline mini crown
├── brush-stroke.svg     # Default red brush-stroke mask
├── brush-stroke-wide.svg  # Alternate wider brush-stroke mask
├── food/                # 15 cinematic AI-generated food photographs
└── robots.txt

scripts/
└── generate-food-images.sh   # Reproducible food image generation
```

---

## Customizing

All editable business data lives in **one file**: `src/lib/site-config.ts`

```ts
export const SITE = {
  url: "https://www.crownfriedchicken.com",

  order: {
    url: "https://www.doordash.com/store/crown-fried-chicken-new-york",
    platform: "DoorDash",
    label: "Order on DoorDash",
  },

  location: {
    streetAddress: "1247 Fulton Street",
    addressLocality: "Brooklyn",
    addressRegion: "NY",
    postalCode: "11216",
    addressCountry: "US",
    phoneE164: "+17185550199",
    phoneDisplay: "(718) 555-0199",
    hoursSummary: "Mon–Sun · 10:00 AM – 2:00 AM",
    mapEmbedUrl: "https://maps.google.com/maps?q=...&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=...",
    // ...
  },
  // ...
}
```

Updates flow automatically to:
- Navbar (desktop + mobile drawer) + ViewCart pill + ThemeToggle
- Hero, QuickOrderBar, all MenuCards (auto target=_blank on external order links), SpecialOffer, Footer
- Location cards (address / phone / hours)
- Google Maps iframe embed
- `tel:` and `mailto:` links
- Restaurant JSON-LD schema (rich results)
- OpenGraph + Twitter card metadata (uses `/og-share.png`)

---

## Cinematic Features

- **Hero loader** — plays once per session: red crown draws itself via SVG stroke-dashoffset, brand name reveals line-by-line, tagline fades in, loading bar fills, then the whole overlay fades + scales up to reveal the hero. Skipped entirely when `prefers-reduced-motion` is set.
- **Drifting hero crown** — the giant outline-crown watermark behind the headline floats on a 14s loop (subtle y-drift + micro-rotation).
- **View Cart pill + Cart Drawer** — desktop navbar pill that pulses (red glow + scale) whenever the user hovers a menu card, driven by a Zustand store. Clicking opens a slide-in cart drawer with line items, qty steppers, subtotal/tax/total breakdown, and a "Checkout on DoorDash" CTA. Body scroll locked, Escape closes, focus trap active, backdrop click dismisses.
- **Per-tier "Add" buttons** — each menu card's price tier has its own `+` button. Clicking adds that specific tier to the cart and opens the drawer.
- **Today's Special banner** — red rotating promotional strip at the very top of the navbar. Cycles through 5 curated specials every 4s with a fade+slide transition. Dismissible (× button, sessionStorage-persisted).
- **Section transitions** — major page sections (Why Crown, Crown Experience, Special Offer, Location) wrap in `<SectionTransition>` for cinematic entrance (fade + slide + subtle scale) when scrolled into view. Honors `prefers-reduced-motion`.
- **Light/dark theme toggle** — "Lunch mode" flips the entire palette: premium black → bright white, while red accents stay the same. FOUC-preventing inline script in `layout.tsx` applies the saved theme before paint.
- **Custom cursor** — desktop-only red ring cursor (rAF-driven, no set-state-in-effect), hidden on touch.
- **Sticky mobile ORDER NOW bar** — slides in past the hero, hides at the Location section, respects iOS safe-area.
- **Standalone Lottie animation** — `/public/lottie/crown-draw.json` (1.5s, 5 shape layers, 100×80 canvas) is a reusable Lottie file of the crown-drawing animation. Drop into any Lottie player (web, mobile, email) for brand-consistent motion branding.

---

## Brand System

| Token        | Value      | Used for                            |
|--------------|------------|-------------------------------------|
| `--black`    | `#050505`  | Background                          |
| `--red`      | `#C90012`  | CTAs, brush strokes, accents        |
| `--dark-red` | `#8F000B`  | Hover states, scrollbar             |
| `--white`    | `#FFFFFF`  | Primary text                        |
| `--soft-white` | `#F4F4F4` | Secondary text                    |
| `--food-gold` | `#F2A33A` | Tagline + price chips              |

Fonts (loaded via `next/font/google`):
- **Anton** — display headlines
- **Bebas Neue** — alt display
- **Inter** — body copy
- **Permanent Marker** — script tagline (bold marker-pen feel)

---

## Performance / Accessibility

- Lazy-loaded food photography below the fold
- `prefers-reduced-motion` honored throughout (cursor, drift, sticky bar, reveals)
- Semantic landmarks, ARIA labels, focus-visible rings, keyboard nav
- iOS safe-area insets respected on sticky bar
- Restaurant JSON-LD + OpenGraph + Twitter card for SEO

---

## License

Project assets (food photos, brand graphics) generated for this demo. Replace with your own licensed assets before deploying to production.
