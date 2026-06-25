import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { DEFAULT_KEYWORDS, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import { siteUnderConstruction } from "@/lib/siteFlags";
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

const underConstruction = siteUnderConstruction();

export const metadata: Metadata = {
  /** Match production traffic (www); host-only cookies set on www are not sent on apex. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Angel Paws Pet Therapy provides faith-based therapy dog visits for hospitals, schools, senior care communities, churches, workplaces, and crisis response across Greater Houston.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Pet therapy nonprofit",
  keywords: DEFAULT_KEYWORDS,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description:
      "Faith-based therapy dog visits for hospitals, schools, senior care communities, and community partners across Greater Houston.",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Faith-based therapy dog visits for hospitals, schools, and care communities in Greater Houston.",
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots:
    siteIndexable && !underConstruction
      ? { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
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
        {underConstruction ? (
          children
        ) : (
          <>
            <JsonLd />
            <SiteHeader />
            <main className="flex flex-col pt-20 md:pt-24">
              {children}
            </main>
            <SiteFooter />
          </>
        )}
      </body>
    </html>
  );
}
