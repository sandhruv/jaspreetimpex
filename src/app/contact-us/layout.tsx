import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get a Logistics Quote | Jaspreet Impex",
  description:
    "Contact Jaspreet Impex for freight forwarding, customs clearance, and logistics solutions. Get a free quote for your shipping requirements. Phone: +91 98767 03899, Email: info@jaspreetimpex.com",
  keywords:
    "contact Jaspreet Impex, logistics quote, freight forwarding quote, customs clearance India, logistics inquiry",
  openGraph: {
    title: "Contact Us | Jaspreet Impex - Get a Logistics Quote",
    description:
      "Get in touch for freight forwarding, customs clearance, and supply chain solutions. Free quotes within 24 hours.",
    url: "https://jaspreetimpex.com/contact-us",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Jaspreet Impex Logistics",
      },
    ],
  },
  alternates: {
    canonical: "https://jaspreetimpex.com/contact-us",
  },
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
