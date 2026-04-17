import type { NextConfig } from "next";

const siteIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
const isProd = process.env.NODE_ENV === "production";

/**
 * Report-only CSP: logs violations in the browser console (and DevTools) without
 * blocking. Tune based on reports, then consider enforcing + nonces later.
 * Covers Next.js + Google Fonts, Tally, Donorbox, and `next/image` sources in use.
 */
function contentSecurityPolicyReportOnly(): string {
  const directives = [
    "default-src 'self'",
    [
      "script-src",
      "'self'",
      "'unsafe-inline'",
      "https://tally.so",
      "https://donorbox.org",
    ].join(" "),
    [
      "style-src",
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
    ].join(" "),
    ["font-src", "'self'", "https://fonts.gstatic.com", "data:"].join(" "),
    [
      "img-src",
      "'self'",
      "data:",
      "blob:",
      "https://lh3.googleusercontent.com",
      "https://images.unsplash.com",
      "https://plus.unsplash.com",
      "https://cdn.sanity.io",
    ].join(" "),
    [
      "connect-src",
      "'self'",
      "https://tally.so",
      "https://*.tally.so",
      "https://donorbox.org",
      "https://*.donorbox.org",
      "https://*.apicdn.sanity.io",
      "https://*.sanity.io",
    ].join(" "),
    [
      "frame-src",
      "https://tally.so",
      "https://*.tally.so",
      "https://donorbox.org",
      "https://*.donorbox.org",
      "https://www.youtube-nocookie.com",
      "https://www.youtube.com",
    ].join(" "),
    "object-src 'none'",
    "base-uri 'self'",
    [
      "form-action",
      "'self'",
      "https://tally.so",
      "https://donorbox.org",
    ].join(" "),
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ];
  return directives.join("; ");
}

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
    headers.push({
      key: "Content-Security-Policy-Report-Only",
      value: contentSecurityPolicyReportOnly(),
    });
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
    if (siteIndexable) {
      return [{ source: "/:path*", headers: base }];
    }
    return [
      {
        source: "/:path*",
        headers: [
          ...base,
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
