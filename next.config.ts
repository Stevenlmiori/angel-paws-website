import type { NextConfig } from "next";

const siteIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
const isProd = process.env.NODE_ENV === "production";

function contentSecurityPolicy(): string {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "form-action 'self' https://donorbox.org https://*.donorbox.org",
    "script-src 'self' 'unsafe-inline' https://donorbox.org",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://cdn.sanity.io https://lh3.googleusercontent.com https://images.unsplash.com https://plus.unsplash.com https://donorbox.org https://*.donorbox.org",
    "font-src 'self' data:",
    "connect-src 'self' https://cdn.sanity.io https://*.api.sanity.io https://*.apicdn.sanity.io https://*.upstash.io https://donorbox.org https://*.donorbox.org",
    "frame-src 'self' https://donorbox.org https://*.donorbox.org https://docs.google.com",
    "worker-src 'self' blob:",
  ];
  return directives.join("; ");
}

function securityHeaders(): { key: string; value: string }[] {
  const headers: { key: string; value: string }[] = [
    { key: "X-DNS-Prefetch-Control", value: "on" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Content-Security-Policy", value: contentSecurityPolicy() },
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
      ...base,
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
