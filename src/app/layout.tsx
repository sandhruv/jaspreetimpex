import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { AuthProvider } from "@/contexts/AuthContext";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: {
    default: "Jaspreet Impex | Logistics Solutions - Freight Forwarding, Customs Clearance & Supply Chain",
    template: "%s | Jaspreet Impex",
  },
  description:
    "Leading logistics company in India offering freight forwarding, customs clearance, warehousing, DG shipment handling, and end-to-end supply chain solutions. Serving 50+ countries with 22+ years of experience.",
  keywords: [
    "logistics company India",
    "freight forwarding India",
    "customs clearance India",
    "supply chain management",
    "DG shipment handling",
    "warehousing India",
    "e-commerce logistics",
    "air freight India",
    "sea freight India",
    "road transportation India",
    "Phagwara logistics",
    "Punjab customs clearance",
  ],
  authors: [{ name: "Jaspreet Impex" }],
  creator: "Jaspreet Impex",
  publisher: "Jaspreet Impex",
  metadataBase: new URL("https://jaspreetimpex.com"),
  alternates: {
    canonical: "https://jaspreetimpex.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://jaspreetimpex.com",
    siteName: "Jaspreet Impex",
    title: "Jaspreet Impex | Logistics Solutions - Freight Forwarding, Customs Clearance",
    description:
      "Leading logistics company in India offering freight forwarding, customs clearance, warehousing, and supply chain solutions. Serving 50+ countries.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Jaspreet Impex Logistics Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaspreet Impex | Logistics Solutions",
    description:
      "Leading logistics company in India offering freight forwarding, customs clearance, and supply chain solutions.",
    images: ["https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=1200&h=630&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#0d6e6e" />
      </head>
      <body>
        <JsonLd />
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
