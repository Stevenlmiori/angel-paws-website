import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

/** Set `NEXT_PUBLIC_SITE_INDEXABLE=true` in Vercel when the site should appear in search. */
const siteIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

export const metadata: Metadata = {
  title: {
    default: "Angel Paws Pet Therapy",
    template: "%s · Angel Paws Pet Therapy",
  },
  description:
    "Faith-based pet therapy ministry in Greater Houston—hope and comfort through the love of therapy dogs.",
  openGraph: {
    title: "Angel Paws Pet Therapy",
    description:
      "Faith-based pet therapy ministry in Greater Houston—hope and comfort through the love of therapy dogs.",
    locale: "en_US",
    type: "website",
  },
  robots: siteIndexable
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
};

/** AngelPaws Serif — light-first; match DESIGN.md */
export const viewport: Viewport = {
  themeColor: "#4784f2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${notoSerif.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container">
        <SiteHeader />
        <main className="flex min-h-full flex-1 flex-col pt-20 md:pt-24">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
