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
