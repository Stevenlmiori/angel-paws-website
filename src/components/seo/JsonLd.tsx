"use client";

import Script from "next/script";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";
import {
  ANGEL_PAWS_FACEBOOK_URL,
  CONTACT_EMAIL,
  VISITATION_REQUEST_FORM_URL,
} from "@/lib/siteLinks";

export function JsonLd() {
  const organizationId = `${SITE_URL}/#organization`;
  const serviceId = `${SITE_URL}/#therapy-dog-visits`;
  const websiteId = `${SITE_URL}/#website`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NonprofitOrganization",
        "@id": organizationId,
        name: SITE_NAME,
        alternateName: ["Angel Paws", "Angel Paws Houston"],
        url: SITE_URL,
        logo: absoluteUrl("/brand/angel-paws/logo@4x.png"),
        image: [
          absoluteUrl("/img/angelpaws-dog-and-owner-nk_horizontal.jpg"),
          absoluteUrl("/img/gave-me-your-paw.jpg"),
        ],
        description:
          "A faith-based pet therapy nonprofit serving the Greater Houston area through certified therapy dog visits.",
        email: CONTACT_EMAIL,
        foundingDate: "2017",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Houston",
          addressRegion: "TX",
          addressCountry: "US",
        },
        areaServed: [
          {
            "@type": "City",
            name: "Houston",
            addressRegion: "TX",
            addressCountry: "US",
          },
          {
            "@type": "AdministrativeArea",
            name: "Greater Houston",
          },
        ],
        sameAs: [ANGEL_PAWS_FACEBOOK_URL],
        knowsAbout: [
          "Pet therapy",
          "Therapy dogs",
          "Animal-assisted activities",
          "Hospital visits",
          "School visits",
          "Senior care visits",
          "Crisis response",
          "Faith-based ministry",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: {
          "@id": organizationId,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: "Therapy dog visits in Greater Houston",
        serviceType: "Pet therapy and therapy dog visits",
        provider: {
          "@id": organizationId,
        },
        areaServed: [
          {
            "@type": "City",
            name: "Houston",
            addressRegion: "TX",
            addressCountry: "US",
          },
          {
            "@type": "AdministrativeArea",
            name: "Greater Houston",
          },
        ],
        audience: [
          {
            "@type": "Audience",
            audienceType:
              "Hospitals, schools, senior care communities, churches, workplaces, and community partners",
          },
        ],
        description:
          "Certified Angel Paws therapy dog teams visit hospitals, schools, senior care communities, churches, workplaces, and crisis-impacted settings across Greater Houston.",
        url: absoluteUrl("/contact#visitation-request"),
        potentialAction: {
          "@type": "RequestAction",
          name: "Request a therapy dog visit",
          target: VISITATION_REQUEST_FORM_URL,
        },
      },
    ],
  };

  return (
    <Script
      id="json-ld-site"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
