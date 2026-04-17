import type { NextConfig } from "next";

const siteIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
const isProd = process.env.NODE_ENV === "production";

function securityHeaders(): { key: string; value: string }[] {
  const headers: { key: string; value: string }[] = [
    { key: "X-DNS-Prefetch-Control", value: "on" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=()",
    },
  ];
  if (isProd) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    });
    // CSP report-only without `report-to` / `report-uri` only spams the console
    // and has no effect. Re-add `Content-Security-Policy-Report-Only` or enforce
    // `Content-Security-Policy` when you have a collector endpoint or nonces.
  }
  return headers;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async headers() {
    const base = securityHeaders();
    const adminNoCache = [
      {
        key: "Cache-Control",
        value: "private, no-store, must-revalidate, max-age=0",
      },
      { key: "Vary", value: "Cookie" },
    ];
    if (siteIndexable) {
      return [
        { source: "/:path*", headers: base },
        { source: "/admin", headers: adminNoCache },
        { source: "/admin/:path*", headers: adminNoCache },
      ];
    }
    return [
      {
        source: "/:path*",
        headers: [
          ...base,
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      { source: "/admin", headers: adminNoCache },
      { source: "/admin/:path*", headers: adminNoCache },
    ];
  },
};

export default nextConfig;
