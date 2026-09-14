import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Jaspreet Impex | Leading Logistics Company in India - Freight Forwarding & Customs Clearance",
  description:
    "Jaspreet Impex is India's trusted logistics partner offering freight forwarding, customs clearance, warehousing, DG shipment handling, and supply chain solutions across 50+ countries. 22+ years of experience.",
  keywords:
    "logistics company India, freight forwarding, customs clearance, supply chain management, DG shipment handling, warehousing, Jaspreet Impex, Phagwara logistics",
  openGraph: {
    title: "Jaspreet Impex | Leading Logistics Company in India",
    description:
      "Freight forwarding, customs clearance, warehousing, and supply chain solutions across 50+ countries.",
    url: "https://jaspreetimpex.com",
    images: [
      {
        url: "https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Jaspreet Impex Logistics",
      },
    ],
  },
  alternates: {
    canonical: "https://jaspreetimpex.com",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <ContactSection />
    </>
  );
}
