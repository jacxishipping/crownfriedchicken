/**
 * ───────────────────────────────────────────────────────────────────────
 *  CROWN FRIED CHICKEN · SITE CONFIG
 * ───────────────────────────────────────────────────────────────────────
 *  Edit this single file to update address, phone, hours, ordering URL,
 *  Google Maps embed, social links, and SEO URL across the entire site.
 *
 *  All other components import from here — no need to hunt for placeholders.
 * ───────────────────────────────────────────────────────────────────────
 */

export const SITE = {
  /** Canonical production URL (used for SEO/OpenGraph). */
  url: "https://www.crownfriedchicken.com",

  brand: {
    name: "Crown Fried Chicken",
    tagline: "Crispy · Juicy · Royal",
  },

  /** Online ordering — replace with your real DoorDash / Toast / Shopify URL. */
  order: {
    /** The actual URL users land on when they click ORDER NOW. */
    url: "#menu",
    /** DoorDash is the default platform; change to "toast" | "shopify" | "custom". */
    platform: "Crown",
    /** Display label used in tooltips / accessibility. */
    label: "Order Online",
  },

  location: {
    /** Street address — used in footer, location cards, and SEO schema. */
    streetAddress: "1247 Fulton Street",
    addressLocality: "Brooklyn",
    addressRegion: "NY",
    postalCode: "11216",
    addressCountry: "US",

    /** Pretty-printed full address (used in footer). */
    get fullAddress() {
      return `${this.streetAddress}, ${this.addressLocality}, ${this.addressRegion} ${this.postalCode}`;
    },

    /** Phone in E.164 for SEO; pretty version for display. */
    phoneE164: "+17185550199",
    phoneDisplay: "(718) 555-0199",

    /** Hours summary used in footer + cards. */
    hoursSummary: "Mon–Sun · 10:00 AM – 2:00 AM",

    /** Detailed hours for SEO LocalBusiness schema (24-hr weekday notation). */
    hoursSpec: [
      "Mo-Su 10:00-02:00",
    ],

    /**
     * Google Maps embed URL — works without an API key.
     * Format: https://maps.google.com/maps?q=<query>&output=embed
     * Replace with your own embed URL from Google Maps → Share → Embed.
     */
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Crown+Fried+Chicken+1247+Fulton+St+Brooklyn+NY&output=embed",

    /** "Get Directions" deep link — opens Google Maps turn-by-turn. */
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Crown+Fried+Chicken+1247+Fulton+St+Brooklyn+NY+11216",
  },

  contact: {
    /** General email shown in the footer. */
    email: "hello@crownfriedchicken.com",
  },

  social: [
    { label: "Instagram", href: "https://instagram.com/crownfriedchicken" },
    { label: "TikTok",   href: "https://tiktok.com/@crownfriedchicken" },
    { label: "Facebook",  href: "https://facebook.com/crownfriedchicken" },
    { label: "X",         href: "https://x.com/crownfried" },
  ],

  nav: [
    { label: "Menu",      href: "#menu" },
    { label: "About",     href: "#about" },
    { label: "Specials",  href: "#specials" },
    { label: "Location",  href: "#location" },
    { label: "Contact",   href: "#location" },
  ],
} as const;

/** Convenience exports so components can import only what they need. */
export const ORDER_URL = SITE.order.url;
export const PHONE_DISPLAY = SITE.location.phoneDisplay;
export const PHONE_E164 = SITE.location.phoneE164;
export const FULL_ADDRESS = SITE.location.fullAddress;
export const HOURS_SUMMARY = SITE.location.hoursSummary;
export const MAP_EMBED_URL = SITE.location.mapEmbedUrl;
export const DIRECTIONS_URL = SITE.location.directionsUrl;
export const CONTACT_EMAIL = SITE.contact.email;
export const SITE_URL = SITE.url;
