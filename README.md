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
- Navbar (desktop + mobile drawer)
- Hero, QuickOrderBar, all MenuCards, SpecialOffer, Footer
- Location cards (address / phone / hours)
- Google Maps iframe embed
- `tel:` and `mailto:` links
- Restaurant JSON-LD schema (rich results)
- OpenGraph + Twitter card metadata

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
