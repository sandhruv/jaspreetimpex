export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jaspreet Impex",
    url: "https://jaspreetimpex.com",
    logo: "https://jaspreetimpex.com/favicon.svg",
    description:
      "Leading logistics company in India offering freight forwarding, customs clearance, warehousing, DG shipment handling, and end-to-end supply chain solutions.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Phagwara",
      addressRegion: "Punjab",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98767-03899",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/jaspreetimpex",
      "https://www.linkedin.com/company/jaspreetimpex",
      "https://twitter.com/jaspreetimpex",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Jaspreet Impex",
    image: "https://jaspreetimpex.com/favicon.svg",
    url: "https://jaspreetimpex.com",
    telephone: "+91-98767-03899",
    email: "info@jaspreetimpex.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Phagwara",
      addressLocality: "Phagwara",
      addressRegion: "Punjab",
      postalCode: "144401",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.2147,
      longitude: 75.7767,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jaspreet Impex",
    url: "https://jaspreetimpex.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://jaspreetimpex.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Logistics Services",
    provider: {
      "@type": "Organization",
      name: "Jaspreet Impex",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Logistics Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Freight Forwarding",
            description: "International freight forwarding services across air, sea, and road transport.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Customs Clearance",
            description: "Smooth customs clearance services ensuring compliance with Indian import/export regulations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Warehousing & Distribution",
            description: "Strategically located warehouses offering flexible storage and streamlined distribution.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "DG Shipment Handling",
            description: "Specialized handling of dangerous goods with strict compliance to IMCO regulations.",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
