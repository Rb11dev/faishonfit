import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SITE } from "@/lib/constants/site";

const displayFont = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Considered Fashion for People in Motion`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "FaishonFit",
    "luxury fashion",
    "premium streetwear",
    "designer sportswear",
    "tailored menswear",
    "women's outerwear",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Considered Fashion for People in Motion`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Considered Fashion for People in Motion`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ClothingStore",
              name: SITE.name,
              url: SITE.url,
              description: SITE.description,
              sameAs: [
                "https://instagram.com/faishonfit",
                "https://tiktok.com/@faishonfit",
              ],
            }),
          }}
        />
        <AnnouncementBar />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CartDrawer />
      </body>
    </html>
  );
}
