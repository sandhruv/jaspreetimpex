import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services - Freight Forwarding, Customs Clearance, Warehousing | Jaspreet Impex",
  description:
    "Comprehensive logistics services from Jaspreet Impex: freight forwarding (air, sea, road), customs clearance, warehousing & distribution, DG shipment handling, and supply chain management across India and 50+ countries.",
  keywords:
    "freight forwarding India, air freight, sea freight, customs clearance, warehousing, DG shipment handling, supply chain management, logistics services India",
  openGraph: {
    title: "Our Services | Jaspreet Impex - Logistics Solutions",
    description:
      "Freight forwarding, customs clearance, warehousing, and specialized logistics services across India and 50+ countries.",
    url: "https://jaspreetimpex.com/services",
    images: [
      {
        url: "https://images.unsplash.com/photo-1767868278896-2ec1025d7424?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Jaspreet Impex Logistics Services - Air Freight and Sea Freight",
      },
    ],
  },
  alternates: {
    canonical: "https://jaspreetimpex.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
