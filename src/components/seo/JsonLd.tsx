"use client";

import Script from "next/script";

export function JsonLd() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "NonprofitOrganization",
    name: "Angel Paws Pet Therapy",
    url: "https://angelpawshouston.com",
    logo: "https://angelpawshouston.com/brand/angel-paws/logo@2x.png",
    description:
      "A faith-based pet therapy ministry serving the Greater Houston area, sharing the unconditional love of Jesus through therapy dogs.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Houston",
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Greater Houston",
    },
    knowsAbout: ["Pet Therapy", "Animal-Assisted Activities", "Faith-based Ministry"],
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Angel Paws Pet Therapy",
    image: "https://angelpawshouston.com/brand/angel-paws/logo@2x.png",
    priceRange: "$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77069",
      streetAddress: "Northwest Houston",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.7604,
      longitude: -95.3698,
    },
    url: "https://angelpawshouston.com",
    telephone: "",
  };

  return (
    <>
      <Script
        id="json-ld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <Script
        id="json-ld-local"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
    </>
  );
}
