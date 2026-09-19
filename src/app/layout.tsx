import type { Metadata } from "next";
import { Anton, Bebas_Neue, Inter, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE, SITE_URL } from "@/lib/site-config";
import { SmoothScroll } from "@/components/brand/SmoothScroll";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Bolder script for the tagline — marker-pen character matches the
// menu's hand-painted red brush-stroke labels perfectly.
const permanentMarker = Permanent_Marker({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Crown Fried Chicken | Crispy · Juicy · Royal",
  description:
    "Crown Fried Chicken — crispy fried chicken, wings, seafood, tilapia, fries and more. Order your favorites today.",
  applicationName: SITE.brand.name,
  keywords: [
    "Crown Fried Chicken",
    "fried chicken",
    "buffalo wings",
    "hot wings",
    "chicken nuggets",
    "seafood platters",
    "tilapia",
    "sides",
    "fast food",
    "order chicken online",
  ],
  authors: [{ name: SITE.brand.name }],
  creator: SITE.brand.name,
  publisher: SITE.brand.name,
  icons: {
    icon: "/crown.svg",
    shortcut: "/crown.svg",
    apple: "/crown.svg",
  },
  openGraph: {
    title: "Crown Fried Chicken | Crispy · Juicy · Royal",
    description:
      "Crown Fried Chicken — crispy fried chicken, wings, seafood, tilapia, fries and more. Order your favorites today.",
    url: SITE_URL,
    siteName: SITE.brand.name,
    images: [
      {
        url: "/og-share.png",
        width: 1200,
        height: 630,
        alt: "Crown Fried Chicken — Crispy · Juicy · Royal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crown Fried Chicken | Crispy · Juicy · Royal",
    description:
      "Crown Fried Chicken — crispy fried chicken, wings, seafood, tilapia, fries and more. Order your favorites today.",
    images: ["/og-share.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: SITE_URL },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE.brand.name,
  description:
    "Crown Fried Chicken — crispy fried chicken, wings, seafood, tilapia, fries and more.",
  slogan: SITE.brand.tagline,
  image: `${SITE_URL}/food/hero-chicken.png`,
  url: SITE_URL,
  servesCuisine: ["American", "Fried Chicken", "Seafood", "Fast Food"],
  priceRange: "$$",
  acceptsReservations: "false",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.location.streetAddress,
    addressLocality: SITE.location.addressLocality,
    addressRegion: SITE.location.addressRegion,
    postalCode: SITE.location.postalCode,
    addressCountry: SITE.location.addressCountry,
  },
  telephone: SITE.location.phoneE164,
  openingHours: SITE.location.hoursSpec,
  hasMenu: `${SITE_URL}/#menu`,
  potentialAction: {
    "@type": "OrderAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: SITE.order.url,
      actionPlatform: SITE.order.platform,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        {/* Apply saved theme before paint to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('cfc_theme');if(t==='lunch'){document.documentElement.classList.add('lunch-mode');document.documentElement.style.colorScheme='light';}}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${anton.variable} ${bebas.variable} ${inter.variable} ${permanentMarker.variable} antialiased`}
        style={{ background: "var(--black)", color: "var(--white)" }}
      >
        <SmoothScroll />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
